import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  SafeAreaView,
  Text,
  Alert,
  TextInput,
  StyleSheet,
} from "react-native";
import { useTailwind } from "tailwind-rn";
import AppText from "./AppText";
import { supabase } from "@/lib/supabase";

import { Session } from "@supabase/supabase-js";
import ButtonComponent from "./ButtonComponent";
import Avatar from "./Avatar";
import Toast from "react-native-toast-message";
import CustomAlert from "./CustomAlert";

interface UpdateProfileProps {
  navigation: any;
  session: Session;
}

export default function UpdateProfile({
  navigation,
  session,
}: UpdateProfileProps) {
  const tailwind = useTailwind();
  const [loading, setLoading] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [phone, setPhone] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertConfig, setAlertConfig] = useState({
    type: "success" as "success" | "warning" | "error" | "info",
    title: "",
    message: "",
    onAction: undefined as (() => void) | undefined,
    actionText: undefined as string | undefined,
  });

  const showAlert = (
    type: "success" | "warning" | "error" | "info",
    title: string,
    message: string,
    onAction?: () => void,
    actionText?: string
  ) => {
    setAlertConfig({ type, title, message, onAction, actionText });
    setAlertVisible(true);
  };

  useEffect(() => {
    if (session) {
      checkProfileUpdate();
    }
  }, [session]);

  async function checkProfileUpdate() {
    try {
      if (!session?.user) throw new Error("No user on the session!");

      const { data, error } = await supabase
        .from("profiles")
        .select("hascompletedprofileupdate, hascompletedhomeonboarding")
        .eq("id", session.user.id)
        .single();

      if (error) throw error;

      if (data?.hascompletedprofileupdate) {
        // Profile is completed, check home onboarding status
        if (data?.hascompletedhomeonboarding) {
          navigation.replace("Home", { animation: "slide" });
        } else {
          navigation.replace("Welcome", { animation: "slide" }); // Go to Welcome first
        }
      } else {
        getProfile(); // If profile not completed, get profile data to display form
      }
    } catch (error) {
      console.error("💥 Error in checkProfileUpdate:", error);
      if (error instanceof Error) {
        showAlert("error", "Profile Check Failed", error.message);
      } else {
        showAlert(
          "error",
          "Profile Check Failed",
          "An unexpected error occurred. Please try again."
        );
      }
    }
  }

  async function getProfile() {
    try {
      setLoading(true);
      if (!session?.user) throw new Error("No user on the session!");

      const { data, error, status } = await supabase
        .from("profiles")
        .select(`first_name, last_name, email, phone, avatar_url`)
        .eq("id", session?.user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setFirstName(data.first_name);
        setLastName(data.last_name);
        setPhone(data.phone);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      console.error("💥 Error in getProfile:", error);
      if (error instanceof Error) {
        showAlert("error", "Profile Load Failed", error.message);
      } else {
        showAlert(
          "error",
          "Profile Load Failed",
          "An unexpected error occurred. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  }

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
      console.log("🚀 Starting profile update...");
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

      console.log("💾 Profile updates to save:", updates);

      const { error } = await supabase.from("profiles").upsert(updates);

      if (error) {
        console.error("❌ Profile update error:", error);
        throw error;
      }

      console.log("✅ Profile updated successfully");

      Toast.show({
        type: "success",
        text1: "Profile Updated Successfully",
        position: "bottom",
      });

      console.log("🧭 Navigating to Home...");
      navigation.navigate("Home");
      console.log("✅ Navigation completed");
    } catch (error) {
      console.error("💥 Error in updateProfile:", error);
      if (error instanceof Error) {
        showAlert("error", "Update Failed", error.message);
      } else {
        showAlert(
          "error",
          "Update Failed",
          "An unexpected error occurred. Please try again."
        );
      }
    } finally {
      console.log("🏁 Setting loading to false");
      setLoading(false);
    }
  }

  if (loading) {
    return null;
  }

  return (
    <SafeAreaView style={tailwind("flex-1")}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={tailwind("justify-center items-center mt-14")}>
          <View
            style={tailwind("flex-row items-center w-full p-4 justify-between")}
          >
            <View style={tailwind("rounded-full p-2")}></View>
            <AppText style={tailwind("text-xl font-bold text-center")}>
              <Text>Update Your Profile</Text>
            </AppText>
            <View style={tailwind("w-10")} />
          </View>
        </View>
        <View style={tailwind("items-center mt-2 mb-4")}>
          <View className="flex-row items-center justify-center">
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

          <ButtonComponent
            title="Sign Out"
            onPress={() => supabase.auth.signOut()}
            color="#F9CF67"
          />
        </View>
      </ScrollView>
      <CustomAlert
        visible={alertVisible}
        type={alertConfig.type}
        title={alertConfig.title}
        message={alertConfig.message}
        onClose={() => setAlertVisible(false)}
        onAction={alertConfig.onAction}
        actionText={alertConfig.actionText}
      />
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
