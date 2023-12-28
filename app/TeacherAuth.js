import React from "react";
import { View, StyleSheet } from "react-native";
import { Link } from "expo-router";

export default function TeacherAuth() {
  return (
    <View style={styles.container}>
      <Link href="/TeacherSignUp" style={styles.button}>
        Sign Up
      </Link>
      <Link href="/TeacherLogin" style={styles.button}>
        Log In
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    padding: 10,
    margin: 10,
    backgroundColor: "#007bff",
    color: "white",
    textAlign: "center",
    borderRadius: 5,
  },
});
