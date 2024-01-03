import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { supabase } from "./supabase";

const StudentWelcomeScreen = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
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

  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome, {profile?.first_name}!</Text>

      <Calendar
        style={styles.calendarStyle}
        theme={{
          "stylesheet.calendar.header": {
            week: {
              marginTop: 5,
              flexDirection: "row",
              justifyContent: "space-between",
            },
          },
        }}
        onDayPress={onDayPress}
        markedDates={{
          [selectedDate]: {
            selected: true,
            marked: true,
            selectedColor: "blue",
          },
        }}
      />

      {selectedDate && (
        <ScrollView style={styles.hourlyLayout}>
          {Array.from({ length: 24 }, (_, i) => i).map((hour) => {
            const hourLabel = `${hour === 0 || hour === 12 ? 12 : hour % 12} ${
              hour < 12 ? "AM" : "PM"
            }`;
            return (
              <View key={hour} style={styles.hourRow}>
                <Text style={styles.hourText}>{hourLabel}</Text>
                <Text style={styles.eventText}>No Events</Text>
              </View>
            );
          })}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 20,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  calendarStyle: {
    borderWidth: 1,
    borderColor: "gray",
    width: 350,
    height: 350,
  },
  hourlyLayout: {
    width: "90%",
    paddingTop: 20,
    height: 700,
  },
  hourRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  hourText: {
    fontWeight: "bold",
  },
  eventText: {
    // Add styling for event text
  },
});

export default StudentWelcomeScreen;
