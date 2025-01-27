import React from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { useTailwind } from "tailwind-rn";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import BackButton from "./BackButton";
import AppText from "./AppText";
import DoctorProfileCard from "./DoctorProfileCard";
import ButtonComponent from "./ButtonComponent";

const DoctorProfileScreen = () => {
  const tailwind = useTailwind();
  const navigation = useNavigation();

  return (
    <SafeAreaView style={tailwind("flex-1")}>
      <ScrollView>
        <View style={tailwind("flex-1 justify-center items-center mt-10")}>
          <View
            style={tailwind("flex-row items-center w-full p-4 justify-between")}
          >
            <BackButton navigation={navigation as NavigationProp<any>} />
            <View style={tailwind("flex-row items-center")}>
              <AppText style={tailwind("text-xl font-bold text-center")}>
                Dr. S. Ndou
              </AppText>
            </View>
            <View style={tailwind("w-10")} />
          </View>
        </View>
        <View style={tailwind("flex-1 justify-center items-center p-4")}>
          <DoctorProfileCard />
        </View>

        <View style={tailwind("p-4")}>
          <Text style={tailwind("text-lg font-bold")}>Details</Text>
          <Text style={tailwind("text-gray-600 mt-2 text-md")}>
            Worem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
            vulputate libero et velit interdum, ac aliquet odio mattis. Class
            aptent taciti sociosqu ad litora torquent per conubia nostra, per
            inceptos himenaeos.
          </Text>
        </View>

        <View style={tailwind("flex-row justify-between items-center p-4")}>
          <AppText style={tailwind("text-lg font-bold text-black")}>
            Working Hours
          </AppText>
          <TouchableOpacity onPress={() => {}}>
            <AppText style={tailwind("text-lg")}>See All</AppText>
          </TouchableOpacity>
        </View>
        <View style={tailwind("p-4 mb-4")}>
          <View style={tailwind("flex-row justify-between")}>
            <Text
              style={tailwind(
                "bg-gray-400 p-2 rounded-md w-30 font-semibold text-center"
              )}
            >
              10:00 AM
            </Text>
            <Text
              style={tailwind(
                "bg-w3-green-grad-1 p-2 rounded-md w-30 font-semibold text-center"
              )}
            >
              11:00 AM
            </Text>
            <Text
              style={tailwind(
                "bg-gray-400 p-2 rounded-md w-30 font-semibold text-center"
              )}
            >
              12:00 PM
            </Text>
          </View>
        </View>

        <View style={tailwind("flex-row justify-between items-center p-4")}>
          <AppText style={tailwind("text-lg font-bold text-black")}>
            Date
          </AppText>
          <TouchableOpacity onPress={() => {}}>
            <AppText style={tailwind("text-lg")}>See All</AppText>
          </TouchableOpacity>
        </View>
        <View style={tailwind("p-4")}>
          <View style={tailwind("flex-row justify-between")}>
            <Text
              style={tailwind(
                "bg-gray-400 p-2 rounded-md w-30 font-semibold text-center"
              )}
            >
              SUN 5
            </Text>
            <Text
              style={tailwind(
                "bg-gray-400 p-2 rounded-md w-30 font-semibold text-center"
              )}
            >
              MON 6
            </Text>
            <Text
              style={tailwind(
                "bg-w3-green-grad-1 p-2 rounded-md w-30 font-semibold text-center"
              )}
            >
              TUE 7
            </Text>
          </View>
        </View>

        <View style={tailwind("p-4 rounded mb-6")}>
          <ButtonComponent
            title="Book an Appointment"
            onPress={() => navigation.navigate("PaymentScreen" as never)}
            style={tailwind("mt-6 p-4 rounded mb-6")}
            color="bg-w3-green"
            textColor="#fff"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DoctorProfileScreen;
