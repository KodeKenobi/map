import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTailwind } from "tailwind-rn";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Skeleton } from "@rneui/themed";
import { LinearGradient } from "expo-linear-gradient";
import { supabase } from "@/lib/supabase";

import GreetingAvatar from "./GreetingAvatar";

const Greeting = ({
  notificationCount,
}: {
  userName: string;
  notificationCount: number;
}) => {
  const tailwind = useTailwind();
  const [userName, setUserName] = useState<string | null>(null);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    const errorCondition = false;
    if (errorCondition) {
      setHasError(true);
    }
  }, []);

  if (hasError) {
    return null;
  }

  const fetchUserProfile = async () => {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (user) {
      const { data, error } = await supabase
        .from("profiles")
        .select("first_name, avatar_url")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("Error fetching user profile:", error);
      } else {
        setUserName(data.first_name);
        setAvatarUrl(data.avatar_url);
      }
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  useEffect(() => {
    console.log("Avatar URL in Greeting:", avatarUrl);
  }, [avatarUrl]);

  const currentHour = new Date().getHours();
  let greetingMessage = "Good Morning";
  const navigation = useNavigation<NavigationProp<any>>();

  if (currentHour >= 5 && currentHour < 12) {
    greetingMessage = "Good Morning";
  } else if (currentHour >= 12 && currentHour < 17) {
    greetingMessage = "Good Afternoon";
  } else {
    greetingMessage = "Good Evening";
  }

  return (
    <View
      style={tailwind("flex-row items-center justify-between p-4 bg-white")}
    >
      {isLoading ? (
        <View style={tailwind("flex-row items-center flex-1")}>
          <Skeleton
            LinearGradientComponent={LinearGradient}
            animation="wave"
            circle
            width={40}
            height={40}
            style={tailwind("mr-24")}
          />
          <Skeleton
            LinearGradientComponent={LinearGradient}
            animation="wave"
            width={280}
            height={40}
          />
        </View>
      ) : (
        <View style={tailwind("flex-row items-center justify-center")}>
          <View
            style={{
              borderWidth: 2,
              borderColor: "#999",
              borderRadius: 160,
              overflow: "hidden",
            }}
          >
            <View
              style={{
                padding: 3,
                backgroundColor: "white",
                borderRadius: 10,
              }}
            >
              <GreetingAvatar url={avatarUrl} width={60} height={60} />
            </View>
          </View>
        </View>
      )}

      {userName ? (
        <View style={tailwind("flex-1 pl-4")}>
          <Text style={tailwind("text-lg font-bold text-gray-600")}>
            {greetingMessage}, {userName}
          </Text>
          <Text style={tailwind("text-md text-gray-600")}>
            Let's make today great
          </Text>
        </View>
      ) : null}
      <TouchableOpacity
        style={tailwind("relative")}
        onPress={() => navigation.navigate("Notifications")}
      >
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
          <Text style={{ color: "white" }}>{notificationCount}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Greeting;
