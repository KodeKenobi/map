import React from "react";
import { View, Image, StyleSheet } from "react-native";
import AppText from "./AppText";
import { useTailwind } from "tailwind-rn";

interface HomeCardProps {
  imageUrl: any;
  title: string;
  date: string;
  registrationText: string;
  backgroundColor?: string;
  textColor?: string;
}

const HomeCardComponent: React.FC<HomeCardProps> = ({
  imageUrl,
  title,
  date,
  registrationText,
  backgroundColor,
  textColor,
}) => {
  const tailwind = useTailwind();

  return (
    <View
      style={[
        tailwind("rounded-lg mr-4 border-2"),
        {
          backgroundColor: backgroundColor || "#FCFCFC",
          width: 200,
          borderColor: "#E5E7EB",
          borderWidth: 4,
        },
      ]}
    >
      <Image
        source={imageUrl}
        style={tailwind("w-full h-32 rounded-lg mb-3")}
        resizeMode="cover"
      />
      <View style={tailwind("p-2")}>
        <AppText
          style={tailwind(`text-md font-bold mb-2`)}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {""}
          {title}
        </AppText>
        <AppText style={tailwind(`text-sm mb-4`)}>
          {""}
          {date}
        </AppText>
        <AppText style={tailwind(`text-md font-extrabold`)} color={textColor}>
          {""}
          {registrationText}
        </AppText>
      </View>
    </View>
  );
};

export default HomeCardComponent;
