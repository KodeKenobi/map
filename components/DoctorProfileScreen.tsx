import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { useTailwind } from "tailwind-rn";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import BackButton from "./BackButton";
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
              <Text style={tailwind("text-xl font-bold text-center")}>
                Dr. S. Ndou
              </Text>
            </View>
            <View style={tailwind("w-10")} />
          </View>
        </View>
        <View style={tailwind("flex-1 justify-center items-center p-4")}>
          <DoctorProfileCard />
        </View>

        <View style={tailwind("p-4")}>
          <Text style={tailwind("text-lg font-bold")}>
            <Text>Details</Text>
          </Text>
          <Text style={tailwind("text-gray-600 mt-2 text-md")}>
            <Text>
              Worem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              vulputate libero et velit interdum, ac aliquet odio mattis. Class
              aptent taciti sociosqu ad litora torquent per conubia nostra, per
              inceptos himenaeos.
            </Text>
          </Text>
        </View>

        <View style={tailwind("flex-row justify-between items-center p-4")}>
          <Text style={tailwind("text-lg font-bold text-gray-800")}>
            <Text>Working Hours</Text>
          </Text>
          <TouchableOpacity onPress={() => {}}>
            <Text style={tailwind("text-lg")}>See All</Text>
          </TouchableOpacity>
        </View>
        <View style={tailwind("p-4 mb-4")}>
          <View style={tailwind("flex-row justify-between")}>
            <Text
              key="10am"
              style={tailwind(
                "bg-gray-400 p-2 rounded-md w-30 font-semibold text-center"
              )}
            >
              <Text>10:00 AM</Text>
            </Text>
            <Text
              key="11am"
              style={tailwind(
                "bg-w3-green-grad-1 p-2 rounded-md w-30 font-semibold text-center"
              )}
            >
              <Text>11:00 AM</Text>
            </Text>
            <Text
              key="12pm"
              style={tailwind(
                "bg-gray-400 p-2 rounded-md w-30 font-semibold text-center"
              )}
            >
              <Text>12:00 PM</Text>
            </Text>
          </View>
        </View>

        <View style={tailwind("flex-row justify-between items-center p-4")}>
          <Text style={tailwind("text-lg font-bold text-gray-800")}>
            <Text>Date</Text>
          </Text>
          <TouchableOpacity onPress={() => {}}>
            <Text style={tailwind("text-lg")}>See All</Text>
          </TouchableOpacity>
        </View>
        <View style={tailwind("p-4")}>
          <View style={tailwind("flex-row justify-between")}>
            <Text
              key="sun5"
              style={tailwind(
                "bg-gray-400 p-2 rounded-md w-30 font-semibold text-center"
              )}
            >
              <Text>SUN 5</Text>
            </Text>
            <Text
              key="mon6"
              style={tailwind(
                "bg-gray-400 p-2 rounded-md w-30 font-semibold text-center"
              )}
            >
              <Text>MON 6</Text>
            </Text>
            <Text
              key="tue7"
              style={tailwind(
                "bg-w3-green-grad-1 p-2 rounded-md w-30 font-semibold text-center"
              )}
            >
              <Text>TUE 7</Text>
            </Text>
          </View>
        </View>

        <View style={tailwind("p-4 rounded mb-6")}>
          <ButtonComponent
            title="Book an Appointment"
            onPress={() => navigation.navigate("PaymentScreen" as never)}
            style={tailwind("mt-6 p-4 rounded mb-6")}
            color="#228564"
            textColor="#fff"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DoctorProfileScreen;
