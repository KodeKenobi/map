import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Text,
  ActivityIndicator,
} from "react-native";
import { useTailwind } from "tailwind-rn";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import AppText from "./AppText";
import Ionicons from "@expo/vector-icons/build/Ionicons";
import { supabase } from "@/lib/supabase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GreetingAvatar from "./GreetingAvatar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { setProfile } from "../store/slices/profileSlice";

const ProfileComponent = () => {
  const tailwind = useTailwind();
  const navigation = useNavigation<NavigationProp<any>>();
  const dispatch = useDispatch();
  const profile = useSelector((state: RootState) => state.profile);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserProfile = async () => {
    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (user) {
        const cachedAvatarUrl = await AsyncStorage.getItem(`avatar-${user.id}`);
        if (cachedAvatarUrl) {
          // Use cached avatar but still fetch fresh profile data
          const { data, error } = await supabase
            .from("profiles")
            .select("first_name, last_name, avatar_url")
            .eq("id", user.id)
            .single();

          if (!error && data) {
            dispatch(
              setProfile({
                firstName: data.first_name,
                lastName: data.last_name,
                avatarUrl: cachedAvatarUrl, // Use cached avatar
              })
            );
          }
        } else {
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

            // Cache the avatar URL
            if (data.avatar_url) {
              await AsyncStorage.setItem(`avatar-${user.id}`, data.avatar_url);
            }
          }
        }
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!profile.firstName || !profile.lastName || !profile.avatarUrl) {
      fetchUserProfile();
    } else {
      setIsLoading(false);
    }
  }, [profile]);

  if (isLoading) {
    return (
      <View style={tailwind("flex-1 justify-center items-center")}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <SafeAreaView style={tailwind("flex-1")}>
      <ScrollView>
        <View style={tailwind("flex-1 justify-center items-center mt-14")}>
          <View
            style={tailwind("flex-row items-center w-full p-4 justify-between")}
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
            <AppText style={tailwind("text-xl font-bold text-center")}>
              <Text>Profile</Text>
            </AppText>
            <View style={tailwind("w-10")} />
          </View>
        </View>
        <View style={tailwind("items-center mt-6")}>
          <View className="flex-row items-center justify-center">
            <View
              style={{
                borderWidth: 4,
                borderColor: "#999",
                borderRadius: 160,
                overflow: "hidden",
              }}
            >
              <GreetingAvatar
                url={profile.avatarUrl}
                width={150}
                height={150}
              />
            </View>
          </View>

          <AppText style={tailwind("text-2xl font-bold mt-6 text-center")}>
            {profile.firstName || "User"} {profile.lastName || ""}
          </AppText>
        </View>

        <View style={tailwind("mt-8 items-start p-4")}>
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
            onPress={() => {
              navigation.navigate("UserUpdate");
            }}
          >
            <View style={tailwind("bg-gray-200 rounded-full p-2")}>
              <Image
                source={require("../assets/images/personal-details.png")}
                style={tailwind("w-6 h-6")}
              />
            </View>
            <View style={tailwind("flex-1")}>
              <AppText style={tailwind("text-lg font-semibold px-8")}>
                Update Profile
              </AppText>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={tailwind("flex-row items-center mt-2")}
            onPress={() => supabase.auth.signOut()}
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileComponent;
