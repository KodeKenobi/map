import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Text,
  Alert,
  StyleSheet,
  AppState,
} from "react-native";
import AppText from "./AppText";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useTailwind } from "tailwind-rn";
import Toast from "react-native-toast-message";
import ButtonComponent from "./ButtonComponent";
import { supabase } from "../lib/supabase";

AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

export default function LoginScreen({ navigation }: { navigation: any }) {
  const tailwind = useTailwind();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "PASSWORD_RECOVERY") {
        const newPassword = prompt(
          "What would you like your new password to be?"
        );

        if (newPassword) {
          const { data, error } = await supabase.auth.updateUser({
            password: newPassword,
          });

          if (data) alert("Password updated successfully!");
          if (error) alert("There was an error updating your password.");
        }
      }
    });
  }, []);

  async function signInWithEmail() {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        Alert.alert(error.message);
        return;
      }

      Toast.show({
        text1: "Login successful",
        position: "bottom",
        visibilityTime: 3000,
        autoHide: true,
        type: "success",
      });

      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", data.user.id)
        .single();
    } catch (error) {
      Alert.alert((error as Error).message);
    } finally {
      setLoading(false);
    }
  }

  async function handleResetPassword() {
    if (!email) {
      Alert.alert("Error", "Please enter your email address");
      return;
    }

    try {
      setLoading(true);
      const redirectTo = __DEV__
        ? "exp://localhost:19000/--/reset-password"
        : "com.supabase://auth/callback";

      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo,
      });

      if (error) {
        Alert.alert("Error", error.message);
      } else {
        Alert.alert(
          "Password Reset",
          "Check your email for the password reset link"
        );
        setIsForgotPassword(false);
      }
    } catch (error) {
      Alert.alert("Error", (error as Error).message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {}, []);

  return (
    <>
      <View style={styles.container}>
        <View style={tailwind("mb-4 mt-14 items-center")}>
          <Image
            source={require("../assets/images/logo.png")}
            style={{ width: 296, height: 146 }}
          />
        </View>

        <AppText style={tailwind("text-2xl font-bold mb-6 mt-6 text-center")}>
          <Text>{isForgotPassword ? "Reset Password" : "Welcome"}</Text>
        </AppText>
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        {!isForgotPassword && (
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
        )}
        <TouchableOpacity
          style={styles.forgotPassword}
          onPress={() => {
            if (isForgotPassword) {
              setIsForgotPassword(false);
            } else {
              setIsForgotPassword(true);
              setPassword("");
            }
          }}
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
      </View>
      <Toast />
    </>
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
