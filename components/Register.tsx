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
import CustomAlert from "./CustomAlert";
import ButtonComponent from "./ButtonComponent";
import { supabase } from "@/lib/supabase";
import Toast from "react-native-toast-message";

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
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertConfig, setAlertConfig] = useState({
    type: "success" as "success" | "warning" | "error" | "info",
    title: "",
    message: "",
    onAction: undefined as (() => void) | undefined,
    actionText: undefined as string | undefined,
  });

  const tailwind = useTailwind();

  const showAlert = (
    type: "success" | "warning" | "error" | "info",
    title: string,
    message: string,
    onAction?: () => void,
    actionText?: string
  ) => {
    setAlertConfig({ type, title, message, onAction, actionText });
    setAlertVisible(true);
  };

  const checkPendingInvitation = async () => {
    try {
      const { data, error } = await supabase.auth.resend({
        type: "signup",
        email: email,
      });

      if (error && error.message.includes("already registered")) {
        showAlert(
          "warning",
          "Email Already Registered",
          "This email is already registered but not confirmed. Would you like to resend the confirmation email?"
        );
        return true; // Has pending invitation
      }
      return false;
    } catch (err) {
      return false;
    }
  };

  const resendConfirmation = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.resend({
        type: "signup",
        email: email,
      });

      if (error) {
        showAlert("error", "Resend Failed", error.message);
      } else {
        showAlert(
          "success",
          "Email Sent",
          `Confirmation email resent to ${email}. Please check your inbox.`
        );
      }
    } catch (err) {
      showAlert("error", "Error", "Failed to resend confirmation email.");
    } finally {
      setLoading(false);
    }
  };

  const [items, setItems] = useState([
    { label: "Agree to the terms and use and privacy", checked: false },
  ]);

  async function signUpWithEmail() {
    setLoading(true);

    try {
      const {
        data: { session, user },
        error,
      } = await supabase.auth.signUp({
        email: email,
        phone: phone,
        password: password,
      });

      if (error) {
        // Check if it's a "user already registered" error
        if (
          error.message.includes("already registered") ||
          error.message.includes("User already registered")
        ) {
          showAlert(
            "warning",
            "Email Already Registered",
            "This email is already registered but not confirmed. Would you like to resend the confirmation email?",
            resendConfirmation,
            "Resend Email"
          );
        } else {
          showAlert("error", "Registration Failed", error.message);
        }
        console.error("Signup error:", error);
      } else if (user && !session) {
        // User created but needs email confirmation
        console.log("User created, email confirmation sent:", user);

        showAlert(
          "success",
          "Check Your Email",
          `We've sent a confirmation email to ${email}. Please check your inbox and click the verification link to complete your registration.`
        );
      } else if (session) {
        // User created and already confirmed (rare)
        showAlert(
          "success",
          "Account Created",
          "Your account has been created successfully!"
        );
        console.log("User created and confirmed:", user);
      }
    } catch (err) {
      Alert.alert("Error", "An unexpected error occurred. Please try again.");
      console.error("Unexpected error:", err);
    } finally {
      setLoading(false);
    }
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
          <AppText style={tailwind("text-sm font-semibold mb-2 text-gray-700")}>
            Email Address
          </AppText>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            id="register-email"
            name="register-email"
            aria-label="Email Address"
          />
          <AppText style={tailwind("text-sm font-semibold mb-2 text-gray-700")}>
            Phone Number
          </AppText>
          <TextInput
            style={styles.input}
            placeholder="Enter your phone number"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
            id="phone"
            name="phone"
            aria-label="Phone Number"
          />
          <AppText style={tailwind("text-sm font-semibold mb-2 text-gray-700")}>
            Password
          </AppText>
          <View style={{ position: "relative" }}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry={!isPasswordVisible}
              value={password}
              onChangeText={setPassword}
              id="register-password"
              name="register-password"
              aria-label="Password"
            />
            <TouchableOpacity
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              style={{
                position: "absolute",
                right: 10,
                top: 15,
                height: 24,
                width: 24,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <MaterialIcons
                name={isPasswordVisible ? "visibility" : "visibility-off"}
                size={24}
                color="gray"
              />
            </TouchableOpacity>
          </View>
          <AppText style={tailwind("text-sm font-semibold mb-2 text-gray-700")}>
            Confirm Password
          </AppText>
          <View style={{ position: "relative" }}>
            <TextInput
              style={styles.input}
              placeholder="Confirm your password"
              secureTextEntry={!isPasswordVisible}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              id="confirm-password"
              name="confirm-password"
              aria-label="Confirm Password"
            />
            <TouchableOpacity
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              style={{
                position: "absolute",
                right: 10,
                top: 15,
                height: 24,
                width: 24,
                justifyContent: "center",
                alignItems: "center",
              }}
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

      <CustomAlert
        visible={alertVisible}
        type={alertConfig.type}
        title={alertConfig.title}
        message={alertConfig.message}
        onClose={() => setAlertVisible(false)}
        onAction={alertConfig.onAction}
        actionText={alertConfig.actionText}
      />
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
    marginBottom: 25,
    paddingHorizontal: 10,
  },
  inputContainer: {
    position: "relative",
    marginBottom: 25,
  },
  eyeIcon: {
    position: "absolute",
    right: 15,
    top: 13,
    height: 24,
    width: 24,
    justifyContent: "center",
    alignItems: "center",
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
