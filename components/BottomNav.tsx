import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const BottomNav = ({ navigation }: { navigation: any }) => (
  <View style={styles.bottomNav}>
    <TouchableOpacity onPress={() => navigation.navigate("Home")}>
      <Text style={styles.navItem}>Home</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.navigate("Wellness")}>
      <Text style={styles.navItem}>Wellness</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.navigate("Wisdom")}>
      <Text style={styles.navItem}>Wisdom</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.navigate("Wealth")}>
      <Text style={styles.navItem}>Wealth</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
      <Text style={styles.navItem}>Profile</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  navItem: {
    fontSize: 16,
  },
});

export default BottomNav;
