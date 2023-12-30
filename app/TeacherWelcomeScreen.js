import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { supabase } from "./supabase";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TeacherWelcomeScreen = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserFromLocalStorage = async () => {
    try {
      const sessionData = await AsyncStorage.getItem("supabase.auth.token");
      if (sessionData) {
        const session = JSON.parse(sessionData);
        return session.currentSession?.user || null;
      }
      return null;
    } catch (error) {
      console.error("Error fetching user from local storage:", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      // Usage
      const user = await fetchUserFromLocalStorage();
      console.log(user);

      if (user) {
        const { data, error } = await supabase
          .from("profiles")
          .select("first_name")
          .eq("id", user.id)
          .single();

        if (error) {
          console.error("Error fetching profile:", error);
        } else {
          setProfile(data);
        }
      }

      setLoading(false);
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome, {profile?.first_name}!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default TeacherWelcomeScreen;
