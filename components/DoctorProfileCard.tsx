import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
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
            <AppText style={tailwind("text-xl font-bold text-center")}>
              Dr. S. Ndou
            </AppText>
            <View style={tailwind("flex-row ml-2")}>
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
          </View>
          <AppText style={tailwind("text-w3-green text-md")}>
            General Practitioner
          </AppText>
          <View style={tailwind("flex-row justify-between mt-2")}>
            <AppText style={tailwind("text-gray-500 text-md font-semibold")}>
              Consultation Fee
            </AppText>
            <AppText style={tailwind("text-yellow-500 text-md font-semibold")}>
              R720
            </AppText>
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
              <AppText style={tailwind("text-sm font-semibold")}>
                Referral
              </AppText>
              <AppText style={tailwind("text-gray-500 text-sm mt-1")}>
                We do referrals to specialists accordingly
              </AppText>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default DoctorProfileCard;
