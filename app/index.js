import "react-native-url-polyfill/auto";
import React from "react";
import { View, StyleSheet } from "react-native";
import { Link } from "expo-router";

export default function HomePage() {
  return (
    <View style={styles.container}>
      <Link href="/TeacherAuth" style={styles.button}>
        Teacher
      </Link>
      <Link href="/StudentAuth" style={styles.button}>
        Student
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
