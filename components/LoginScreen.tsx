import React, { useState, useEffect } from "react";
import { View, TextInput, TouchableOpacity, Image } from "react-native";
import { StyleSheet } from "react-native";
import AppText from "./AppText";
import { Login } from "@/app/(auth)/auth";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useTailwind } from "tailwind-rn";
import Toast from "react-native-toast-message";
import ButtonComponent from "./ButtonComponent";
import { auth } from "@/app/(auth)/firebaseConfig";
import { getUserData } from "@/app/(auth)/auth";
// import {
//   GoogleSignin,
//   GoogleSigninButton,
// } from "@react-native-google-signin/google-signin";

export default function LoginScreen({ navigation }: { navigation: any }) {
  const tailwind = useTailwind();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // const GoogleSignIn = () => {
  //   const signIn = async () => {
  //     GoogleSignin.configure({
  //       scopes: [],
  //       webClientId:
  //         "541893526993-elf1nsemgjcghdt8ebqrh10jhsbpi238.apps.googleusercontent.com",
  //       offlineAccess: true,
  //     });
  //     try {
  //       await GoogleSignin.hasPlayServices();
  //       const userInfo = await GoogleSignin.signIn();
  //       console.log("userinfo", userInfo);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  // };

  const handleLogin = async () => {
    try {
      await Login(email, password);
      Toast.show({
        text1: "Login successful",
        position: "bottom",
        visibilityTime: 3000,
        autoHide: true,
        type: "success",
      });

      const user = auth.currentUser;
      if (user) {
        const data = await getUserData(user.uid);
        if (!data || !data.hasCompletedHomeOnboarding) {
          navigation.navigate("Welcome");
        } else {
          navigation.navigate("Home");
        }
      }
    } catch (error) {
      alert((error as Error).message);
    }
  };

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

        <AppText style={tailwind("text-2xl font-bold mb-6 mt-6  text-center")}>
          Welcome back
        </AppText>
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
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
        <TouchableOpacity
          style={styles.forgotPassword}
          onPress={() => navigation.navigate("ForgotPassword")}
        >
          <AppText style={tailwind("text-md font-semibold")}>
            Forgot password?
          </AppText>
        </TouchableOpacity>

        <ButtonComponent
          title="Login"
          color="bg-w3-gold"
          textColor="#000"
          onPress={handleLogin}
        />

        <AppText style={styles.orText}>or</AppText>

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
            Don't have an account?{" "}
          </AppText>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <AppText style={tailwind("text-base  font-semibold")}>
              Sign up
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
