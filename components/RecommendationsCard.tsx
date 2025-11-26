import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { useTailwind } from "tailwind-rn";
import AppText from "./AppText";

interface RecommendationsProps {
  iconUrl: any;
  title: string;
  description?: string;
  backgroundColor?: string;
  iconBackgroundColor?: string;
}

const Recommendations: React.FC<RecommendationsProps> = ({
  iconUrl,
  title,
  description,
  backgroundColor,
  iconBackgroundColor,
}) => {
  const tailwind = useTailwind();

  return (
    <View
      style={[
        tailwind("p-4 rounded-lg mr-4 mb-6 flex-row items-center w-full"),
        styles.card,
        { backgroundColor: backgroundColor || "#FCFCFC" },
        { padding: 10 },
      ]}
    >
      <View
        style={[
          tailwind("justify-center items-center mr-3 overflow-hidden"),
          styles.iconContainer,
        ]}
      >
        <Image source={iconUrl} style={styles.icon} resizeMode="cover" />
      </View>

      <View style={[tailwind(""), styles.title]}>
        <AppText
          style={tailwind("text-md font-bold text-gray-800")}
          fontColor={"#BB8400"}
        >
          {description}
        </AppText>
        <AppText style={tailwind("text-lg font-bold font-bold")}>
          {title}
        </AppText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 100,
  },
  iconContainer: {
    width: 70,
    height: 70,
    borderRadius: 12,
  },
  icon: {
    width: 70,
    height: 70,
    borderRadius: 12,
  },
  title: {
    flexWrap: "wrap",
    marginLeft: 10,
  },
});

export default Recommendations;
