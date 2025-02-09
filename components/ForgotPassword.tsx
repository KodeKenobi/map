import React, { useState } from "react";
import {
  TextInput,
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Text,
} from "react-native";
import AppText from "./AppText";
import { useTailwind } from "tailwind-rn";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import ButtonComponent from "./ButtonComponent";
import BackButton from "./BackButton";

export default function ForgotPassword() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigation = useNavigation();
  const tailwind = useTailwind();

  const handleForgotPassword = () => {
    navigation.navigate("OTPCode" as never);
  };

  return (
    <SafeAreaView style={tailwind("flex-1")}>
      <ScrollView>
        <View style={tailwind("flex-1 justify-center items-center mt-14")}>
          <View
            style={tailwind("flex-row items-center w-full p-4 justify-between")}
          >
            <BackButton navigation={navigation as NavigationProp<any>} />
            <Text style={tailwind("text-xl font-bold text-center")}>
              Forgot Password
            </Text>
            <View style={tailwind("w-10")} />
          </View>
        </View>
        <View style={tailwind("mb-4 p-4 mt-8")}>
          <AppText style={tailwind("text-center mb-8 text-md")}>
            <Text>
              Please enter your phone number below to reset your password.
            </Text>
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
          onPress={handleForgotPassword}
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
