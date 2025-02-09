import React, { useState } from "react";
import { View, Image, TouchableOpacity, ScrollView, Alert } from "react-native";
import { useTailwind } from "tailwind-rn";
import AppText from "./AppText";
import ButtonComponent from "./ButtonComponent";
import Ionicons from "@expo/vector-icons/build/Ionicons";
import CheckboxComponent from "./CheckboxComponent";
import { supabase } from "@/lib/supabase";

export default function WellnessOnboarding({
  navigation,
}: {
  navigation: any;
}) {
  const tailwind = useTailwind();
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([
    { label: "Wellness: Heal, rejuvenate, and thrive", checked: true },
    { label: "Nutrition: Eat well for a better life", checked: false },
    { label: "Fitness: Stay active and healthy", checked: false },
    { label: "Mental Health: Focus on your well-being", checked: false },
  ]);

  const handleToggle = (index: number) => {
    const item = items[index];
    const newCheckedState = !item.checked;
    console.log(
      `Item: ${item.label} has been ${
        newCheckedState ? "selected" : "unselected"
      }`
    );
    const updatedItems = items.map((item, i) => ({
      ...item,
      checked: i === index ? newCheckedState : item.checked,
    }));
    setItems(updatedItems);
  };

  const handleCompleteOnboarding = async () => {
    try {
      setLoading(true);
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const selectedItems = items.filter((item) => item.checked);
        const { error } = await supabase.from("profiles").upsert({
          id: user.id,
          hascompletedwellnessonboarding: true,
          selected_wellness_onboarding_items:
            selectedItems.length > 0 ? selectedItems : null,
          updated_at: new Date(),
        });

        if (error) throw error;
      }
      navigation.navigate("WellnessHome");
    } catch (error) {
      console.error("Error:", error);
      Alert.alert((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const navigateToWellness = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (profile && !profile.hasWellnessOnboarding) {
          navigation.navigate("WellnessWelcome");
        } else {
          navigation.navigate("WellnessHome");
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <ScrollView>
      <View style={tailwind("flex-1 justify-start items-center p-5")}>
        <View style={tailwind("absolute mt-12 top-4 left-4")}>
          <TouchableOpacity
            style={tailwind("absolute left-2 top-2 p-2")}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
        </View>
        <View style={tailwind("mb-4 mt-16")}>
          <Image
            source={require("../assets/images/wellness-onboarding-image.png")}
            style={{ width: 300, height: 300 }}
          />
        </View>
        <AppText style={tailwind("text-2xl font-bold mb-2 mt-2 ")}>
          Personalize Your Wellness Journey
        </AppText>
        <AppText style={tailwind("text-center mt-2 mb-4 ")}>
          Choose your focus areas to tailor your wellness experience. You can
          select one or more areas to explore.
        </AppText>
        <CheckboxComponent
          items={items}
          onToggle={handleToggle}
          checkedBackgroundColor="bg-w3-green-grad-1"
          checkboxBackgroundColor="#228564"
        />
        <ButtonComponent
          title="Continue"
          color="bg-w3-green"
          textColor="#fff"
          onPress={handleCompleteOnboarding}
        />
        <TouchableOpacity
          style={{
            backgroundColor: "#fff",
            width: "100%",
            alignSelf: "center",
            padding: 15,
            borderRadius: 40,
            marginTop: 20,
            borderColor: "#7345B6",
            borderWidth: 1,
            marginBottom: 20,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => navigation.navigate("WellnessHome")} // Option to skip
        >
          <AppText
            style={{
              color: "#000",
              textAlign: "center",
              fontSize: 16,
              fontWeight: "bold",
              marginLeft: 10,
            }}
          >
            Skip Personalization
          </AppText>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
