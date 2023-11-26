import React from "react";
import { Text, View, StyleSheet } from "react-native";

const Logo = ({ children }) => {
  return (
    <View style={styles.container}>
      <Text>Code Guuru</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 20,
  },
});

export default Logo;
