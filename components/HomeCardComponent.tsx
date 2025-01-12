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
        tailwind("p-3 bg-gray-100 rounded-lg mr-4 mb-6"),
        {
          backgroundColor: backgroundColor || "#FCFCFC",
          width: 180, // Smaller width for multiple cards
        },
      ]}
    >
      {/* Card Image */}
      <Image
        source={imageUrl}
        style={tailwind("w-full h-24 rounded-lg mb-3")}
        resizeMode="cover"
      />

      {/* Card Content */}
      <View style={tailwind("space-y-1")}>
        {/* Title */}
        <AppText
          style={tailwind("text-sm font-bold text-black leading-5 mb-2")}
        >
          {title}
        </AppText>

        {/* Date */}
        <AppText style={tailwind("text-xs font-semibold text-gray-700 mb-2")}>
          {date}
        </AppText>

        {/* Registration Text */}
        <AppText style={tailwind("text-xs font-extrabold text-purple-600")}>
          {registrationText}
        </AppText>
      </View>
    </View>
  );
};

export default HomeCardComponent;
