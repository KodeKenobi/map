import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Modal,
  Alert,
  ScrollView,
  StyleSheet,
  TextStyle,
} from "react-native";
import { useTailwind } from "tailwind-rn";
import AppText from "./AppText";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { supabase } from "../lib/supabase";
import { getImageUrl } from "../lib/supabase";

// Define the type for the navigation parameters
type DoctorProfileParams = {
  fullname: string;
  job_title: string;
  consultation_fee: number;
  job_description: string;
  experience: number;
  rating: number;
  avatar_url: string;
  specializations?: string[];
};

interface Doctor {
  id: number;
  fullname: string;
  job_title: string;
  experience: number;
  rating: number;
  consultation_fee: number;
  job_description: string;
  avatar_url: string;
  specializations?: string[];
}

// This is the doctor card that will be used to display the doctor's information
const DoctorCard = ({ doctor }: { doctor: Doctor }) => {
  const tailwind = useTailwind();
  const navigation =
    useNavigation<NavigationProp<{ DoctorProfile: DoctorProfileParams }>>();
  const [modalVisible, setModalVisible] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    if (doctor.avatar_url) {
      const fullUrl = getImageUrl(doctor.avatar_url);
      console.log("Constructed Avatar URL:", fullUrl);
      setAvatarUrl(fullUrl);
    } else {
      console.log("No avatar URL provided for doctor.");
    }
  }, [doctor.avatar_url]);

  const imageSource = avatarUrl ? { uri: avatarUrl } : null;
  console.log("The image source is", imageSource);

  return (
    <View
      style={tailwind(
        "bg-white rounded-lg shadow p-4 w-full border border-gray-400 mb-8"
      )}
    >
      <View style={tailwind("flex-row justify-between items-start ")}>
        <View style={tailwind("relative")}>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            {imageSource ? (
              <Image
                source={imageSource}
                style={[
                  tailwind("rounded-lg mb-3"),
                  { width: 180, height: 180, backgroundColor: "#f0f0f0" },
                ]}
                resizeMode="cover"
              />
            ) : (
              <View
                style={{
                  width: 180,
                  height: 180,
                  backgroundColor: "transparent",
                  borderRadius: 100,
                }}
              />
            )}
          </TouchableOpacity>
          <View
            style={{
              position: "absolute",
              top: -2,
              right: -4,
              width: 24,
              height: 24,
              backgroundColor: "green",
              borderRadius: 12,
              borderColor: "white",
              borderWidth: 2,
            }}
          />
        </View>
        <View style={tailwind("flex-1 ml-24")}>
          <AppText style={tailwind("text-lg font-bold")}>
            {doctor.fullname}
          </AppText>
          <AppText style={tailwind("text-w3-green text-md mt-2")}>
            {doctor.job_title}
          </AppText>
          <View style={tailwind("flex-row justify-between mt-2")}>
            <AppText style={tailwind("text-gray-500 text-md font-semibold")}>
              {doctor.experience} years
            </AppText>
            <AppText
              style={StyleSheet.flatten([
                tailwind("text-yellow-500 text-md font-semibold") as TextStyle,
                { marginRight: 8 } as TextStyle,
              ])}
            >
              ⭐ {doctor.rating.toFixed(1)}
            </AppText>
          </View>
          {/* <View style={tailwind("flex-row justify-start mt-6")}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {doctor.specializations?.map((specialization, index) => (
                <TouchableOpacity
                  key={index}
                  style={tailwind("bg-green-500 rounded-full px-4 py-1 mr-22")}
                >
                  <AppText style={tailwind("text-white text-md font-semibold")}>
                    {specialization.charAt(0).toUpperCase() +
                      specialization.slice(1)}
                  </AppText>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View> */}
        </View>
      </View>
      <View
        style={{ flexDirection: "row", alignItems: "center", marginTop: 30 }}
      >
        <View style={{ flex: 1, height: 1, backgroundColor: "lightgray" }} />
      </View>

      <View style={tailwind("mt-4 flex-row justify-between items-center")}>
        <View>
          <AppText style={tailwind("text-gray-500 text-md")}>
            Consultation Fee
          </AppText>
          <AppText style={tailwind("text-xl font-bold")}>
            R {doctor.consultation_fee.toLocaleString()}
          </AppText>
        </View>
        <TouchableOpacity
          style={tailwind("bg-green-500 rounded-full px-8 py-2")}
          onPress={() => {
            navigation.navigate("DoctorProfile", {
              fullname: doctor.fullname,
              job_title: doctor.job_title,
              consultation_fee: doctor.consultation_fee,
              job_description: doctor.job_description,
              experience: doctor.experience,
              rating: doctor.rating,
              avatar_url: doctor.avatar_url,
              specializations: doctor.specializations,
            });
          }}
        >
          <AppText
            style={tailwind("text-white text-center text-md font-semibold")}
          >
            Book
          </AppText>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={tailwind(
            "flex-1 justify-center items-center bg-black bg-opacity-50"
          )}
          onPress={() => setModalVisible(false)}
        >
          <View style={tailwind("relative w-3/4 h-3/4")}>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={tailwind("absolute top-4 right-4 z-10")}
            ></TouchableOpacity>
            {avatarUrl ? (
              <Image
                source={{ uri: avatarUrl }}
                style={tailwind("w-full h-full rounded-md")}
                resizeMode="contain"
              />
            ) : (
              <View style={tailwind("w-full h-full bg-gray-300 rounded-md")} />
            )}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default DoctorCard;
