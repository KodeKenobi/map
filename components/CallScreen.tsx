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

const CallScreen = () => {
  const tailwind = useTailwind();
  const navigation = useNavigation();

  const handleEndCall = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={tailwind("flex-1 bg-w3-green-1")}>
      <ScrollView style={tailwind("flex-grow")}>
        <View style={tailwind("flex-1 justify-center items-center mt-10")}>
          <View
            style={tailwind("flex-row items-center w-full p-4 justify-between")}
          >
            <BackButton navigation={navigation as NavigationProp<any>} />
            <View style={tailwind("w-10")} />
          </View>
        </View>
        <View style={tailwind("items-center mt-32")}>
          <View className="flex-row items-center justify-center">
            <View
              style={{
                borderWidth: 2,
                borderColor: "#999",
                borderRadius: 160,
                overflow: "hidden",
              }}
            >
              <View
                style={{
                  padding: 10,
                  backgroundColor: "white",
                  borderRadius: 160,
                }}
              >
                <Image
                  source={require("../assets/images/doctor.png")}
                  style={{
                    width: 120,
                    height: 120,
                    borderRadius: 120,
                    borderColor: "gray",
                    borderWidth: 0.01,
                  }}
                  resizeMode="contain"
                />
              </View>
            </View>
          </View>
        </View>
        <View style={tailwind("flex-1 justify-center items-center p-4")}>
          <Text style={tailwind("text-white text-2xl font-bold mt-4")}>
            Dr. Sibo
          </Text>
          <Text style={tailwind("text-white text-lg mt-1")}>Ringing</Text>

          <View style={tailwind("flex-row mt-8")}>
            <TouchableOpacity
              style={tailwind("bg-white rounded-full p-4 mx-2")}
              onPress={() => {}}
            >
              <Image
                source={require("../assets/images/videocall-icon.png")}
                style={tailwind("w-8 h-8")}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={tailwind("bg-red-500 rounded-full p-4 mx-2")}
              onPress={handleEndCall}
            >
              <Image
                source={require("../assets/images/call-icon.png")}
                style={tailwind("w-8 h-8")}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={tailwind("bg-white rounded-full p-4 mx-2")}
              onPress={() => {}}
            >
              <Image
                source={require("../assets/images/messaging-icon.png")}
                style={tailwind("w-8 h-8")}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CallScreen;
