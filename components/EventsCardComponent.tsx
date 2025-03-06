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

interface EventsCardProps {
  id: number;
  title: string;
  subtitle: string;
  date: string;
  tagline: string;
  tag: string;
  description: string;
  image_url: string;
}

// Update the navigation type
type RootStackParamList = {
  EventRead: {
    id: number;
    title: string;
    subtitle: string;
    date: string;
    tagline: string;
    tag: string;
    description: string;
    image_url: string;
  };
  // add other screens as needed
};

const EventsCardComponent: React.FC<EventsCardProps> = ({
  image_url,
  title,
  subtitle,
  date,
  description,
  tag,
  tagline,
  id,
}) => {
  const tailwind = useTailwind();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // Update the handleCardPress function
  const handleCardPress = () => {
    const eventData = {
      id,
      title,
      subtitle,
      date,
      image_url,
      description,
      tag,
      tagline,
    };
    navigation.navigate("EventRead", eventData);
  };

  return (
    <TouchableOpacity onPress={handleCardPress}>
      <View
        style={[
          tailwind("rounded-lg mr-4 border-2"),
          {
            backgroundColor: "#FCFCFC",
            width: 200,
            borderColor: "#E5E7EB",
            borderWidth: 4,
          },
        ]}
      >
        <Image
          source={
            typeof image_url === "string" ? { uri: image_url } : image_url
          }
          style={[
            tailwind("w-full h-32 rounded-lg mb-3"),
            { backgroundColor: "transparent" }, // Placeholder background while loading
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
          {/* <AppText
            style={tailwind("text-md font-extrabold mt-4")}
            color={textColor}
          >
            {cta}
          </AppText> */}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default EventsCardComponent;
