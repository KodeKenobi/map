import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  Animated,
  TouchableOpacity,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { auth } from "../app/(auth)/firebaseConfig";
import { getUserData } from "../app/(auth)/auth";
import Greeting from "./Greeting";
import BottomNav from "./BottomNav";
import { useTailwind } from "tailwind-rn";
import SearchComponent from "./SearchComponent";
import ServicesNavMenu from "./ServicesNavMenu";

const WellnessHome = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const [firstName, setFirstName] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [scale] = useState(new Animated.Value(1));
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
        <Animated.Image
          source={require("../assets/images/faviconBig.png")}
          style={[styles.faviconBig, { transform: [{ scale }] }]}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={tailwind("mt-10")}>
        <Greeting
          userName={firstName ? `${firstName}` : ""}
          notificationCount={8}
        />{" "}
      </View>
      <ScrollView contentContainerStyle={[styles.scrollContainer]}>
        <View>
          <SearchComponent />
        </View>

        <View style={tailwind("mt-2")}>
          <ServicesNavMenu />
        </View>

        <TouchableOpacity onPress={() => navigation.navigate("Consult")}>
          <View style={tailwind("mb-4 mt-8 flex items-center justify-center")}>
            <Image
              source={require("../assets/images/wellness-body.png")}
              style={{ width: 512, height: 512, resizeMode: "contain" }}
            />
          </View>
        </TouchableOpacity>
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
  faviconBig: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
});

export default WellnessHome;
