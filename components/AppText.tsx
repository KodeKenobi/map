import React from "react";
import { Text, TextStyle } from "react-native";

interface AppTextProps {
  children: React.ReactNode;
  style?: TextStyle;
  numberOfLines?: number;
  ellipsizeMode?: "head" | "middle" | "tail";
  fontColor?: string;
}

const AppText: React.FC<AppTextProps> = ({ children, style, fontColor }) => {
  return (
    <Text style={[style, { color: fontColor || "#000000" }]}>{children}</Text>
  );
};

export default AppText;
