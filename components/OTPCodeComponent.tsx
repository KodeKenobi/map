import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import AppText from "./AppText";
import { useTailwind } from "tailwind-rn";
import ButtonComponent from "./ButtonComponent";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/build/Ionicons";

export default function OTPCodeComponent() {
  const [otp, setOtp] = useState("");
  const navigation = useNavigation();
  const tailwind = useTailwind();

  const handleSubmit = () => {
    navigation.navigate("ResetPassword" as never);
  };

  return (
    <View style={styles.container}>
      <View style={tailwind("absolute mt-12 top-4 left-4")}>
        <TouchableOpacity
          style={tailwind("absolute left-2 top-2 p-2")}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
      </View>
      <AppText
        style={tailwind("text-2xl font-bold mb-4 text-gray-800 text-center")}
      >
        Enter OTP
      </AppText>
      <AppText style={tailwind("text-center mb-4 text-gray-600")}>
        Please enter the OTP sent to your registered phone number or email.
      </AppText>
      <TextInput
        style={styles.input}
        placeholder="Enter OTP"
        keyboardType="numeric"
        value={otp}
        onChangeText={setOtp}
      />
      <ButtonComponent
        title="Submit"
        color="bg-w3-gold-1"
        textColor="#000"
        onPress={handleSubmit}
      />
    </View>
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
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
});
