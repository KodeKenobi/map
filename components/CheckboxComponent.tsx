// components/CheckboxComponent.tsx
import React from "react";
import { View } from "react-native";
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
}

const CheckboxComponent: React.FC<CheckboxComponentProps> = ({
  items,
  onToggle,
}) => {
  const tailwind = useTailwind();

  return (
    <View style={tailwind("flex-1 mx-2 my-6")}>
      {items.map((item, index) => (
        <View key={index} style={tailwind("flex-row items-center mb-4")}>
          <View
            style={tailwind(
              `flex-row items-center bg-gray-200 p-2 rounded-md ${
                item.checked ? "bg-w3-gold-1" : ""
              }`
            )}
          >
            <Checkbox
              style={[tailwind("mr-2"), { width: 24, height: 24 }]}
              value={item.checked}
              onValueChange={() => onToggle(index)}
              color={item.checked ? "green" : "black"}
            />
            <AppText style={tailwind("text-base flex-1 ml-2")}>
              {item.label}
            </AppText>
          </View>
        </View>
      ))}
    </View>
  );
};

export default CheckboxComponent;
