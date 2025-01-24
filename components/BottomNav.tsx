import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, StyleSheet, Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Octicons from "@expo/vector-icons/Octicons";
import AppText from "./AppText";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

const BottomNav = ({ navigation }: { navigation: any }) => {
  const [activeTab, setActiveTab] = useState("Home");

  useFocusEffect(
    React.useCallback(() => {
      const currentRoute =
        navigation.getState().routes[navigation.getState().index].name;
      console.log("Current Route:", currentRoute); // Debugging line
      setActiveTab(currentRoute);
    }, [navigation])
  );

  useEffect(() => {
    const unsubscribe = navigation.addListener("state", () => {
      const currentRoute =
        navigation.getState().routes[navigation.getState().index].name;
      console.log("State Change - Current Route:", currentRoute); // Debugging line
      setActiveTab(currentRoute);
    });

    return unsubscribe; // Cleanup the listener on unmount
  }, [navigation]);

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
        <AppText style={styles.navText}>Home</AppText>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.navItem,
          { marginBottom: 0 },
          activeTab === "WellnessHome" && styles.activeNavItem,
        ]}
        onPress={() => {
          setActiveTab("WellnessHome");
          navigation.navigate("WellnessHome");
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
        <AppText style={styles.navText}>Wellness</AppText>
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
        <AppText style={styles.navText}>Wisdom</AppText>
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
        <AppText style={styles.navText}>Wealth</AppText>
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
        <AppText style={styles.navText}>Profile</AppText>
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
