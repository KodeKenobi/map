import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const BottomNav = ({ navigation }: { navigation: any }) => (
  <View style={styles.bottomNav}>
    <TouchableOpacity
      style={styles.navItem}
      onPress={() => navigation.navigate("Home")}
    >
      <Icon name="home" size={24} color="#555" />
      <Text style={styles.navText}>Home</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.navItem}
      onPress={() => navigation.navigate("Wellness")}
    >
      <Icon name="favorite-border" size={24} color="#555" />
      <Text style={styles.navText}>Wellness</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.navItem}
      onPress={() => navigation.navigate("Wisdom")}
    >
      <Icon name="lightbulb-outline" size={24} color="#555" />
      <Text style={styles.navText}>Wisdom</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.navItem}
      onPress={() => navigation.navigate("Wealth")}
    >
      <Icon name="attach-money" size={24} color="#555" />
      <Text style={styles.navText}>Wealth</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.navItem}
      onPress={() => navigation.navigate("Profile")}
    >
      <Icon name="person-outline" size={24} color="#555" />
      <Text style={styles.navText}>Profile</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  navItem: {
    alignItems: "center",
  },
  navText: {
    fontSize: 12,
    color: "#555",
    marginTop: 4,
  },
});

export default BottomNav;
