import React from "react";
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
import { useNavigation, NavigationProp } from "@react-navigation/native";

interface WideHomeCardProps {
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
};

const WideHomeCard: React.FC<WideHomeCardProps> = ({
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
    navigation.navigate("BlogRead", blogData);
  };

  return (
    <TouchableOpacity onPress={handleCardPress} style={tailwind("w-full mb-4")}>
      <View
        style={[
          tailwind("rounded-lg border-2"),
          {
            backgroundColor: backgroundColor || "#FCFCFC",
            width: "100%",
            borderColor: "#E5E7EB",
            borderWidth: 4,
          },
        ]}
      >
        <Image
          source={typeof imageUrl === "string" ? { uri: imageUrl } : imageUrl}
          style={[
            tailwind("w-full rounded-lg mb-3"),
            { height: 200, backgroundColor: "#f0f0f0" },
          ]}
          resizeMode="cover"
        />
        <View style={tailwind("p-2")}>
          <AppText
            style={
              StyleSheet.flatten([
                tailwind("text-md font-bold"),
                {
                  marginBottom: 4,
                },
              ]) as TextStyle
            }
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {title}
          </AppText>

          <Text
            style={tailwind("text-sm font-semibold mb-2")}
            numberOfLines={1}
          >
            {subtitle}
          </Text>

          {description && (
            <Text style={tailwind("text-md mt-1")} numberOfLines={2}>
              {description}
            </Text>
          )}

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

export default WideHomeCard;

