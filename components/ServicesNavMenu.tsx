import { View, TouchableOpacity, ScrollView, Image } from "react-native";
import { useTailwind } from "tailwind-rn";
import AppText from "./AppText";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

export default function ServicesNavMenu({
  backgroundColor,
}: {
  backgroundColor?: string;
}) {
  const tailwind = useTailwind();
  const navigation = useNavigation();
  const [selectedPill, setSelectedPill] = useState<string | null>(null);

  const pills = [
    {
      id: "1",
      title: "Consult",
      icon: "checkmark-circle",
      image: require("../assets/images/consult-nav.png"),
      backgroundColor: "rgba(74, 244, 170, 0.16)",
    },
    {
      id: "2",
      title: "Treatments",
      icon: "checkmark-circle",
      image: require("../assets/images/treatments-nav.png"),
    },
    {
      id: "3",
      title: "Appointments",
      icon: "checkmark-circle",
      image: require("../assets/images/appointments-nav.png"),
    },
    {
      id: "4",
      title: "Products",
      icon: "checkmark-circle",
      image: require("../assets/images/products-nav.png"),
    },
  ];

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={tailwind("mt-4")}
    >
      {pills.map((pill) => (
        <TouchableOpacity
          key={pill.id}
          onPress={() => {
            setSelectedPill(pill.id);
            navigation.navigate(pill.title as never);
          }}
        >
          <View
            style={tailwind(
              `flex-row items-center rounded-full p-2 mr-22 ${
                selectedPill === pill.id
                  ? "bg-w3-green"
                  : backgroundColor || "bg-gray-200"
              }`
            )}
          >
            <Image
              style={{
                width: 16,
                height: 16,
                resizeMode: "contain",
                marginRight: 8,
              }}
              source={pill.image}
            />
            <AppText style={tailwind("text-white font-semibold")}>
              {pill.title}
            </AppText>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
