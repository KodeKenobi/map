import React from "react";
import { Text, TextStyle, TextProps } from "react-native";

interface AppTextProps extends TextProps {
  children: React.ReactNode;
  style?: TextStyle;
  numberOfLines?: number;
  ellipsizeMode?: "head" | "middle" | "tail";
  fontColor?: string;
  color?: string;
}

const AppText: React.FC<AppTextProps> = ({
  children,
  style,
  fontColor,
  color,
}) => {
  return (
    <Text style={[style, { color: color || fontColor || "#000000" }]}>
      {children}
    </Text>
  );
};

export default AppText;
