import React from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useTailwind } from "tailwind-rn";
import AppText from "./AppText";

interface QuickAccessProps {
  iconUrl: any;
  title: string;
  backgroundColor?: string;
  iconBackgroundColor?: string;
  navigation: any;
}

const QuickAccessCardComponent: React.FC<QuickAccessProps> = ({
  iconUrl,
  title,
  backgroundColor,
  iconBackgroundColor,
  navigation,
}) => {
  const tailwind = useTailwind();

  const handlePress = () => {
    if (backgroundColor === "rgba(74, 244, 170, 0.16)") {
      navigation.navigate("WellnessHome");
    } else if (backgroundColor === "rgba(115, 69, 182, 0.16)") {
      navigation.navigate("WisdomHome");
    } else if (backgroundColor === "rgba(252, 202, 102, 0.3)") {
      navigation.navigate("WealthHome");
    }
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View
        style={[
          tailwind("p-3 rounded-lg mb-6 flex-row items-center mr-24"),
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
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    // width: 260,
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
