import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { useTailwind } from "tailwind-rn";
import { useNavigation } from "@react-navigation/native";
import AppText from "./AppText";
import { Ionicons } from "@expo/vector-icons";

export default function Treatments() {
  const tailwind = useTailwind();
  const navigation = useNavigation();

  const treatments = [
    "Ozone Therapy",
    "Lymph Therapy",
    "Infrared Sauna",
    "Float Therapy",
    "Cold Water Immersion",
    "Ice Bath",
  ];

  const benefits = [
    "Clarify your Goals",
    "Overcome Obstacles",
    "Unlock Abundance",
    "Improve Immunity",
    "Baby Vitality",
    "Reduce Inflammation",
    "Support Overall Wellness",
    "Boost Energy",
    "Weight Loss",
    "Women's Health",
    "Immunisation",
    "Chronic Condition Management",
    "Increase Vitality and more...",
  ];

  return (
    <SafeAreaView style={tailwind("flex-1")}>
      <ScrollView>
        <View style={tailwind("flex-1 justify-center items-center mt-10")}>
          <View
            style={tailwind("flex-row items-center w-full p-4 justify-between")}
          >
            <View style={tailwind("bg-gray-200 rounded-full p-2")}>
              <TouchableOpacity
                style={tailwind("flex items-center justify-center")}
                onPress={() => {
                  if (navigation.canGoBack()) {
                    navigation.goBack();
                  } else {
                    alert("No previous screen to go back to.");
                  }
                }}
              >
                <Ionicons name="arrow-back" size={24} color="#000" />
              </TouchableOpacity>
            </View>
            <AppText style={tailwind("text-xl font-bold text-center")}>
              Treatments
            </AppText>
            <View style={tailwind("w-10")} />
          </View>
          <View style={tailwind("p-4")}>
            <View style={tailwind("bg-gray-200 rounded-lg shadow p-2")}>
              <View style={tailwind("flex-row flex-wrap justify-between")}>
                {treatments.map((treatment, index) => (
                  <View key={index} style={tailwind("w-1/1 mb-2 p-2")}>
                    <View style={tailwind("bg-white rounded-lg shadow p-4")}>
                      <AppText style={tailwind("text-lg text-center")}>
                        {treatment}
                      </AppText>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </View>
          <View style={tailwind("p-4")}>
            <Text style={tailwind("text-2xl font-bold mb-6 ")}>
              Benefits of our Treatments
            </Text>
            <View
              style={tailwind("bg-[rgba(255, 239, 204, 1)] rounded-lg mb-8")}
            >
              <View style={tailwind("flex-row flex-wrap justify-between")}>
                {benefits.map((benefit, index) => (
                  <View
                    key={index}
                    style={tailwind("w-1/2 mb-4 flex-row items-start")}
                  >
                    <Ionicons
                      name="checkmark-circle"
                      size={24}
                      color="green"
                      style={tailwind("mr-16")}
                    />
                    <AppText style={tailwind("text-lg")}>{benefit}</AppText>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
