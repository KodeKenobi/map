import React, { useState, useEffect } from "react";
import { View, Image, TouchableOpacity, Text, ScrollView } from "react-native";
import { useTailwind } from "tailwind-rn";
import AppText from "./AppText";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "@react-navigation/native";
import { getImageUrl } from "../lib/supabase";

const DoctorProfileCard = ({ doctor }: { doctor: any }) => {
  const tailwind = useTailwind();
  const navigation = useNavigation<NavigationProp<any>>();

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
    <View style={tailwind("rounded-lg shadow p-4 w-full")}>
      <View style={tailwind("flex-row justify-between items-start ")}>
        <View style={tailwind("relative")}>
          <Image
            source={imageSource || require("../assets/images/doctor.png")}
            style={[
              tailwind("rounded-lg mb-3"),
              { width: 80, height: 80, backgroundColor: "#f0f0f0" },
            ]}
            resizeMode="cover"
          />
          <View
            style={tailwind(
              "absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full border border-white"
            )}
          />
        </View>
        <View style={tailwind("flex-1 ml-24")}>
          <View style={tailwind("flex-row items-center")}>
            <Text style={tailwind("text-xl font-bold text-center")}>
              <Text>{doctor.fullname}</Text>
            </Text>
          </View>
          <View style={tailwind("flex-row mt-2")}>
            <TouchableOpacity
              style={tailwind("rounded-full")}
              onPress={() => navigation.navigate("Message" as never)}
            >
              <Image
                source={require("../assets/images/messaging-icon.png")}
                style={tailwind("w-10 h-10")}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={tailwind("rounded-full ml-24")}
              onPress={() => navigation.navigate("CallScreen" as never)}
            >
              <Image
                source={require("../assets/images/call-icon.png")}
                style={tailwind("w-10 h-10")}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={tailwind("rounded-full ml-24")}
              onPress={() =>
                navigation.navigate("DoctorProfile", {
                  full_name: doctor.full_name,
                  job_title: doctor.job_title,
                  consultation_fee: doctor.consultation_fee,
                  job_description: doctor.job_description,
                  experience: doctor.experience,
                  rating: doctor.rating,
                } as never)
              }
            >
              <Image
                source={require("../assets/images/videocall-icon.png")}
                style={tailwind("w-10 h-10")}
              />
            </TouchableOpacity>
          </View>
          <Text style={tailwind("text-w3-green text-md mt-2 font-bold")}>
            <Text>{doctor.job_title}</Text>
          </Text>
          <View style={tailwind("flex-row justify-between mt-2")}>
            <Text
              style={tailwind("text-gray-500 text-md font-normal font-bold")}
            >
              <Text>Consultation Fee</Text>
            </Text>
            <Text
              style={tailwind("text-gray-500 text-md font-normal font-bold")}
            >
              <Text>R{doctor.consultation_fee.toLocaleString()}</Text>
            </Text>
          </View>

          <View style={tailwind("flex-row justify-start mt-2")}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {doctor.specializations?.map(
                (specialization: string, index: number) => (
                  <TouchableOpacity
                    key={index}
                    style={tailwind(
                      "bg-green-500 rounded-full px-4 py-1 mr-22"
                    )}
                  >
                    <Text style={tailwind("text-white text-md font-semibold")}>
                      {specialization.charAt(0).toUpperCase() +
                        specialization.slice(1)}
                    </Text>
                  </TouchableOpacity>
                )
              )}
            </ScrollView>
          </View>
        </View>
      </View>

      <View
        style={tailwind(
          "flex-row items-center mt-4 bg-gray-100 py-4 px-2 rounded-md w-full border border-gray-200 border-2"
        )}
      >
        <View style={tailwind("flex-row items-center px-2")}>
          <Image
            source={require("../assets/images/info-icon.png")}
            style={tailwind("w-12 h-12 rounded-md")}
            resizeMode="contain"
          />
        </View>

        <View style={tailwind("flex-1 ml-22")}>
          <Text style={tailwind("text-sm font-semibold")}>
            <Text>Referral</Text>
          </Text>
          <Text style={tailwind("text-gray-500 text-sm mt-1 ml-2")}>
            <Text>We do referrals to specialists accordingly</Text>
          </Text>
        </View>
      </View>
      {/* <View style={tailwind("flex-row justify-between items-center mt-4")}>
        <View style={tailwind("")}>
          <Text style={tailwind("text-md font-normal")}>
            <Text>{doctor.job_description}</Text>
          </Text>
        </View>
      </View> */}
    </View>
  );
};

export default DoctorProfileCard;
