import { auth } from "../app/(auth)/firebaseConfig";
import React, { useEffect, useState } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { useTailwind } from "tailwind-rn";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import AppText from "./AppText";
import Ionicons from "@expo/vector-icons/build/Ionicons";
import { getUserData } from "@/app/(auth)/auth";

const ProfileComponent = () => {
  const tailwind = useTailwind();
  const navigation = useNavigation<NavigationProp<any>>();
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      getUserData(user.uid).then((data) => {
        if (data) {
          setUserName(data.firstName + " " + data.lastName);
        }
      });
    }
  }, []);

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        console.log("User logged out");
        navigation.navigate("Login"); // Navigate to the login screen
      })
      .catch((error) => {
        console.error("Logout error:", error);
        alert("An error occurred while logging out. Please try again.");
      });
  };

  return (
    <View style={tailwind("flex-1 p-4")}>
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
        Profile
      </AppText>
      <View style={tailwind("mt-8 items-center")}>
        <View className="flex-row items-center justify-center">
          <View
            style={{
              borderWidth: 4,
              borderColor: "#999",
              borderRadius: 160,
              overflow: "hidden",
            }}
          >
            <View
              style={{
                padding: 10,
                backgroundColor: "white",
                borderRadius: 160,
              }}
            >
              <Image
                source={require("../assets/images/logo.png")}
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: 120,
                  borderColor: "rgba(153, 153, 153, 0.1)",
                  borderWidth: 1,
                }}
                resizeMode="contain"
              />
            </View>
          </View>
        </View>
        <AppText style={tailwind("text-2xl font-bold mt-6 text-center")}>
          {userName || "User"}
        </AppText>
      </View>

      <View style={tailwind("mt-8 items-start")}>
        <TouchableOpacity
          style={tailwind("flex-row items-center justify-start")}
        >
          <View style={tailwind("bg-gray-200 rounded-full p-2")}>
            <Image
              source={require("../assets/images/history-icon.png")}
              style={tailwind("w-6 h-6")}
            />
          </View>
          <View style={tailwind("flex-1")}>
            <AppText style={tailwind("text-lg font-semibold px-8")}>
              History
            </AppText>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={tailwind("flex-row items-center mt-2")}>
          <View style={tailwind("bg-gray-200 rounded-full p-2")}>
            <Image
              source={require("../assets/images/personal-details.png")}
              style={tailwind("w-6 h-6")}
            />
          </View>
          <View style={tailwind("flex-1")}>
            <AppText style={tailwind("text-lg font-semibold px-8")}>
              Personal Details
            </AppText>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={tailwind("flex-row items-center mt-2")}>
          <View style={tailwind("bg-gray-200 rounded-full p-2")}>
            <Image
              source={require("../assets/images/location-icon.png")}
              style={tailwind("w-6 h-6")}
            />
          </View>
          <View style={tailwind("flex-1")}>
            <AppText style={tailwind("text-lg font-semibold px-8")}>
              Location
            </AppText>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={tailwind("flex-row items-center mt-2")}>
          <View style={tailwind("bg-gray-200 rounded-full p-2")}>
            <Image
              source={require("../assets/images/payment-method-icon.png")}
              style={tailwind("w-6 h-6")}
            />
          </View>
          <View style={tailwind("flex-1")}>
            <AppText style={tailwind("text-lg font-semibold px-8")}>
              Payment Method
            </AppText>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={tailwind("flex-row items-center mt-2")}>
          <View style={tailwind("bg-gray-200 rounded-full p-2")}>
            <Image
              source={require("../assets/images/settings-icon.png")}
              style={tailwind("w-6 h-6")}
            />
          </View>
          <View style={tailwind("flex-1")}>
            <AppText style={tailwind("text-lg font-semibold px-8")}>
              Settings
            </AppText>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={tailwind("flex-row items-center mt-2")}>
          <View style={tailwind("bg-gray-200 rounded-full p-2")}>
            <Image
              source={require("../assets/images/help-icon.png")}
              style={tailwind("w-6 h-6")}
            />
          </View>
          <View style={tailwind("flex-1")}>
            <AppText style={tailwind("text-lg font-semibold px-8")}>
              Help
            </AppText>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={tailwind("flex-row items-center mt-2")}
          onPress={handleLogout}
        >
          <View style={tailwind("bg-gray-200 rounded-full p-2")}>
            <Image
              source={require("../assets/images/logout-icon.png")}
              style={tailwind("w-6 h-6")}
            />
          </View>
          <View style={tailwind("flex-1")}>
            <AppText style={tailwind("text-lg font-semibold px-8")}>
              Logout
            </AppText>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileComponent;
