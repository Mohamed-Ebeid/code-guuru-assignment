import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BACKEND_URL } from "../config.js";
import ExpCard from "../components/ExpCard.js";
import axios from "axios";

export default function HomeScreen({ navigation }) {
  const [expenses, setExpenses] = useState([]);
  const [userInfo, setUserInfo] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getExp();
  }, []);

  const getExp = async () => {
    setLoading(true);
    const info = await AsyncStorage.getItem("@auth");
    if (!info) {
      navigation.replace("LoginScreen");
      return;
    }
    //console.log();
    setUserInfo(JSON.parse(info).name);
    const user = JSON.parse(info);
    try {
      const { data } = await axios.get(`${BACKEND_URL}/expense/get`, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${user.token}`,
        },
      });
      if (data.error) {
        alert(data.error);
        setLoading(false);
      } else {
        setLoading(false);
        setExpenses(data);
      }
    } catch (e) {
      alert(e.response?.data?.message || e.message);
      setLoading(false);
    }
  };
  const handleDelete = async (id) => {
    const info = await AsyncStorage.getItem("@auth");
    const user = JSON.parse(info);
    //console.log(id);
    try {
      const { data } = await axios.delete(
        `${BACKEND_URL}/expense/${id}`,

        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${user.token}`,
          },
        },
      );
      alert("Deleted Successfully!!!");
      getExp();
      //console.log(data);
    } catch (e) {
      alert(e?.response?.data?.message || e.message);
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem("@auth");
    alert("See you soon :(");
    navigation.replace("LoginScreen");
  };
  return (
    <ScrollView
      style={{
        //justifyContent: "center",
        padding: 16,
      }}
    >
      <Text>{userInfo}'s Expenses</Text>
      {expenses.map((e) => (
        <ExpCard key={e._id} {...e} handlePress={handleDelete} />
      ))}
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  logoutButton: {
    alignSelf: "center",
    backgroundColor: "#ff5733",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    width: 90,
    marginTop: 10,
  },
  logoutText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
