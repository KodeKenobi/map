import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Octicons from "@expo/vector-icons/Octicons";

const BottomNav = ({ navigation }: { navigation: any }) => {
  const [activeTab, setActiveTab] = useState("Home");

  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity
        style={[
          styles.navItem,
          { marginBottom: 0 },
          activeTab === "Home" && styles.activeNavItem,
        ]}
        onPress={() => {
          setActiveTab("Home");
          navigation.navigate("Home");
        }}
      >
        <Octicons
          name="home"
          size={28}
          color="black"
          style={{ marginTop: 12 }}
        />
        <Text style={styles.navText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.navItem,
          { marginBottom: 0 },
          activeTab === "Wellness" && styles.activeNavItem,
        ]}
        onPress={() => {
          setActiveTab("Wellness");
          navigation.navigate("WellnessWelcome");
        }}
      >
        <Image
          style={{
            width: 28,
            height: 28,
            resizeMode: "contain",
            marginTop: 12,
          }}
          source={require("../assets/images/wellness-nav-icon.png")}
        />
        <Text style={styles.navText}>Wellness</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.navItem,
          { marginBottom: 0 },
          activeTab === "Wisdom" && styles.activeNavItem,
        ]}
        onPress={() => {
          setActiveTab("Wisdom");
          navigation.navigate("Wisdom");
        }}
      >
        <Image
          style={{
            width: 28,
            height: 28,
            resizeMode: "contain",
            marginTop: 12,
          }}
          source={require("../assets/images/wisdom-nav-icon.png")}
        />
        <Text style={styles.navText}>Wisdom</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.navItem,
          { marginBottom: 0 },
          activeTab === "Wealth" && styles.activeNavItem,
        ]}
        onPress={() => {
          setActiveTab("Wealth");
          navigation.navigate("Wealth");
        }}
      >
        <Image
          style={{
            width: 28,
            height: 28,
            resizeMode: "contain",
            marginTop: 12,
          }}
          source={require("../assets/images/wealth-nav-icon.png")}
        />
        <Text style={styles.navText}>Wealth</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.navItem,
          { marginBottom: 0 },
          activeTab === "Profile" && styles.activeNavItem,
        ]}
        onPress={() => {
          setActiveTab("Profile");
          navigation.navigate("Profile");
        }}
      >
        <Icon
          name="person-outline"
          size={28}
          color="#555"
          style={{ marginTop: 12 }}
        />
        <Text style={styles.navText}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

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
  activeNavItem: {
    borderTopWidth: 4,
    borderTopColor: "black",
    borderRadius: 4,
  },
});

export default BottomNav;
