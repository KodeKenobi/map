import { View, TouchableOpacity, ScrollView, Image } from "react-native";
import { useTailwind } from "tailwind-rn";
import AppText from "./AppText";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

export default function WisdomNavMenu() {
  const tailwind = useTailwind();
  const navigation = useNavigation();
  const [selectedPill, setSelectedPill] = useState<string | null>(null);

  const pills = [
    {
      id: "1",
      title: "Coaching",
      icon: require("../assets/images/coaching-icon.png"),
    },
    {
      id: "2",
      title: "Mindfulness",
      icon: require("../assets/images/mindfulness-icon.png"),
    },
    {
      id: "3",
      title: "Community",
      icon: require("../assets/images/community-icon.png"),
    },
    {
      id: "4",
      title: "Resources",
      icon: require("../assets/images/resource-icon.png"),
    },
    {
      id: "5",
      title: "Retreats",
      icon: require("../assets/images/retreats-icon.png"),
    },
  ];

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={tailwind("p-4")}
    >
      {pills.map((pill) => (
        <TouchableOpacity
          key={pill.id}
          onPress={() => {
            setSelectedPill(pill.id);
            navigation.navigate(pill.title as never);
          }}
          style={tailwind("items-center mr-24")}
        >
          <View
            style={[
              tailwind(
                `items-center justify-center rounded-full w-16 h-16 mb-2 ${
                  selectedPill === pill.id
                    ? "bg-w3-purple-primary"
                    : "bg-w3-purple-opacity"
                }`
              ),
              {
                shadowColor: "#fff",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              },
            ]}
          >
            <Image
              style={{
                width: 40,
                height: 40,
                resizeMode: "contain",
                tintColor: selectedPill === pill.id ? "#fff" : "#000",
              }}
              source={pill.icon}
            />
          </View>
          <AppText
            style={tailwind(
              `text-sm font-semibold ${
                selectedPill === pill.id
                  ? "text-w3-purple-primary"
                  : "text-black"
              }`
            )}
          >
            {pill.title}
          </AppText>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
