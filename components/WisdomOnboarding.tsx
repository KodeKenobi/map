import React, { useState } from "react";
import { View, Image, TouchableOpacity, ScrollView } from "react-native";
import { useTailwind } from "tailwind-rn";
import AppText from "./AppText";
import ButtonComponent from "./ButtonComponent";
import Ionicons from "@expo/vector-icons/build/Ionicons";
import CheckboxComponent from "./CheckboxComponent";
import { auth } from "../app/(auth)/firebaseConfig";
import { setDoc } from "firebase/firestore";
import { db } from "../app/(auth)/firebaseConfig";
import { doc } from "firebase/firestore";

export default function WisdomOnboardingScreen({
  navigation,
}: {
  navigation: any;
}) {
  const tailwind = useTailwind();
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
    console.log("Current User:", user);
    if (user) {
      const selectedItems = items.filter((item) => item.checked);
      setDoc(
        doc(db, "users", user.uid),
        {
          hasCompletedWisdomOnboarding: true,
          selectedWisdomOnboardingOptions:
            selectedItems.length > 0 ? selectedItems : null,
        },
        { merge: true }
      )
        .then(() => {
          console.log("Successfully updated hasCompletedWisdomOnboarding");
        })
        .catch((error) => {
          console.error("Error updating document:", error);
        });
    } else {
      console.log("No user is logged in.");
    }
    console.log("Navigating to Wisdom Home");
    navigation.navigate("WisdomHome");
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
            source={require("../assets/images/wisdom-checklist.png")}
            style={{ width: 275, height: 255 }}
          />
        </View>
        <AppText style={tailwind("text-2xl font-bold mb-2 mt-2 ")}>
          Begin your Wisdom journey
        </AppText>
        <AppText style={tailwind("text-center mt-2 mb-4 ")}>
          Choose your focus areas to tailor your experience. You can select one
          or more areas to explore
        </AppText>
        <CheckboxComponent
          items={items}
          onToggle={handleToggle}
          checkboxBackgroundColor="#7345B6"
          checkedBackgroundColor="#6C3BAB"
          fontColor="#000"
        />
        <ButtonComponent
          title="Continue"
          color="bg-w3-purple"
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
