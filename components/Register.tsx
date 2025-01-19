import React, { useState } from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import { Register } from "../app/(auth)/auth";
import { Ionicons } from "@expo/vector-icons";
import { useTailwind } from "tailwind-rn";
import CheckboxComponent from "./CheckboxComponent";
import AppText from "./AppText";
import ButtonComponent from "./ButtonComponent";

export default function RegisterScreen({ navigation }: { navigation: any }) {
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isSelected, setSelection] = useState(false);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const tailwind = useTailwind();

  const [items, setItems] = useState([
    { label: "Agree to the terms and use and privacy", checked: false },
  ]);

  const handleSignUp = async () => {
    try {
      await Register(email, password, firstName, lastName, phoneNumber);
      alert("Sign up successful");
      navigation.navigate("Login");
    } catch (error) {
      alert((error as Error).message);
    }
  };

  const handleToggle = (index: number) => {
    const item = items[index];
    const newCheckedState = !item.checked;
    console.log(
      `Item: ${item.label} has been ${
        newCheckedState ? "selected" : "unselected"
      }`
    );
    const updatedItems = items.map((item, i) => ({
      ...item,
      checked: i === index ? newCheckedState : item.checked,
    }));
    setItems(updatedItems);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={tailwind("absolute left-4 top-4")}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>
      <AppText
        style={tailwind(
          "text-2xl font-bold mb-2 mt-16 text-gray-800 text-center"
        )}
      >
        Set up your account
      </AppText>
      <AppText style={tailwind("text-center mt-2 mb-8 text-gray-800")}>
        Please complete all information to create your account on Map Wellness
      </AppText>
      <TextInput
        style={styles.input}
        placeholder="Enter your first name"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your last name"
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your phone number"
        keyboardType="phone-pad"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm your password"
        secureTextEntry
      />
      <CheckboxComponent items={items} onToggle={handleToggle} />

      <ButtonComponent
        title="Create Account"
        color="bg-w3-gold-1"
        textColor="#000"
        onPress={handleSignUp}
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  createAccountButton: {
    backgroundColor: "#F9CF67",
    width: "100%",
    alignSelf: "center",
    padding: 15,
    borderRadius: 40,
    marginBottom: 10,
  },
  createAccountText: {
    color: "#000",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  label: {
    margin: 8,
  },
});
