import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, ScrollView, SafeAreaView } from "react-native";
import { useTailwind } from "tailwind-rn";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import AppText from "./AppText";
import Ionicons from "@expo/vector-icons/build/Ionicons";
import DoctorCard from "./DoctorCard";
import Referrals from "./Referrals";
import { getAllDoctors } from "../lib/supabase";

interface Doctor {
  id: number;
  fullname: string;
  job_title: string;
  experience: number;
  rating: number;
  consultation_fee: number;
  job_description: string;
  avatar_url: string;
}

const ConsultScreen = () => {
  const tailwind = useTailwind();
  const navigation = useNavigation<NavigationProp<any>>();
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      const doctorsData = await getAllDoctors();
      setDoctors(doctorsData);
    };

    fetchDoctors();
  }, []);

  return (
    <SafeAreaView style={tailwind("flex-1")}>
      <ScrollView>
        <View style={tailwind("flex-1 justify-center items-center mt-10")}>
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
              Consult
            </AppText>
            <View style={tailwind("w-10")} />
          </View>
          <View style={tailwind("flex items-start justify-start w-full p-4")}>
            <AppText style={tailwind("font-semibold text-lg")}>
              Available Doctors
            </AppText>
          </View>
          <View style={tailwind("flex items-center justify-center w-full p-4")}>
            {doctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </View>
        </View>
        <View style={tailwind("mt-0 p-4 mb-16")}>
          <Referrals />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ConsultScreen;
