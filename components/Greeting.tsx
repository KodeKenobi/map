import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Greeting = ({
  userName,
  onLogout,
}: {
  userName: string;
  onLogout: () => void;
}) => (
  <View>
    <View style={styles.greetingContainer}>
      <Image
        source={require("../assets/images/profile.svg")}
        style={styles.profileImage}
      />
      <View style={styles.textContainer}>
        <Text style={styles.greeting}>Good Morning, {userName || "User"}</Text>
        <Text style={styles.subGreeting}>Let's make today great</Text>
      </View>
      <View style={styles.iconContainer}>
        <Ionicons name="notifications-outline" size={26} color="green" />
        <TouchableOpacity onPress={onLogout} style={styles.logoutButton}>
          <Ionicons name="log-out-outline" size={24} color="green" />
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  greetingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
    justifyContent: "flex-start",
  },
  greeting: {
    fontSize: 18,
    fontWeight: "bold",
  },
  subGreeting: {
    fontSize: 16,
    marginBottom: 20,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoutButton: {
    marginLeft: 10, // Space between notification and logout icon
  },
});

export default Greeting;
