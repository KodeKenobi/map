import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { auth } from "../app/(auth)/firebaseConfig";
import { getUserData } from "../app/(auth)/auth";
import Greeting from "./Greeting";
import BottomNav from "./BottomNav";
import { useTailwind } from "tailwind-rn";
import SearchComponent from "./SearchComponent";
import PillNavMenu from "./ServicesNavMenu";
import ServicesNavMenu from "./ServicesNavMenu";

const WellnessHome = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const [firstName, setFirstName] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const tailwind = useTailwind();

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      getUserData(user.uid).then((data) => {
        if (data) {
          setFirstName(data.firstName);
          if (!data.hasCompletedWellnessOnboarding) {
            navigation.navigate("WellnessWelcome");
          }
        }
        setLoading(false);
      });
    } else {
      setLoading(false);
      navigation.navigate("Login");
    }
  }, [navigation]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <View style={styles.loadingBarsContainer}>
          <View style={styles.loadingBar} />
          <View style={styles.loadingBar} />
          <View style={styles.loadingBar} />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Greeting
        userName={firstName ? `${firstName}` : ""}
        notificationCount={8}
      />{" "}
      <ScrollView contentContainerStyle={[styles.scrollContainer]}>
        <View>
          <SearchComponent />
        </View>

        <View style={tailwind("mt-2")}>
          <ServicesNavMenu />
        </View>

        <View style={tailwind("mb-4 mt-8 flex items-center justify-center")}>
          <Image
            source={require("../assets/images/wellness-body.png")}
            style={{ width: 512, height: 512, resizeMode: "contain" }}
          />
        </View>
      </ScrollView>
      <BottomNav navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    padding: 12,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  loadingBarsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
  },
  loadingBar: {
    height: 4,
    width: "30%",
    backgroundColor: "#ccc",
    borderRadius: 2,
    overflow: "hidden",
  },
  loadingBarActive: {
    backgroundColor: "#000",
  },
});

export default WellnessHome;
