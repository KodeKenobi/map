import React, { useRef, useEffect, useState } from "react";
import { View, Image, Animated } from "react-native";
import { useTailwind } from "tailwind-rn";
import AppText from "./AppText";
import ButtonComponent from "./ButtonComponent";
import { supabase } from "@/lib/supabase";

export default function WelcomeScreen({ navigation }: { navigation: any }) {
  const tailwind = useTailwind();
  const [checkingOnboarding, setCheckingOnboarding] = useState(true);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user) {
          const { data: profile } = await supabase
            .from("profiles")
            .select("hascompletedhomeonboarding")
            .eq("id", user.id)
            .single();

          if (profile?.hascompletedhomeonboarding) {
            console.log("✅ Onboarding already completed, redirecting to Home");
            navigation.navigate("Home");
            return;
          }
        }

        setCheckingOnboarding(false);
      } catch (error) {
        console.error("Error checking onboarding status:", error);
        setCheckingOnboarding(false);
      }
    };

    checkOnboardingStatus();
  }, [navigation]);

  useEffect(() => {
    if (!checkingOnboarding) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }
  }, [fadeAnim, checkingOnboarding]);

  if (checkingOnboarding) {
    return (
      <View style={tailwind("flex-1 justify-center items-center")}>
        <AppText>Checking onboarding status...</AppText>
      </View>
    );
  }

  return (
    <Animated.View
      style={[
        tailwind("flex-1 justify-start items-center p-5"),
        { opacity: fadeAnim },
      ]}
    >
      <View style={tailwind("mb-4 mt-14")}>
        <Image
          source={require("../assets/images/happy-african-woman.png")}
          style={{ width: 376, height: 245 }}
        />
      </View>

      <AppText style={tailwind("text-2xl font-bold mb-4 mt-12 ")}>
        Welcome to MAP-W3
      </AppText>
      <AppText style={tailwind("text-base text-center mb-4 mt-8 ")}>
        Discover a platform designed to ignite the potency of women. Through
        holistic wellness, mindful coaching, and economic empowerment, we're
        here to help you live a fulfilling, purposeful life.
      </AppText>
      <View style={tailwind("mt-20")}>
        <ButtonComponent
          title="Get Started"
          color="#7345B6"
          textColor="#ffffff"
          onPress={() => navigation.navigate("HomeOnboarding")}
        />
      </View>
    </Animated.View>
  );
}
