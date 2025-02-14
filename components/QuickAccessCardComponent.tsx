import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { useTailwind } from "tailwind-rn";
import AppText from "./AppText";

interface QuickAccessProps {
  iconUrl: any;
  title: string;
  backgroundColor?: string;
  iconBackgroundColor?: string;
}

const QuickAccessCardComponent: React.FC<QuickAccessProps> = ({
  iconUrl,
  title,
  backgroundColor,
  iconBackgroundColor,
}) => {
  const tailwind = useTailwind();

  return (
    <View
      style={[
        tailwind("p-3 rounded-lg mr-4 mb-6 flex-row items-center mr-24"),
        styles.card,
        { backgroundColor: backgroundColor || "#FCFCFC" },
      ]}
    >
      <View
        style={[
          tailwind("justify-center items-center"),
          styles.iconContainer,
          { backgroundColor: iconBackgroundColor || "#fff" },
        ]}
      >
        <Image source={iconUrl} style={styles.icon} resizeMode="contain" />
      </View>

      <View style={[tailwind("justify-center items-center"), styles.title]}>
        <AppText style={tailwind("text-sm font-bold text-gray-800")}>
          {title}
        </AppText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 260,
    height: 100,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 30,
  },
  icon: {
    width: 32,
    height: 32,
  },
  title: {
    flexWrap: "wrap",
    marginRight: 8,
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
});

export default QuickAccessCardComponent;
