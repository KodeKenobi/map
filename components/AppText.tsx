import React from "react";
import { Text, TextStyle } from "react-native";

interface AppTextProps {
  children: React.ReactNode;
  style?: TextStyle;
}

const AppText: React.FC<AppTextProps> = ({ children, style }) => {
  return <Text style={style}>{children}</Text>;
};

export default AppText;
