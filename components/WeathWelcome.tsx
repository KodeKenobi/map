import React, { useRef, useEffect } from "react";
import {
  View,
  Image,
  Animated,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useTailwind } from "tailwind-rn";
import AppText from "./AppText";
import ButtonComponent from "./ButtonComponent";
import Ionicons from "@expo/vector-icons/build/Ionicons";

export default function WeathWelcomeScreen({
  navigation,
}: {
  navigation: any;
}) {
  const tailwind = useTailwind();

  console.log("📍 CURRENT SCREEN: WeathWelcomeScreen");

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <Animated.View
        style={[
          tailwind("flex-1 justify-start items-center p-5"),
          { opacity: fadeAnim },
        ]}
      >
        <View
          style={[tailwind("absolute"), { top: 50, left: 20, zIndex: 1000 }]}
        >
          <TouchableOpacity
            style={[
              tailwind("p-3 rounded-full"),
              {
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
                minWidth: 44,
                minHeight: 44,
                justifyContent: "center",
                alignItems: "center",
              },
            ]}
            onPress={() => {
              console.log(
                "⬅️ WeathWelcomeScreen: Back button pressed, navigating to Home"
              );
              navigation.navigate("Home");
            }}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
        </View>
        <View style={tailwind("mb-4 mt-14")}>
          <Image
            source={require("../assets/images/onboarding-wealth-welcome-icon.png")}
            style={{ width: 353, height: 335 }}
          />
        </View>

        <AppText style={tailwind("text-2xl font-bold mb-4 mt-12 ")}>
          Begin your Wealth journey
        </AppText>
        <AppText style={tailwind("text-base text-center mb-4 mt-8 ")}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat
        </AppText>
        <View style={tailwind("mt-12")}>
          <ButtonComponent
            title="Get Started"
            color="#E5A500"
            textColor="#ffffff"
            onPress={() => navigation.navigate("WealthOnboarding")}
          />
        </View>
      </Animated.View>
    </ScrollView>
  );
}
