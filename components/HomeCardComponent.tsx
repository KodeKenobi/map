import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextStyle,
} from "react-native";
import AppText from "./AppText";
import { useTailwind } from "tailwind-rn";
import Icon from "react-native-vector-icons/AntDesign";
import { useNavigation, NavigationProp } from "@react-navigation/native";

interface HomeCardProps {
  imageUrl: any;
  title: string;
  subtitle: string;
  backgroundColor?: string;
  textColor?: string;
  description?: string;
  tag?: string;
  cta?: string;
  id: number;
}

// Update the navigation type
type RootStackParamList = {
  BlogRead: {
    id?: number;
    title: string;
    subtitle: string;
    imageUrl: any;
    description?: string;
    tag?: string;
    cta?: string;
  };
  // add other screens as needed
};

const HomeCardComponent: React.FC<HomeCardProps> = ({
  imageUrl,
  title,
  subtitle,
  backgroundColor,
  textColor,
  description,
  tag,
  cta,
  id,
}) => {
  const tailwind = useTailwind();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // Update the handleCardPress function
  const handleCardPress = () => {
    const blogData = {
      id,
      title,
      subtitle,
      imageUrl,
      description,
      tag,
      cta,
    };
    console.log("Navigating to BlogRead with data:", blogData);
    navigation.navigate("BlogRead", blogData);
  };

  return (
    <TouchableOpacity onPress={handleCardPress}>
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
          source={typeof imageUrl === "string" ? { uri: imageUrl } : imageUrl}
          style={[
            tailwind("w-full h-32 rounded-lg mb-3"),
            { backgroundColor: "#f0f0f0" }, // Placeholder background while loading
          ]}
          resizeMode="cover"
        />
        <View style={tailwind("p-2")}>
          <AppText
            style={
              StyleSheet.flatten([
                tailwind("text-md font-bold"),
                {
                  height: 44, // Fixed height for 2 lines
                  lineHeight: 22, // Consistent line height
                  marginBottom: 8,
                },
              ]) as TextStyle
            }
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {title}
          </AppText>
          <AppText style={tailwind("text-md font-extrabold")}>
            {subtitle}
          </AppText>
          <AppText
            style={tailwind("text-md font-extrabold mt-4")}
            color={textColor}
          >
            {cta}
          </AppText>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default HomeCardComponent;
