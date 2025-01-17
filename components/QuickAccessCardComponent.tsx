import React from "react";
import { View, Image, StyleSheet, Text } from "react-native";
import { useTailwind } from "tailwind-rn";

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
          tailwind("justify-center items-center mr-3"),
          styles.iconContainer,
          { backgroundColor: iconBackgroundColor || "#E0E0E0" },
        ]}
      >
        <Image source={iconUrl} style={styles.icon} resizeMode="contain" />
      </View>

      <View style={tailwind("flex-1")}>
        <Text style={[tailwind("text-sm font-bold text-black "), styles.title]}>
          {title}
        </Text>
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

export default QuickAccessCardComponent;
