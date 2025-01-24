import React, { useState } from "react";
import {
  TextInput,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import AppText from "./AppText";
import ButtonComponent from "./ButtonComponent";
import { useTailwind } from "tailwind-rn";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/build/Ionicons";

export default function ResetPasswordComponent() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigation = useNavigation();
  const tailwind = useTailwind();

  const handleResetPassword = () => {
    // Add your password reset logic here
    navigation.navigate("SomeNextScreen" as never);
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
              Reset Password
            </AppText>
            <View style={tailwind("w-10")} />
          </View>
        </View>
        <View style={tailwind("mb-4 mt-2 p-4")}>
          <AppText style={tailwind("text-center mt-2 mb-8 ")}>
            Enter a new password to update your password
          </AppText>
          <TextInput
            style={styles.input}
            placeholder="New Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>
      </ScrollView>
      <View style={tailwind("p-4")}>
        <ButtonComponent
          title="Submit"
          color="bg-w3-gold-1"
          textColor="#000"
          onPress={handleResetPassword}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 2,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
});
