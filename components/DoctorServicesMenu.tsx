import { View, TouchableOpacity, ScrollView, Image, Text } from "react-native";
import { useTailwind } from "tailwind-rn";
import AppText from "./AppText";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";

export default function DoctorServicesMenu() {
  const tailwind = useTailwind();
  const navigation = useNavigation();
  const [selectedPill, setSelectedPill] = useState<string | null>("1");

  const pills = [
    {
      id: "1",
      title: "Consult",
      icon: "checkmark-circle",
      image: require("../assets/images/consult-nav.png"),
    },
    {
      id: "2",
      title: "Appointments",
      icon: "checkmark-circle",
      image: require("../assets/images/appointments-nav.png"),
    },
  ];

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={tailwind("mt-0")}
    >
      {pills.map((pill) => (
        <TouchableOpacity
          key={pill.id}
          onPress={() => {
            setSelectedPill(pill.id);
            navigation.navigate(pill.title as never);
          }}
          style={tailwind("flex items-center justify-center")}
        >
          <View
            style={tailwind(
              `flex-row items-center rounded-full p-2 mr-22 ${
                selectedPill === pill.id ? "bg-w3-green-1" : "bg-gray-200"
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
            <AppText style={tailwind("text-white font-semibold mr-24")}>
              <Text>{pill.title}</Text>
            </AppText>
          </View>
        </TouchableOpacity>
      ))}
      <View style={tailwind("flex-row ml-4 items-center")}>
        <TouchableOpacity style={tailwind("rounded-full p-2")}>
          <Image
            source={require("../assets/images/messaging-icon.png")}
            style={tailwind("w-10 h-10")}
          />
        </TouchableOpacity>
        <TouchableOpacity style={tailwind("rounded-full p-2 ml-2")}>
          <Image
            source={require("../assets/images/call-icon.png")}
            style={tailwind("w-10 h-10")}
          />
        </TouchableOpacity>
        <TouchableOpacity style={tailwind("rounded-full p-2 ml-2")}>
          <Image
            source={require("../assets/images/videocall-icon.png")}
            style={tailwind("w-10 h-10")}
          />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
