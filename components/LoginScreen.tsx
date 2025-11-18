import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Text,
  Alert,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from "react-native";
import AppText from "./AppText";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useTailwind } from "tailwind-rn";
import Toast from "react-native-toast-message";
import ButtonComponent from "./ButtonComponent";
import { supabase } from "../lib/supabase";

export default function LoginScreen({
  navigation,
  route,
}: {
  navigation: any;
  route?: any;
}) {
  console.log("🔐 LoginScreen rendered");
  console.log("🔐 LoginScreen props:", {
    navigation: !!navigation,
    route: !!route,
  });
  console.log("🔐 LoginScreen timestamp:", new Date().toISOString());

  const tailwind = useTailwind();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [showEmailConfirmedMessage, setShowEmailConfirmedMessage] =
    useState(false);

  // Log state changes
  console.log("🔐 LoginScreen state:", {
    email: email ? `${email.substring(0, 3)}***` : "empty",
    password: password ? "***" : "empty",
    isPasswordVisible,
    loading,
    isForgotPassword,
    showEmailConfirmedMessage,
  });

  useEffect(() => {
    console.log("🔐 LoginScreen useEffect - checking email confirmation");
    console.log("🔐 Route params:", route?.params);
    // Check if user came from email confirmation
    if (route?.params?.emailConfirmed) {
      console.log("🔐 Email confirmed message will be shown");
      setShowEmailConfirmedMessage(true);
      setTimeout(() => {
        console.log("🔐 Hiding email confirmed message after 5 seconds");
        setShowEmailConfirmedMessage(false);
      }, 5000);
    } else {
      console.log("🔐 No email confirmation detected");
    }
  }, [route?.params]);

  useEffect(() => {
    console.log("🔐 LoginScreen setting up auth state change listener");
    supabase.auth.onAuthStateChange(async (event, session) => {
      console.log(
        "🔐 Auth state change in LoginScreen:",
        event,
        session?.user?.email
      );
      if (event === "PASSWORD_RECOVERY") {
        console.log("🔐 Password recovery event detected");
        const newPassword = prompt(
          "What would you like your new password to be?"
        );

        if (newPassword) {
          console.log("🔐 Updating password");
          const { data, error } = await supabase.auth.updateUser({
            password: newPassword,
          });

          if (data) {
            console.log("🔐 Password updated successfully");
            alert("Password updated successfully!");
          }
          if (error) {
            console.log("🔐 Error updating password:", error);
            alert("There was an error updating your password.");
          }
        } else {
          console.log("🔐 No new password provided");
        }
      }
    });
  }, []);

  async function signInWithEmail() {
    console.log("🔐 signInWithEmail called");
    console.log("🔐 Email:", email ? `${email.substring(0, 3)}***` : "empty");
    console.log("🔐 Password provided:", !!password);
    console.log("🔐 Setting loading to true");

    try {
      setLoading(true);

      console.log("🔐 Attempting to sign in with Supabase");
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      console.log("🔐 Sign in response:", { data: !!data, error: !!error });
      if (error) {
        console.log("🔐 Sign in error:", error.message);
        Alert.alert("Error", error.message);
        return;
      }

      console.log("🔐 Sign in successful, showing toast");
      Toast.show({
        text1: "Login successful",
        position: "bottom",
        visibilityTime: 3000,
        autoHide: true,
        type: "success",
      });

      console.log(
        "🔐 Profile data will be fetched automatically by the auth state change listener"
      );
      // Profile data will be fetched automatically by the auth state change listener
      // in the main app layout, so no need to fetch it here
    } catch (error) {
      console.error("🔐 Login error:", error);
      Alert.alert("Error", (error as Error).message);
    } finally {
      console.log("🔐 Setting loading to false");
      setLoading(false);
    }
  }

  async function handleResetPassword() {
    console.log("🔐 handleResetPassword called");
    console.log("🔐 Email:", email ? `${email.substring(0, 3)}***` : "empty");

    if (!email) {
      console.log("🔐 No email provided for password reset");
      Alert.alert("Error", "Please enter your email address");
      return;
    }

    try {
      console.log("🔐 Setting loading to true for password reset");
      setLoading(true);
      const redirectTo = __DEV__
        ? "exp://localhost:19000/--/reset-password"
        : "com.supabase://auth/callback";

      console.log("🔐 Redirect URL for password reset:", redirectTo);
      console.log("🔐 Sending password reset email");
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo,
      });

      console.log("🔐 Password reset response:", {
        data: !!data,
        error: !!error,
      });
      if (error) {
        console.log("🔐 Password reset error:", error.message);
        Alert.alert("Error", error.message);
      } else {
        console.log("🔐 Password reset email sent successfully");
        Alert.alert(
          "Password Reset",
          "Check your email for the password reset link"
        );
        setIsForgotPassword(false);
      }
    } catch (error) {
      console.error("🔐 Password reset error:", error);
      Alert.alert("Error", (error as Error).message);
    } finally {
      console.log("🔐 Setting loading to false for password reset");
      setLoading(false);
    }
  }

  // Input change handlers with logging
  const handleEmailChange = (text: string) => {
    console.log(
      "🔐 Email input changed:",
      text ? `${text.substring(0, 3)}***` : "empty"
    );
    setEmail(text);
  };

  const handlePasswordChange = (text: string) => {
    console.log("🔐 Password input changed:", text ? "***" : "empty");
    setPassword(text);
  };

  const handlePasswordVisibilityToggle = () => {
    console.log("🔐 Password visibility toggled:", !isPasswordVisible);
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleForgotPasswordToggle = () => {
    console.log("🔐 Forgot password toggled:", !isForgotPassword);
    if (isForgotPassword) {
      setIsForgotPassword(false);
    } else {
      setIsForgotPassword(true);
      setPassword("");
    }
  };

  useEffect(() => {}, []);

  return (
    <SafeAreaView style={tailwind("flex-1")}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={tailwind("mb-4 mt-14 items-center")}>
          <Image
            source={require("../assets/images/logo.png")}
            style={{ width: 296, height: 146 }}
          />
        </View>

        <AppText style={tailwind("text-2xl font-bold mb-6 mt-6 text-center")}>
          <Text>{isForgotPassword ? "Reset Password" : "Welcome"}</Text>
        </AppText>

        {showEmailConfirmedMessage && (
          <View
            style={tailwind(
              "bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4"
            )}
          >
            <AppText
              style={tailwind("text-green-700 text-center font-semibold")}
            >
              ✅ Email Confirmed! Your account is ready. Please sign in below.
            </AppText>
          </View>
        )}
        <AppText style={tailwind("text-sm font-semibold mb-2 text-gray-700")}>
          Email Address
        </AppText>
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={handleEmailChange}
          id="email"
          name="email"
          aria-label="Email Address"
        />
        {!isForgotPassword && (
          <View>
            <AppText
              style={tailwind("text-sm font-semibold mb-2 text-gray-700")}
            >
              Password
            </AppText>
            <View style={styles.inputContainer}>
              <TextInput
                style={[styles.input, { paddingRight: 50 }]}
                placeholder="Password"
                secureTextEntry={!isPasswordVisible}
                value={password}
                onChangeText={handlePasswordChange}
                id="password"
                name="password"
                aria-label="Password"
              />
              <TouchableOpacity
                onPress={handlePasswordVisibilityToggle}
                style={styles.eyeIcon}
              >
                <MaterialIcons
                  name={isPasswordVisible ? "visibility" : "visibility-off"}
                  size={24}
                  color="gray"
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
        <TouchableOpacity
          style={styles.forgotPassword}
          onPress={handleForgotPasswordToggle}
        >
          <AppText style={tailwind("text-md font-semibold")}>
            <Text>
              {isForgotPassword ? "Back to Login" : "Forgot password?"}
            </Text>
          </AppText>
        </TouchableOpacity>

        <ButtonComponent
          title={
            loading
              ? "Loading..."
              : isForgotPassword
                ? "Reset Password"
                : "Login"
          }
          color="#F9CF67"
          textColor="#000"
          onPress={isForgotPassword ? handleResetPassword : signInWithEmail}
        />

        <AppText style={styles.orText}>
          <Text>or</Text>
        </AppText>

        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
          style={{
            backgroundColor: "#7345B6",
            width: "100%",
            alignSelf: "center",
            padding: 15,
            borderRadius: 40,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Ionicons name="logo-facebook" size={24} color="white" />
          <AppText
            style={{
              textAlign: "center",
              fontSize: 16,
              fontWeight: "bold",
              marginLeft: 10,
            }}
            fontColor="#fff"
          >
            Login with Facebook
          </AppText>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "#fff",
            width: "100%",
            alignSelf: "center",
            padding: 15,
            borderRadius: 40,
            marginTop: 20,
            borderColor: "#7345B6",
            borderWidth: 1,
            marginBottom: 20,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Ionicons name="logo-google" size={24} color="#DB4437" />
          <AppText
            style={{
              color: "#000",
              textAlign: "center",
              fontSize: 16,
              fontWeight: "bold",
              marginLeft: 10,
            }}
          >
            Login with Google
          </AppText>
        </TouchableOpacity>

        <View
          style={{
            width: "100%",
            alignSelf: "center",
            padding: 15,
            marginTop: 20,
            marginBottom: 20,
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <AppText style={tailwind("text-base ")}>
            <Text>Don't have an account? </Text>
          </AppText>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <AppText style={tailwind("text-base  font-semibold")}>
              <Text>Sign up</Text>
            </AppText>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Toast />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
  inputContainer: {
    position: "relative",
    marginBottom: 15,
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
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: 20,
  },
  orText: {
    textAlign: "center",
    marginVertical: 10,
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
  signUpButton: {
    width: "100%",
    alignSelf: "center",
    padding: 15,
    marginTop: 20,
    marginBottom: 20,
  },
  signUpText: {
    color: "#000",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  imageContainer: {
    marginBottom: 20,
    marginTop: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  googlebtn: {
    marginTop: 20,
  },
});
