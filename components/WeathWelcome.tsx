import React, { useRef, useEffect } from "react";
import { View, Image, Animated } from "react-native";
import { useTailwind } from "tailwind-rn";
import AppText from "./AppText";
import ButtonComponent from "./ButtonComponent";

export default function WeathWelcomeScreen({
  navigation,
}: {
  navigation: any;
}) {
  const tailwind = useTailwind();

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View
      style={[
        tailwind("flex-1 justify-start items-center p-5"),
        { opacity: fadeAnim },
      ]}
    >
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
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat
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
  );
}
