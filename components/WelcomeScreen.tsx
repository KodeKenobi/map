import React from "react";
import { View, Image, TouchableOpacity, Text } from "react-native";
import { useTailwind } from "tailwind-rn";
import Button from "./ButtonComponent";
import AppText from "./AppText";
import ButtonComponent from "./ButtonComponent";

export default function WelcomeScreen({ navigation }: { navigation: any }) {
  const tailwind = useTailwind();

  return (
    <View style={tailwind("flex-1 justify-start items-center p-5")}>
      <View style={tailwind("mb-4 mt-14")}>
        <Image source={require("../assets/images/happy-african-woman.png")} />
      </View>
      <AppText style={tailwind("text-2xl font-bold mb-4 mt-12")}>
        Welcome to MAP-W3
      </AppText>
      <AppText style={tailwind("text-center mb-4 mt-8 font-semibold")}>
        Discover a platform designed to ignite the potency of women. Through
        holistic wellness, mindful coaching, and economic empowerment, we're
        here to help you live a fulfilling, purposeful life.
      </AppText>
      <ButtonComponent
        title="Get Started"
        onPress={() => navigation.navigate("Login")}
      />
    </View>
  );
}
