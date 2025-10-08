import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Animated,
  StyleSheet,
} from "react-native";
import { useTailwind } from "tailwind-rn";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import AppText from "./AppText";
import Ionicons from "@expo/vector-icons/build/Ionicons";
import DoctorCard from "./DoctorCard";
import Referrals from "./Referrals";
import { getAllDoctors } from "../lib/supabase";
import ConsultationsScreenCard from "./GPConsultationScreen";
import BodyTherapiesScreenCard from "./BodyTherapies";
import IVDripScreenCard from "./IVDrip";
import CoachingConsultationScreenCard from "./CoachingConsultation";
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
  const [loading, setLoading] = useState(true);
  const [scale] = useState(new Animated.Value(1));

  // Hardcoded doctor data as fallback
  const hardcodedDoctor: Doctor = {
    id: 1,
    fullname: "Dr. S Ndou",
    job_title: "General Practitioner",
    experience: 8,
    rating: 4.8,
    consultation_fee: 150,
    job_description:
      "Experienced general practitioner specializing in preventive care and wellness consultations.",
    avatar_url: "doctor.png",
  };

  useEffect(() => {
    const fetchDoctors = async () => {
      const doctorsData = await getAllDoctors();
      // Use hardcoded doctor if no doctors from database
      if (doctorsData && doctorsData.length > 0) {
        setDoctors(doctorsData);
      } else {
        setDoctors([hardcodedDoctor]);
      }
      setLoading(false);
    };

    fetchDoctors();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Animated.Image
          source={require("../assets/images/faviconBig.png")}
          style={[styles.faviconBig, { transform: [{ scale }] }]}
        />
      </View>
    );
  }

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
              Consultations
            </AppText>
            <View style={tailwind("w-10")} />
          </View>
          {/* <View style={tailwind("flex w-full p-4")}>
            {doctors.length > 0 && (
              <>
                <ConsultationsScreenCard consultation={doctors[0]} />
                <BodyTherapiesScreenCard consultation={doctors[0]} />
                <IVDripScreenCard consultation={doctors[0]} />
                <CoachingConsultationScreenCard consultation={doctors[0]} />
              </>
            )}
          </View> */}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    padding: 12,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  faviconBig: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
});
