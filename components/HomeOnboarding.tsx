import React, { useState } from "react";
import { View, Image, TouchableOpacity, ScrollView, Alert } from "react-native";
import { useTailwind } from "tailwind-rn";
import AppText from "./AppText";
import ButtonComponent from "./ButtonComponent";
import Ionicons from "@expo/vector-icons/build/Ionicons";
import CheckboxComponent from "./CheckboxComponent";
import { supabase } from "@/lib/supabase";

import { Session } from "@supabase/supabase-js";
import Toast from "react-native-toast-message";

interface HomeOnboardingScreenProps {
  navigation: any;
  session: Session;
}

export default function HomeOnboardingScreen({
  navigation,
  session,
}: HomeOnboardingScreenProps) {
  const tailwind = useTailwind();
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([
    { label: "Wellness: Heal, rejuvenate, and thrive", checked: false },
    {
      label: "Wisdom: Unlock your potential with coaching and mindfulness.",
      checked: false,
    },
    {
      label: "Wealth: Take bold steps toward financial independence.",
      checked: false,
    },
  ]);

  const handleToggle = (index: number) => {
    const item = items[index];
    const newCheckedState = !item.checked;
    const updatedItems = items.map((item, i) => ({
      ...item,
      checked: i === index ? newCheckedState : item.checked,
    }));
    setItems(updatedItems);
  };

  async function saveOnboardingStatus() {
    try {
      console.log("🚀 Starting saveOnboardingStatus...");
      setLoading(true);

      const selectedItems = items.filter((item) => item.checked);
      console.log("📋 Selected items:", selectedItems);
      console.log("👤 User ID:", session.user.id);

      const updates = {
        id: session.user.id,
        hascompletedhomeonboarding: true,
        selected_home_onboarding_items: selectedItems,
        updated_at: new Date(),
      };

      console.log("💾 Updates to save:", updates);

      const { error } = await supabase.from("profiles").upsert(updates);

      if (error) {
        console.error("❌ Supabase error:", error);
        throw error;
      }

      console.log("✅ Profile updated successfully");

      Toast.show({
        type: "success",
        text1: "Profile Updated Successfully",
        position: "bottom",
      });

      console.log("🧭 Navigating to Home...");
      navigation.navigate("Home");
      console.log("✅ Navigation completed");
    } catch (error) {
      console.error("💥 Error in saveOnboardingStatus:", error);
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      console.log("🏁 Setting loading to false");
      setLoading(false);
    }
  }

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
            source={require("../assets/images/woman-checklist 1.png")}
            style={{ width: 222, height: 222 }}
          />
        </View>
        <AppText style={tailwind("text-2xl font-bold mb-2 mt-2 ")}>
          Personalise Your Journey
        </AppText>
        <AppText style={tailwind("text-center mt-2 mb-4 ")}>
          Choose your focus areas to tailor your experience. You can select one
          or more areas to explore
        </AppText>
        <CheckboxComponent
          items={items}
          onToggle={handleToggle}
          checkedBackgroundColor="bg-w3-gold-1"
          checkboxBackgroundColor="#7345B6"
          fontColor="#000"
        />

        <ButtonComponent
          title="Continue"
          color="#7345B6"
          textColor="#fff"
          onPress={saveOnboardingStatus}
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
          onPress={() => navigation.navigate("Home")}
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
            Skip Personalisation
          </AppText>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
