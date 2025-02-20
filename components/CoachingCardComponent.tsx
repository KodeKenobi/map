import React from "react";
import { View, Image } from "react-native";
import AppText from "./AppText";
import { useTailwind } from "tailwind-rn";

interface CoachingCardProps {
  imageUrl: any;
  title?: string;
  backgroundColor?: string;
}

const CoachingCardComponent: React.FC<CoachingCardProps> = ({
  imageUrl,
  title,
  backgroundColor,
}) => {
  const tailwind = useTailwind();

  return (
    <View
      style={[
        tailwind("p-3 rounded-lg mr-4 border-2"),
        {
          backgroundColor: backgroundColor || "#FCFCFC",
          width: 160,
          borderColor: "#E5E7EB",
          borderWidth: 4,
        },
      ]}
    >
      <Image
        source={imageUrl}
        style={tailwind("w-16 h-16 rounded-lg mb-3 mx-auto")}
        resizeMode="contain"
      />
      <View style={tailwind("space-y-1")}>
        <AppText
          style={tailwind("text-sm font-bold text-center mb-2")}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {""}
          {title}
        </AppText>
      </View>
    </View>
  );
};

export default CoachingCardComponent;
