import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from "react-native"; // Import ScrollView
import { Calendar } from 'react-native-calendars';
import { supabase } from "./supabase";

const TeacherWelcomeScreen = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState('');

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

  const fetchEventsForDay = async (dateString) => {
    // Fetch events from your database for the selected date
    // This is a placeholder, replace with your actual database fetching logic
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('date', dateString);

    if (error) {
      console.error("Error fetching events:", error);
    } else {
      setEvents(data);
    }
  };

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
          'stylesheet.calendar.header': {
            week: {
              marginTop: 5,
              flexDirection: 'row',
              justifyContent: 'space-between'
            }
          }
        }}
        onDayPress={onDayPress}
        markedDates={{
          [selectedDate]: {selected: true, marked: true, selectedColor: 'blue'},
        }}
      />

      {selectedDate && (
  <ScrollView style={styles.hourlyLayout}>
    {Array.from({ length: 24 }, (_, i) => i).map((hour) => {
      // Format the hour for display
      const hourLabel = `${hour === 0 || hour === 12 ? 12 : hour % 12} ${hour < 12 ? 'AM' : 'PM'}`;
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
    borderColor: 'gray',
    width: 350,
    height: 350 
  },

  hourlyLayout: {
    width: '90%',
    paddingTop: 20,
    height: 700,
  },
  
  hourRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  hourText: {
    fontWeight: 'bold',
  },
  eventText: {
    // styling for event text
  },
  
});

export default TeacherWelcomeScreen;