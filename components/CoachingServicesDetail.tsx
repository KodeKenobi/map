import React from "react";
import {
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Text,
  Image,
} from "react-native";
import { useTailwind } from "tailwind-rn";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import AppText from "./AppText";
import { Ionicons } from "@expo/vector-icons";

interface Service {
  title: string;
  description: string;
}

type RouteParams = {
  CoachingServicesDetail: {
    title: string;
    services: Service[];
    backgroundColor?: string;
    imageUrl: any;
  };
};

const CoachingServicesDetail = () => {
  const tailwind = useTailwind();
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RouteParams, "CoachingServicesDetail">>();
  const { title, services, backgroundColor, imageUrl } = route.params;

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
              {title}
            </AppText>
            <View style={tailwind("w-10")} />
          </View>

          <View style={tailwind("p-4 w-full")}>
            <View
              style={[
                tailwind("rounded-lg border-2 p-4 mb-4 items-center"),
                {
                  backgroundColor: backgroundColor || "#FCFCFC",
                  borderColor: "#E5E7EB",
                  borderWidth: 4,
                },
              ]}
            >
              <Image
                source={imageUrl}
                style={tailwind("w-20 h-20 rounded-lg mb-3")}
                resizeMode="contain"
              />
              <AppText style={tailwind("text-lg font-bold")}>{title}</AppText>
            </View>

            <View style={tailwind("mt-4")}>
              <AppText style={tailwind("text-lg font-bold mb-4")}>
                Services
              </AppText>
              {services.map((service, index) => (
                <View
                  key={index}
                  style={tailwind("mb-4 pb-4 border-b border-gray-300")}
                >
                  <AppText style={tailwind("text-base font-semibold mb-2")}>
                    {service.title}
                  </AppText>
                  <Text style={tailwind("text-sm text-gray-600")}>
                    {service.description}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CoachingServicesDetail;
