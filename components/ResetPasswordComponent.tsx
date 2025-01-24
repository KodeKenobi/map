import React, { useState } from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import AppText from "./AppText";
import { useTailwind } from "tailwind-rn";
import ButtonComponent from "./ButtonComponent";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/build/Ionicons";

export default function ResetPasswordComponent() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigation = useNavigation();
  const tailwind = useTailwind();

  const handleResetPassword = () => {
    if (newPassword === confirmPassword) {
      // Here you would typically call your reset password function
      console.log("Password reset successfully");
      // Navigate to a success screen or back to login
      navigation.navigate("Home" as never); // Change to your desired screen
    } else {
      console.log("Passwords do not match");
      // Optionally show an error message to the user
    }
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
        Reset Password
      </AppText>
      <TextInput
        style={styles.input}
        placeholder="New Password"
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <ButtonComponent
        title="Reset Password"
        color="bg-w3-gold-1"
        textColor="#000"
        onPress={handleResetPassword}
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
