import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  TextInput,
  Button,
  ScrollView,
  Pressable,
  Text,
} from "react-native";
import Logo from "../components/Logo";
import { BACKEND_URL } from "../config";
import axios from "axios";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkUser();
  }, []);
  const checkUser = async () => {
    const info = await AsyncStorage.getItem("@auth");
    if (info) {
      navigation.replace("HomeScreen");
      return;
    }
  };
  const handleLogin = async () => {
    setLoading(true);
    if (!password || !email) {
      setLoading(false);
      alert("All field are required ");
      return;
    }

    try {
      const { data } = await axios.post(
        `${BACKEND_URL}/user/sign-in`,
        {
          email: email,
          password: password,
        },
        { headers: { "Content-Type": "application/json" } },
      );
      if (data.error) {
        alert(data.error);
        setLoading(false);
      } else {
        //setState(data);
        await AsyncStorage.setItem("@auth", JSON.stringify(data));
        //console.log(JSON.parse(jsonString).name);
        setLoading(false);
        alert("Welcome :)");
        navigation.replace("HomeScreen");
      }
    } catch (e) {
      alert(e.response?.data?.message || e.message);
      setLoading(false);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        //justifyContent: "center",
        padding: 16,
        marginTop: 90,
      }}
    >
      <Logo />
      <TextInput
        placeholder="email"
        value={email}
        onChangeText={setEmail}
        style={{
          marginBottom: 8,
          padding: 8,
          borderWidth: 1,
          borderColor: "gray",
          borderRadius: 10,
        }}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{
          marginBottom: 8,
          padding: 8,
          borderWidth: 1,
          borderColor: "gray",
          borderRadius: 10,
        }}
      />
      <Button
        title={loading ? "Please wait..." : "Login"}
        onPress={handleLogin}
      />
      <Pressable
        style={{
          alignItems: "center",
          marginTop: 10,
        }}
        onPress={() => navigation.navigate("RegisterScreen")}
      >
        <Text style={{ color: "blue" }}>Register</Text>
      </Pressable>
    </View>
  );
};

export default LoginScreen;
