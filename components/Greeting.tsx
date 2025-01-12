import React from "react";
import { View, Text, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTailwind } from "tailwind-rn";

const Greeting = ({
  userName,
  notificationCount,
}: {
  userName: string;
  notificationCount: number;
}) => {
  const tailwind = useTailwind();

  return (
    <View
      style={tailwind("flex-row items-center justify-between p-4 bg-white")}
    >
      {/* Profile Image */}
      <Image
        source={require("../assets/images/logo.png")}
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          borderWidth: 2,
          borderColor: "gray",
        }}
      />
      {/* Greeting Text */}
      <View style={tailwind("flex-1 pl-4")}>
        <Text style={tailwind("text-lg font-bold text-black")}>
          Good Morning, {userName || "User"}
        </Text>
        <Text style={tailwind("text-sm text-gray-500")}>
          Let's make today great
        </Text>
      </View>
      {/* Notification Icon */}
      <View style={tailwind("relative")}>
        <Ionicons name="notifications-outline" size={26} color="black" />
        <View
          style={{
            position: "absolute",
            right: 0,
            top: -5,
            backgroundColor: "red",
            borderRadius: 10,
            paddingHorizontal: 6,
            paddingVertical: 2,
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 12,
              fontWeight: "bold",
            }}
          >
            {notificationCount}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Greeting;
