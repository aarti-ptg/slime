// TeacherSignUp.js
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
          isTeacher: false,
        },
      },
    });

    if (error) {
      Alert.alert("Signup failed", error.message);
      setLoading(false);
      return;
    }

    // User signed up successfully, now let's insert additional data
    if (user) {
      const { data, insertError } = await supabase
        .from('profiles') // Replace 'profiles' with your actual table name
        .insert([
          {
            id: user.id, // Make sure 'id' is your primary key in the 'profiles' table
            first_name: firstName,
            last_name: lastName,
            isTeacher: false, // Since this is the TeacherSignUp, we set it to true
          },
        ]);

      if (insertError) {
        Alert.alert("Signup failed", insertError.message);
      } else {
        Alert.alert(
          "Signup successful",
          "Please check your inbox for email verification!"
        );
        router.replace("/TeacherWelcomeScreen");
      }
    }

    setLoading(false);

    Alert.alert(
      "Signup successful",
      "Please check your inbox for email verification!"
    );
    // Redirect to TeacherWelcomeScreen
    router.replace("/TeacherWelcomeScreen");
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
      <Button
        title="Sign Up"
        disabled={loading}
        onPress={() => signUpWithEmail()}
      />
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