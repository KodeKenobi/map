import React from "react";
import { Text, TextProps } from "react-native";
import { useTailwind } from "tailwind-rn/dist";

interface AppTextProps extends TextProps {}

const AppText = (props: AppTextProps) => {
  const tailwind = useTailwind();

  return (
    <Text
      allowFontScaling={false}
      {...props}
      style={{
        ...tailwind("./assets/fonts/regular.ttf"),
        ...(props.style as any),
      }}
    >
      {props.children}
    </Text>
  );
};

export default AppText;
