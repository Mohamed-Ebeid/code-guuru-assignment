import React, { useState } from "react";
import { View, TextInput, Button, ScrollView } from "react-native";
import Logo from "../components/Logo";

const LoginScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Add your login logic here
    console.log("Username:", username);
    console.log("Password:", password);
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 16 }}>
      <Logo />
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={{
          marginBottom: 8,
          padding: 8,
          borderWidth: 1,
          borderColor: "gray",
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
        }}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export default LoginScreen;
