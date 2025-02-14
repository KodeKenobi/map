import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  SafeAreaView,
  Text,
  Alert,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useTailwind } from "tailwind-rn";
import AppText from "./AppText";
import { supabase } from "@/lib/supabase";

import { Session } from "@supabase/supabase-js";
import ButtonComponent from "./ButtonComponent";
import Avatar from "./Avatar";
import Toast from "react-native-toast-message";
import { RouteProp } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { StackNavigationProp } from "@react-navigation/stack";

type UserUpdateProps = {
  route: RouteProp<any, "UserUpdate">;
  navigation: StackNavigationProp<any>;
};

export default function UserUpdate({ route, navigation }: UserUpdateProps) {
  const tailwind = useTailwind();
  const [loading, setLoading] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [phone, setPhone] = useState("");

  const { session } = route.params as { session: Session };

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);
        if (!session?.user) {
          return;
        }

        const { data, error } = await supabase
          .from("profiles")
          .select("*") // Select all fields to see what we're getting
          .eq("id", session.user.id)
          .single();

        if (error) {
          console.error("Error fetching profile:", error);
          return;
        }

        if (data) {
          setFirstName(data.first_name);
          setLastName(data.last_name);
          setPhone(data.phone);
          setAvatarUrl(data.avatar_url);
        }
      } catch (error) {
        console.error("Error in loadProfile:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []); // Remove session dependency since we get it from route.params

  async function updateProfile({
    first_name,
    last_name,
    phone,
    avatar_url,
  }: {
    first_name: string;
    last_name: string;
    phone: string;
    avatar_url: string;
  }) {
    try {
      setLoading(true);
      if (!session?.user) throw new Error("No user on the session!");

      const updates = {
        id: session?.user.id,
        first_name,
        last_name,
        phone,
        avatar_url,
        hascompletedprofileupdate: true,
        updated_at: new Date(),
      };

      const { error } = await supabase.from("profiles").upsert(updates);

      if (error) {
        throw error;
      }

      Toast.show({
        type: "success",
        text1: "Profile Updated Successfully",
        position: "bottom",
      });

      navigation.replace("Home", { animation: "slide" });
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <View style={tailwind("flex-1 justify-center items-center")}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={tailwind("flex-1")}>
      <ScrollView>
        <View style={tailwind("flex-1 justify-start items-center mt-14")}>
          <View
            style={tailwind("flex-row items-center justify-start w-full p-4")}
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
          </View>
          <View
            style={tailwind("flex-row items-center w-full p-4 justify-between")}
          >
            <View style={tailwind("w-10")} />
          </View>
        </View>
        <View style={tailwind("items-center mt-0 mb-4")}>
          <View className="flex-row items-center justify-center mt-2">
            <Avatar url={avatarUrl} size={120} onUpload={setAvatarUrl} />
          </View>
        </View>

        <View style={tailwind("mt-2 p-4")}>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={session?.user?.email}
            onChangeText={() => {}}
            editable={false}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter your first name"
            value={firstName}
            onChangeText={setFirstName}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter your last name"
            value={lastName}
            onChangeText={setLastName}
          />

          <TextInput
            style={styles.input}
            placeholder="Enter your phone number"
            value={phone}
            onChangeText={setPhone}
          />
        </View>
        <View style={tailwind("mt-2 p-4")}>
          <ButtonComponent
            title={loading ? "Loading ..." : "Update"}
            onPress={() =>
              updateProfile({
                first_name: firstName,
                last_name: lastName,
                phone: phone,
                avatar_url: avatarUrl,
              })
            }
            disabled={loading}
            color="#F9CF67"
            style={tailwind("mb-4")}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
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
    borderWidth: 2,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },

  label: {
    margin: 8,
  },
});
