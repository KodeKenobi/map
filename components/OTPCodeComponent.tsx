import React, { useState } from "react";
import {
  TextInput,
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from "react-native";
import AppText from "./AppText";
import { Ionicons } from "@expo/vector-icons";
import { useTailwind } from "tailwind-rn";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ButtonComponent from "./ButtonComponent";

export default function OTPCodeComponent() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigation = useNavigation();
  const tailwind = useTailwind();

  const handleOTPCode = () => {
    navigation.navigate("ResetPassword" as never);
  };

  return (
    <SafeAreaView style={tailwind("flex-1")}>
      <ScrollView>
        <View style={tailwind("flex-1 justify-center items-center mt-14")}>
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
              OTP Code
            </AppText>
            <View style={tailwind("w-10")} />
          </View>
        </View>
        <View style={tailwind("mb-4 p-4 mt-8")}>
          <AppText style={tailwind("text-center mb-8 ")}>
            We have sent a the OTP code via email to your email address. Please
            enter the code below to continue.
          </AppText>
          <TextInput
            style={styles.input}
            placeholder="Enter your phone number"
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
        </View>
      </ScrollView>

      <View style={tailwind("p-4")}>
        <ButtonComponent
          title="Submit"
          color="bg-w3-gold-1"
          textColor="#000"
          onPress={handleOTPCode}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 2,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
});
