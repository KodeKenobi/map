import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { useTailwind } from "tailwind-rn";
import AppText from "./AppText";

interface RecommendationsProps {
  iconUrl: any;
  title: string;
  backgroundColor?: string;
  iconBackgroundColor?: string;
}

const Recommendations: React.FC<RecommendationsProps> = ({
  iconUrl,
  title,
  backgroundColor,
  iconBackgroundColor,
}) => {
  const tailwind = useTailwind();

  return (
    <View
      style={[
        tailwind("p-4 rounded-lg mr-4 mb-6 flex-row items-center"),
        styles.card,
        { backgroundColor: backgroundColor || "#FCFCFC" },
        { padding: 10 },
      ]}
    >
      <View
        style={[
          tailwind("justify-center items-center mr-3 rounded-lg"),
          styles.iconContainer,
          { backgroundColor: iconBackgroundColor || "#E0E0E0" },
        ]}
      >
        <Image source={iconUrl} style={styles.icon} resizeMode="cover" />
      </View>

      <View style={[tailwind("justify-center items-center"), styles.title]}>
        <AppText style={tailwind("text-sm font-bold text-black")}>
          {title}
        </AppText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 340,
    height: 100,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  icon: {
    width: 36,
    height: 36,
  },
  title: {
    flexWrap: "wrap",
    marginLeft: 10,
  },
});

export default Recommendations;
