import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import AppText from "./AppText";
import { useTailwind } from "tailwind-rn";
import { useNavigation } from "@react-navigation/native";

interface Service {
  title: string;
  description: string;
}

interface CoachingCardProps {
  imageUrl: any;
  title?: string;
  backgroundColor?: string;
  services?: Service[];
}

const CoachingCardComponent: React.FC<CoachingCardProps> = ({
  imageUrl,
  title,
  backgroundColor,
  services,
}) => {
  const tailwind = useTailwind();
  const navigation = useNavigation();

  const handlePress = () => {
    if (services && services.length > 0) {
      (navigation as any).navigate("CoachingServicesDetail", {
        title,
        services,
        backgroundColor,
        imageUrl,
      });
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
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
    </TouchableOpacity>
  );
};

export default CoachingCardComponent;
