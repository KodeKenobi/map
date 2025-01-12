import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const QuickAccess = () => (
  <View style={styles.quickAccess}>
    <Text style={styles.quickAccessTitle}>Quick Access</Text>
    <TouchableOpacity style={styles.quickButton}>
      <Text style={styles.quickButtonText}>Explore Wellness Services</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.quickButton}>
      <Text style={styles.quickButtonText}>
        Discover Coaching & Mindfulness
      </Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  quickAccess: {
    marginTop: 2,
  },
  quickAccessTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  quickButton: {
    backgroundColor: "#e0e0e0",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  quickButtonText: {
    textAlign: "center",
  },
});

export default QuickAccess;
