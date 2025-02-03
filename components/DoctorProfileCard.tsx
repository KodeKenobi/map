import React from "react";
import { View, Image, TouchableOpacity, Text } from "react-native";
import { useTailwind } from "tailwind-rn";
import AppText from "./AppText";
import { useNavigation } from "@react-navigation/native";

const DoctorProfileCard = () => {
  const tailwind = useTailwind();
  const navigation = useNavigation();

  return (
    <View style={tailwind("rounded-lg shadow p-4 w-full")}>
      <View style={tailwind("flex-row justify-between items-start ")}>
        <View style={tailwind("relative")}>
          <Image
            source={require("../assets/images/doctor.png")}
            style={tailwind("w-16 h-16 rounded-md")}
          />
          <View
            style={tailwind(
              "absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full border border-white"
            )}
          />
        </View>
        <View style={tailwind("flex-1 ml-24")}>
          <View style={tailwind("flex-row items-center")}>
            <Text style={tailwind("text-xl font-bold text-center")}>
              <Text>Dr. S. Ndou</Text>
            </Text>
            <View style={tailwind("flex-row ml-2")}>
              <TouchableOpacity
                style={tailwind("rounded-full p-2")}
                onPress={() => navigation.navigate("Message" as never)}
              >
                <Image
                  source={require("../assets/images/messaging-icon.png")}
                  style={tailwind("w-10 h-10")}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={tailwind("rounded-full p-2 ml-2")}
                onPress={() => navigation.navigate("CallScreen" as never)}
              >
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
          </View>
          <Text style={tailwind("text-w3-green text-md")}>
            <Text>General Practitioner</Text>
          </Text>
          <View style={tailwind("flex-row justify-between mt-2")}>
            <Text style={tailwind("text-gray-500 text-md font-semibold")}>
              <Text>Consultation Fee</Text>
            </Text>
            <Text style={tailwind("text-yellow-500 text-md font-semibold")}>
              <Text>R720</Text>
            </Text>
          </View>
          <View
            style={tailwind(
              "flex-row items-center mt-4 bg-gray-100 p-2 rounded-md"
            )}
          >
            <View style={tailwind("flex-row items-center px-2")}>
              <Image
                source={require("../assets/images/info-icon.png")}
                style={tailwind("w-12 h-12 rounded-md")}
                resizeMode="contain"
              />
            </View>
            <View style={tailwind("flex-1 ml-22")}>
              <Text style={tailwind("text-sm font-semibold")}>
                <Text>Referral</Text>
              </Text>
              <Text style={tailwind("text-gray-500 text-sm mt-1")}>
                <Text>We do referrals to specialists accordingly</Text>
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default DoctorProfileCard;
