import React, { useState } from "react";
import { View, Image, TouchableOpacity, Text, ScrollView } from "react-native";
import { useTailwind } from "tailwind-rn";
import AppText from "./AppText";
import ButtonComponent from "./ButtonComponent";
import Ionicons from "@expo/vector-icons/build/Ionicons";
import CheckboxComponent from "./CheckboxComponent";

export default function OnboardingScreen({ navigation }: { navigation: any }) {
  const tailwind = useTailwind();
  const [items, setItems] = useState([
    { label: "Wellness: Heal, rejuvenate, and thrive", checked: true },
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

  return (
    <ScrollView>
      <View style={tailwind("flex-1 justify-start items-center p-5")}>
        <TouchableOpacity
          style={tailwind("absolute left-4 top-4")}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <View style={tailwind("mb-4 mt-8")}>
          <Image
            source={require("../assets/images/woman-checklist 1.png")}
            style={{ width: 222, height: 222 }}
          />
        </View>
        <AppText style={tailwind("text-2xl font-bold mb-2 mt-2 text-gray-800")}>
          Personalise Your Journey
        </AppText>
        <AppText style={tailwind("text-center mt-2 mb-4 text-gray-800")}>
          Choose your focus areas to tailor your experience. You can select one
          or more areas to explore
        </AppText>
        <CheckboxComponent items={items} onToggle={handleToggle} />
        <ButtonComponent
          title="Continue"
          color="bg-w3-purple"
          onPress={() => navigation.navigate("Login")}
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
          <Text
            style={{
              color: "#000",
              textAlign: "center",
              fontSize: 16,
              fontWeight: "bold",
              marginLeft: 10,
            }}
          >
            Skip Personalisation
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
