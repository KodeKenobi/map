// components/CheckboxComponent.tsx
import React from "react";
import { View, TouchableOpacity } from "react-native";
import { useTailwind } from "tailwind-rn";
import Checkbox from "expo-checkbox";
import AppText from "./AppText";

interface CheckboxItem {
  label: string;
  checked: boolean;
}

interface CheckboxComponentProps {
  items: CheckboxItem[];
  onToggle: (index: number) => void;
  checkedBackgroundColor?: string;
  checkboxBackgroundColor?: string;
  fontColor?: string;
}

const CheckboxComponent: React.FC<CheckboxComponentProps> = ({
  items,
  onToggle,
  checkedBackgroundColor = "bg-w3-gold",
  checkboxBackgroundColor = "bg-w3-green",
  fontColor = "#000",
}) => {
  const tailwind = useTailwind();

  return (
    <View style={tailwind("flex-1 mx-2 my-6")}>
      {items.map((item, index) => (
        <View key={index} style={tailwind("flex-row items-center mb-4")}>
          <View
            style={tailwind(
              `flex-row items-center bg-gray-200 p-4 rounded-md w-full ${
                item.checked ? checkedBackgroundColor : ""
              }`
            )}
          >
            <Checkbox
              style={[
                tailwind("mr-20"),
                {
                  width: 24,
                  height: 24,
                  borderColor: item.checked ? checkboxBackgroundColor : "gray",
                },
              ]}
              value={item.checked}
              onValueChange={() => onToggle(index)}
              color={item.checked ? checkboxBackgroundColor : "gray"}
            />
            <TouchableOpacity
              onPress={() => onToggle(index)}
              activeOpacity={0.7}
              style={tailwind("flex-1")}
            >
              <AppText
                style={tailwind("text-base text-gray-600 px-2 font-semibold")}
                fontColor={fontColor}
              >
                {item.label}
              </AppText>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );
};

export default CheckboxComponent;
