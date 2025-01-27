import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useTailwind } from "tailwind-rn";
import BackButton from "./BackButton";
import DoctorProfileCard from "./DoctorProfileCard";
import AppText from "./AppText";
import { NavigationProp } from "@react-navigation/native";
import DoctorServicesMenu from "./DoctorServicesMenu";
import { StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const MessageComponent = ({ navigation }: { navigation: any }) => {
  const tailwind = useTailwind();

  return (
    <SafeAreaView style={tailwind("flex-1")}>
      <ScrollView style={tailwind("flex-grow")}>
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
          <DoctorServicesMenu />
        </View>
      </ScrollView>
      <View style={tailwind("absolute left-0 bottom-0 right-0 p-2 shadow-lg")}>
        <View
          style={tailwind("flex-row items-center mb-4 w-full rounded-lg p-2")}
        >
          <TouchableOpacity style={tailwind("mr-2")}>
            <Text style={{ fontSize: 24 }}>😊</Text>
          </TouchableOpacity>
          <View style={tailwind("flex-1 mt-4 ml-8")}>
            <TextInput
              style={[
                styles.input,
                {
                  flex: 1,
                  backgroundColor: tailwind("bg-gray-200")
                    .backgroundColor as string,
                  borderRadius: 20,
                  borderColor: "lightgray",
                  paddingHorizontal: 10,
                },
              ]}
              placeholder="Write here..."
              secureTextEntry={false}
            />
          </View>
          <TouchableOpacity
            onPress={() => {}}
            style={{
              backgroundColor: "#228565",
              borderRadius: 20,
              padding: 10,
              marginLeft: 4,
            }}
          >
            <MaterialIcons name={"send"} size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MessageComponent;

const styles = StyleSheet.create({
  input: {
    height: 50,
    borderColor: "transparent",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
});
