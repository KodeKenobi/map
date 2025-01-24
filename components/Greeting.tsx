import React, { useEffect, useState } from "react";
import { View, Image, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTailwind } from "tailwind-rn";
import AppText from "./AppText";
import { auth } from "@/app/(auth)/firebaseConfig";
import { getUserData } from "@/app/(auth)/auth";

const Greeting = ({
  notificationCount,
}: {
  userName: string;
  notificationCount: number;
}) => {
  const tailwind = useTailwind();
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      getUserData(user.uid).then((data) => {
        if (data) {
          setUserName(data.firstName);
        }
      });
    }
  }, []);

  const currentHour = new Date().getHours();
  let greetingMessage = "Good Morning";

  if (currentHour >= 5 && currentHour < 12) {
    greetingMessage = "Good Morning";
  } else if (currentHour >= 12 && currentHour < 17) {
    greetingMessage = "Good Afternoon";
  } else {
    greetingMessage = "Good Evening";
  }

  return (
    <View
      style={tailwind(
        "flex-row items-center justify-between p-4 bg-white mt-8"
      )}
    >
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
              padding: 6,
              backgroundColor: "white",
              borderRadius: 10,
            }}
          >
            <Image
              source={require("../assets/images/logo.png")}
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                borderColor: "rgba(153, 153, 153, 0.1)",
                borderWidth: 0.2,
              }}
              resizeMode="contain"
            />
          </View>
        </View>
      </View>

      {userName ? (
        <View style={tailwind("flex-1 pl-4")}>
          <AppText style={tailwind("text-lg font-bold text-black")}>
            {greetingMessage}, {userName}
          </AppText>
          <AppText style={tailwind("text-sm text-gray-500")}>
            Let's make today great
          </AppText>
        </View>
      ) : (
        <ActivityIndicator
          size="small"
          color="gray"
          style={tailwind("flex-1 pl-4")}
        />
      )}
      <View style={tailwind("relative")}>
        <Ionicons name="notifications-outline" size={26} color="black" />
        <View
          style={{
            position: "absolute",
            right: 0,
            top: -5,
            backgroundColor: "#228565",
            borderRadius: 10,
            paddingHorizontal: 6,
            paddingVertical: 2,
          }}
        >
          <AppText
            style={{
              color: "white",
              fontSize: 12,
              fontWeight: "bold",
            }}
            fontColor="white"
          >
            {notificationCount}
          </AppText>
        </View>
      </View>
    </View>
  );
};

export default Greeting;
