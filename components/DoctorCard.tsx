import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { useTailwind } from "tailwind-rn";
import AppText from "./AppText";

const DoctorCard = () => {
  const tailwind = useTailwind();

  return (
    <View
      style={tailwind(
        "bg-white rounded-lg shadow p-4 w-full border border-gray-400"
      )}
    >
      <View style={tailwind("flex-row justify-between items-start ")}>
        <Image
          source={require("../assets/images/doctor.png")}
          style={tailwind("w-32 h-32 rounded-md")}
        />
        <View style={tailwind("flex-1 ml-24")}>
          <AppText style={tailwind("text-lg font-bold")}>Dr. S. Ndou</AppText>
          <AppText style={tailwind("text-w3-green text-md")}>
            General Practitioner
          </AppText>
          <View style={tailwind("flex-row justify-between mt-1")}>
            <AppText style={tailwind("text-gray-500 text-md font-semibold")}>
              10 years
            </AppText>
            <AppText style={tailwind("text-yellow-500 text-md font-semibold")}>
              ⭐ 4.8
            </AppText>
          </View>
        </View>
      </View>
      <View
        style={{ flexDirection: "row", alignItems: "center", marginTop: 30 }}
      >
        <View style={{ flex: 1, height: 1, backgroundColor: "lightgray" }} />
      </View>

      <View style={tailwind("mt-4 flex-row justify-between items-center")}>
        <View>
          <AppText style={tailwind("text-gray-500 text-md")}>
            Consultation Fee
          </AppText>
          <AppText style={tailwind("text-xl font-bold")}>R720</AppText>
        </View>
        <TouchableOpacity
          style={tailwind("bg-green-500 rounded-full px-8 py-2")}
        >
          <AppText
            style={tailwind("text-white text-center text-md font-semibold")}
          >
            Book
          </AppText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DoctorCard;
