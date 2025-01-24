import React from "react";
import { View, Image } from "react-native";
import AppText from "./AppText";
import { useTailwind } from "tailwind-rn";

interface HomeCardProps {
  imageUrl: any;
  title: string;
  date: string;
  registrationText: string;
  backgroundColor?: string;
}

const HomeCardComponent: React.FC<HomeCardProps> = ({
  imageUrl,
  title,
  date,
  registrationText,
  backgroundColor,
}) => {
  const tailwind = useTailwind();

  return (
    <View
      style={[
        tailwind("p-3 rounded-lg mr-4 mb-2border-2"),
        {
          backgroundColor: backgroundColor || "#FCFCFC",
          width: 180,
          borderColor: "#E5E7EB",
          borderWidth: 4,
        },
      ]}
    >
      <Image
        source={imageUrl}
        style={tailwind("w-full h-24 rounded-lg mb-3")}
        resizeMode="cover"
      />
      <View style={tailwind("space-y-1")}>
        <AppText
          style={tailwind("text-md font-bold text-black  mb-2")}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {title}
        </AppText>
        <AppText style={tailwind("text-sm font-semibold text-gray-700 mb-2")}>
          {date}
        </AppText>
        <AppText style={tailwind("text-md font-extrabold ")}>
          {registrationText}
        </AppText>
      </View>
    </View>
  );
};

export default HomeCardComponent;
