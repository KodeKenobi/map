import React, { useState } from "react";
import { View, Image, TouchableOpacity, ScrollView } from "react-native";
import { useTailwind } from "tailwind-rn";
import AppText from "./AppText";
import ButtonComponent from "./ButtonComponent";
import Ionicons from "@expo/vector-icons/build/Ionicons";
import CheckboxComponent from "./CheckboxComponent";
import { auth } from "../app/(auth)/firebaseConfig";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../app/(auth)/firebaseConfig";
import { getUserData } from "@/app/(auth)/auth";

export default function WealthOnboarding({ navigation }: { navigation: any }) {
  const tailwind = useTailwind();
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

  const handleCompleteOnboarding = () => {
    const user = auth.currentUser;
    if (user) {
      const selectedItems = items.filter((item) => item.checked);
      setDoc(
        doc(db, "users", user.uid),
        {
          hasCompletedWealthOnboarding: true,
          selectedWealthOnboardingOptions:
            selectedItems.length > 0 ? selectedItems : null,
        },
        { merge: true }
      );
    }
    console.log("Navigating to Wealth Home");
    navigation.navigate("Wealth");
  };

  const navigateToWellness = async () => {
    const user = auth.currentUser;
    if (user) {
      const data = await getUserData(user.uid);
      if (data && !data.hasWealthOnboarding) {
        navigation.navigate("WealthWelcome");
      } else {
        navigation.navigate("Wealth");
      }
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
            source={require("../assets/images/wealth-checklist.png")}
            style={{ width: 300, height: 300 }}
          />
        </View>
        <AppText style={tailwind("text-2xl font-bold mb-2 mt-2 ")}>
          Personalize Your Journey
        </AppText>
        <AppText style={tailwind("text-center mt-2 mb-4 ")}>
          Choose your focus areas to tailor your wellness experience. You can
          select one or more areas to explore.
        </AppText>
        <CheckboxComponent
          items={items}
          onToggle={handleToggle}
          checkedBackgroundColor="bg-w3-gold"
          checkboxBackgroundColor="#E5A500"
        />
        <ButtonComponent
          title="Continue"
          color="bg-w3-gold"
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
            borderColor: "#E5A500",
            borderWidth: 1,
            marginBottom: 20,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => navigation.navigate("Wealth")}
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
