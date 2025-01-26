import React, { useState } from "react";
import { View, Image, TouchableOpacity, Modal } from "react-native";
import { useTailwind } from "tailwind-rn";
import AppText from "./AppText";
import { useNavigation } from "@react-navigation/native";

const DoctorCard = () => {
  const tailwind = useTailwind();
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View
      style={tailwind(
        "bg-white rounded-lg shadow p-4 w-full border border-gray-400"
      )}
    >
      <View style={tailwind("flex-row justify-between items-start ")}>
        <View style={tailwind("relative")}>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Image
              source={require("../assets/images/doctor.png")}
              style={{
                ...tailwind("w-32 h-32 rounded-md"),
                borderTopRightRadius: 12,
              }}
            />
          </TouchableOpacity>
          <View
            style={{
              position: "absolute",
              top: -2,
              right: -4,
              width: 24,
              height: 24,
              backgroundColor: "green",
              borderRadius: 12,
              borderColor: "white",
              borderWidth: 2,
            }}
          />
        </View>
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
          onPress={() => {
            navigation.navigate("DoctorProfile" as never);
          }}
        >
          <AppText
            style={tailwind("text-white text-center text-md font-semibold")}
          >
            Book
          </AppText>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={tailwind(
            "flex-1 justify-center items-center bg-black bg-opacity-50"
          )}
          onPress={() => setModalVisible(false)}
        >
          <View style={tailwind("relative w-3/4 h-3/4")}>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={tailwind("absolute top-4 right-4 z-10")}
            ></TouchableOpacity>
            <Image
              source={require("../assets/images/doctor.png")}
              style={tailwind("w-full h-full rounded-md")}
              resizeMode="contain"
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default DoctorCard;
