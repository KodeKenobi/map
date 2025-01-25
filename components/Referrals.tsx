import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { useTailwind } from "tailwind-rn";
import AppText from "./AppText";

const Referrals = () => {
  const tailwind = useTailwind();

  return (
    <View
      style={tailwind(
        "bg-gray-100 rounded-lg shadow p-2 w-full border border-gray-400"
      )}
    >
      <View style={tailwind("flex-row justify-between items-start ml-8")}>
        <Image
          source={require("../assets/images/info-icon.png")}
          style={tailwind("w-16 h-16 rounded-md")}
          resizeMode="contain"
        />
        <View style={tailwind("flex-1 ml-24 ")}>
          <AppText style={tailwind("text-lg font-bold")}>Referrals</AppText>
          <AppText style={tailwind("text-w3-green text-md")}>
            We do referrals to specialist accordingly
          </AppText>
        </View>
      </View>
    </View>
  );
};

export default Referrals;
