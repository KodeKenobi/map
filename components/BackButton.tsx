import React from "react";
import { View, TouchableOpacity } from "react-native";
import { useTailwind } from "tailwind-rn";
import Ionicons from "@expo/vector-icons/build/Ionicons";
import { NavigationProp } from "@react-navigation/native";

interface BackButtonProps {
  navigation: NavigationProp<any>;
}

const BackButton: React.FC<BackButtonProps> = ({ navigation }) => {
  const tailwind = useTailwind();

  return (
    <View style={tailwind("bg-gray-200 rounded-full p-2")}>
      <TouchableOpacity
        style={tailwind("flex items-center justify-center")}
        onPress={() => {
          if (navigation.canGoBack()) {
            navigation.goBack();
          } else {
            alert("No previous screen to go back to.");
          }
        }}
      >
        <Ionicons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>
    </View>
  );
};

export default BackButton;
