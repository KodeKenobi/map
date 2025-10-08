import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { useTailwind } from "tailwind-rn";
import AppText from "./AppText";
import ButtonComponent from "./ButtonComponent";
import Ionicons from "@expo/vector-icons/build/Ionicons";

export default function WellnessWelcomeScreen({
  navigation,
}: {
  navigation: any;
}) {
  const tailwind = useTailwind();

  console.log("📍 CURRENT SCREEN: WellnessWelcomeScreen");
  console.log("🎯 WellnessWelcomeScreen: Component rendered");
  console.log("🔍 WellnessWelcomeScreen: Component props:", {
    navigation: !!navigation,
  });

  return (
    <View style={tailwind("flex-1 justify-start items-center p-5")}>
      <View style={[tailwind("absolute"), { top: 50, left: 20, zIndex: 1000 }]}>
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
              "⬅️ WellnessWelcomeScreen: Back button pressed, navigating to Home"
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
          source={require("../assets/images/wellness-welcome-image.png")}
          style={{ width: 376, height: 300 }}
        />
      </View>

      <AppText style={tailwind("text-2xl font-bold mb-4 mt-8 ")}>
        Begin your Wellness journey
      </AppText>
      <AppText style={tailwind("text-base text-center mb-4 mt-8 ")}>
        Discover a platform designed to ignite the potency of women. Through
        holistic wellness, mindful coaching, and economic empowerment, we're
        here to help you live a fulfilling, purposeful life.
      </AppText>
      <View style={tailwind("mt-20")}>
        <ButtonComponent
          title="Get Started"
          color="#228565"
          textColor="#fff"
          onPress={() => {
            console.log(
              "🚀 WellnessWelcomeScreen: Get Started pressed, navigating to WellnessOnboarding"
            );
            navigation.navigate("WellnessOnboarding");
          }}
        />
      </View>
    </View>
  );
}
