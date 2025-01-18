import React from "react";
import { Text, TextStyle } from "react-native";

interface AppTextProps {
  children: React.ReactNode;
  style?: TextStyle;
  numberOfLines?: number;
  ellipsizeMode?: "head" | "middle" | "tail";
}

const AppText: React.FC<AppTextProps> = ({ children, style }) => {
  return <Text style={style}>{children}</Text>;
};

export default AppText;
