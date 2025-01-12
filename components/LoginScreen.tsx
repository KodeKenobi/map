import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  TouchableOpacity,
  Image,
  Platform,
} from "react-native";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AppText from "./AppText";
import { Login } from "@/app/(auth)/auth";
import { Ionicons } from "@expo/vector-icons";
// import auth from "@react-native-firebase/auth";
// import {
//   GoogleSignin,
//   GoogleSigninButton,
// } from "@react-native-google-signin/google-signin";

export default function LoginScreen({ navigation }: { navigation: any }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
      alert("Login successful");
      navigation.navigate("Home");
    } catch (error) {
      alert((error as Error).message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={require("../assets/images/logo.png")} />
      </View>
      <Text style={styles.title}>Welcome back</Text>
      <TextInput
        style={styles.input}
        placeholder="email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      ></TextInput>
      <TouchableOpacity style={styles.forgotPassword}>
        <Text>Forgot password?</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleLogin}
        style={{
          backgroundColor: "#F9CF67",
          width: "100%",
          alignSelf: "center",
          padding: 15,
          borderRadius: 40,
        }}
      >
        <Text
          style={{
            color: "#000",
            textAlign: "center",
            fontSize: 16,
            fontWeight: "bold",
          }}
        >
          Login
        </Text>
      </TouchableOpacity>

      <Text style={styles.orText}>or</Text>

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
        <Text
          style={{
            color: "#fff",
            textAlign: "center",
            fontSize: 16,
            fontWeight: "bold",
            marginLeft: 10,
          }}
        >
          Login with Facebook
        </Text>
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
        <Text
          style={{
            color: "#000",
            textAlign: "center",
            fontSize: 16,
            fontWeight: "bold",
            marginLeft: 10,
          }}
        >
          Login with Google
        </Text>
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
        <Text
          style={{
            color: "#000",
            textAlign: "center",
            fontSize: 16,
            fontWeight: "bold",
          }}
        >
          Don't have an account?{" "}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text
            style={{
              color: "#000",
              textAlign: "center",
              fontSize: 16,
              fontWeight: "bold",
              textDecorationLine: "underline",
            }}
          >
            Sign up
          </Text>
        </TouchableOpacity>
      </View>
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
