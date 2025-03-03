import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTailwind } from "tailwind-rn";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { setProfile } from "@/store/slices/profileSlice";
import { RootState } from "../store/store";
import { supabase } from "@/lib/supabase";

import GreetingAvatar from "./GreetingAvatar";

const Greeting = ({
  notificationCount,
}: {
  userName: string;
  notificationCount: number;
}) => {
  const tailwind = useTailwind();
  const dispatch = useDispatch();
  const profile = useSelector((state: RootState) => state.profile);
  const navigation = useNavigation<NavigationProp<any>>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!profile.firstName) {
      const fetchUserProfile = async () => {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (user) {
          const { data, error } = await supabase
            .from("profiles")
            .select("first_name, last_name, avatar_url")
            .eq("id", user.id)
            .single();

          if (error) {
            console.error("Error fetching user profile:", error);
          } else {
            dispatch(
              setProfile({
                firstName: data.first_name,
                lastName: data.last_name,
                avatarUrl: data.avatar_url,
              })
            );
          }
        }
      };

      fetchUserProfile();
      setLoading(false);
    }
  }, [dispatch, profile.firstName]);

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
      style={tailwind("flex-row items-center justify-between p-4 bg-white")}
    >
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
            <GreetingAvatar url={profile.avatarUrl} width={60} height={60} />
          </View>
        </View>
      </View>

      {profile.firstName ? (
        <View style={tailwind("flex-1 pl-4")}>
          <Text style={tailwind("text-lg font-bold text-gray-600")}>
            {greetingMessage}, {profile.firstName}
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
