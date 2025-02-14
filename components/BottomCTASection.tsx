import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { useTailwind } from "tailwind-rn";
import AppText from "./AppText";

const BottomCTASection = () => {
  const tailwind = useTailwind();

  return (
    <View
      style={tailwind(
        "bg-w3-purple-opacity rounded-lg shadow p-2 px-4 py-4 w-full border border-gray-400"
      )}
    >
      <View
        style={tailwind(
          "flex-row justify-between items-start ml-8 h-32 justify-center items-center"
        )}
      >
        <Image
          source={require("../assets/images/brain-light-bulb-icon.png")}
          style={tailwind("w-24 h-24 rounded-md justify-center items-center")}
          resizeMode="contain"
        />
        <View style={tailwind("flex-1 px-8")}>
          <AppText style={tailwind("text-lg font-bold mb-4")}>
            Take the first step towards a better you
          </AppText>
          <TouchableOpacity
            style={tailwind(
              "bg-transparent rounded-full p-1 border border-gray-100 w-34"
            )}
            onPress={() => {}}
          >
            <AppText
              style={tailwind("text-lg font-bold text-white text-center")}
            >
              Start Now
            </AppText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default BottomCTASection;
