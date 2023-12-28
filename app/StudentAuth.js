import React from "react";
import { View, StyleSheet } from "react-native";
import { Link } from "expo-router";

export default function StudentAuth() {
  return (
    <View style={styles.container}>
      <Link href="/StudentSignUp" style={styles.button}>
        Sign Up
      </Link>
      <Link href="/StudentLogin" style={styles.button}>
        Log In
      </Link>
    </View>
  );
}

// Use the same styles as in TeacherAuth
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
