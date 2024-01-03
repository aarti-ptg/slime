// StudentSignUp.js
import React, { useState } from "react";
import { View, Alert, StyleSheet } from "react-native";
import { supabase } from "./supabase";
import { Button, Input } from "react-native-elements";
import { useRouting } from "expo-router";
import { router } from "expo-router";

export default function StudentSignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);

  async function signUpWithEmail() {
    setLoading(true);
    const { user, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
          is_teacher: false,
        },
      },
    });

    setLoading(false);
    if (error) {
      Alert.alert("Signup failed", error.message);
      return;
    }

    Alert.alert(
      "Signup successful",
      "Please check your inbox for email verification!"
    );
    router.replace("/StudentWelcomeScreen");
  }

  return (
    <View style={styles.container}>
      <Input
        label="First Name"
        onChangeText={setFirstName}
        value={firstName}
        placeholder="First Name"
        autoCapitalize="none"
      />
      <Input
        label="Last Name"
        onChangeText={setLastName}
        value={lastName}
        placeholder="Last Name"
        autoCapitalize="none"
      />
      <Input
        label="Email"
        leftIcon={{ type: "font-awesome", name: "envelope" }}
        onChangeText={setEmail}
        value={email}
        placeholder="email@address.com"
        autoCapitalize="none"
      />
      <Input
        label="Password"
        leftIcon={{ type: "font-awesome", name: "lock" }}
        onChangeText={setPassword}
        value={password}
        secureTextEntry={true}
        placeholder="Password"
        autoCapitalize="none"
      />
      <Button title="Sign Up" disabled={loading} onPress={signUpWithEmail} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    marginBottom: 10,
  },
});
