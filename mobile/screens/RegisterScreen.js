import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, TextInput, Button } from "react-native";
import Logo from "../components/Logo";
import { BACKEND_URL } from "../config";
import axios from "axios";

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   console.log(BACKEND_URL);
  // }, []);
  const handleRegister = async () => {
    setLoading(true);
    if (!password || !email || !name || !confirmPassword) {
      setLoading(false);
      alert("All field are required ");
      return;
    }

    if (password != confirmPassword) {
      setLoading(false);
      alert("Password does not match");
      return;
    }

    try {
      const { data } = await axios.post(
        `${BACKEND_URL}/user/register`,
        {
          name: name,
          email: email,
          password: password,
        },
        { headers: { "Content-Type": "application/json" } },
      );
      if (data.error) {
        alert(data.error);
        setLoading(false);
      } else {
        //await AsyncStorage.setItem("@auth", JSON.stringify(data));
        //console.log(JSON.parse(jsonString).name);
        setLoading(false);
        alert("You have registered successfully");
        navigation.pop();
      }
    } catch (e) {
      alert(e.response?.data?.message || e.message);
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, marginTop: 90, padding: 16 }}>
      <Logo />
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={{
          marginBottom: 8,
          padding: 8,
          borderWidth: 1,
          borderColor: "gray",
          borderRadius: 10,
        }}
      />
      <TextInput
        placeholder="Email"
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
      <TextInput
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        style={{
          marginBottom: 10,
          padding: 8,
          borderWidth: 1,
          borderColor: "gray",
          borderRadius: 10,
        }}
      />
      <Button
        title={loading ? "Please wait..." : "Register"}
        onPress={handleRegister}
      />
    </View>
  );
};

export default RegisterScreen;
