import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
  AppState,
} from "react-native";
import { StyleSheet } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useTailwind } from "tailwind-rn";
import CheckboxComponent from "./CheckboxComponent";
import AppText from "./AppText";
import ButtonComponent from "./ButtonComponent";
import { supabase } from "@/lib/supabase";

export default function RegisterScreen({ navigation }: { navigation: any }) {
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isSelected, setSelection] = useState(false);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const tailwind = useTailwind();

  const [items, setItems] = useState([
    { label: "Agree to the terms and use and privacy", checked: false },
  ]);

  async function signUpWithEmail() {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      phone: phone,
      password: password,
    });

    if (error) Alert.alert(error.message);
    if (!session)
      Alert.alert("Please check your inbox for email verification!");
    setLoading(false);
  }

  const handleToggle = (index: number) => {
    const item = items[index];
    const newCheckedState = !item.checked;
    const updatedItems = items.map((item, i) => ({
      ...item,
      checked: i === index ? newCheckedState : item.checked,
    }));
    setItems(updatedItems);
  };

  return (
    <SafeAreaView style={tailwind("flex-1")}>
      <ScrollView>
        <View style={tailwind("flex-1 justify-start items-center mt-14")}>
          <View
            style={tailwind("flex-row items-center justify-start w-full p-4")}
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
            <AppText style={tailwind("flex-1 text-xl font-bold text-center")}>
              Set up your account
            </AppText>
          </View>
        </View>

        <View style={tailwind("mb-4 mt-2 p-4")}>
          <AppText style={tailwind("text-center mt-2 mb-8 ")}>
            Please complete all information to create your account on Map
            Wellness
          </AppText>
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
            value={phone}
            onChangeText={setPhone}
          />
          <View style={{ position: "relative" }}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry={!isPasswordVisible}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              style={{ position: "absolute", right: 10, top: 15 }}
            >
              <MaterialIcons
                name={isPasswordVisible ? "visibility" : "visibility-off"}
                size={24}
                color="gray"
              />
            </TouchableOpacity>
          </View>
          <View style={{ position: "relative" }}>
            <TextInput
              style={styles.input}
              placeholder="Confirm your password"
              secureTextEntry={!isPasswordVisible}
            />
            <TouchableOpacity
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              style={{ position: "absolute", right: 10, top: 15 }}
            >
              <MaterialIcons
                name={isPasswordVisible ? "visibility" : "visibility-off"}
                size={24}
                color="gray"
              />
            </TouchableOpacity>
          </View>
          <CheckboxComponent
            items={items}
            onToggle={handleToggle}
            checkboxBackgroundColor="#228564"
            checkedBackgroundColor="bg-w3-green-grad-1"
            fontColor="#000"
          />

          <ButtonComponent
            title="Create Account"
            color="#F9CF67"
            textColor="#000"
            onPress={signUpWithEmail}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
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
    borderWidth: 2,
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
