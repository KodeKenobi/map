import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Modal,
  Alert,
} from "react-native";
import { useTailwind } from "tailwind-rn";
import {
  NavigationProp,
  useNavigation,
  RouteProp,
} from "@react-navigation/native";
import BackButton from "./BackButton";
import DoctorProfileCard from "./DoctorProfileCard";
import ButtonComponent from "./ButtonComponent";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Ionicons from "@expo/vector-icons/build/Ionicons";
import * as MailComposer from "expo-mail-composer";
import { Resend } from "resend";
import {
  sendEmail,
  createCampaign,
  getAddressBookIdByName,
  addEmailToAddressBook,
} from "@/lib/sendpulse";
import { supabase } from "@/lib/supabase";

import { Session } from "@supabase/supabase-js";

// Step 1: Define the type for the navigation parameters
type DoctorProfileParams = {
  fullname: string;
  job_title: string;
  consultation_fee: number;
  job_description: string;
  experience: number;
  rating: number;
  userEmail: string;
};

// Step 2: Define the props type for the component
type Props = {
  route: RouteProp<{ params: DoctorProfileParams }, "params">;
};

const DoctorProfileScreen: React.FC<Props> = ({ route }) => {
  const tailwind = useTailwind();
  const navigation = useNavigation();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
    };

    fetchSession();
  }, []);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    console.warn("A date has been picked: ", date);
    setSelectedDate(date);
    hideDatePicker();
  };

  const handleTimeConfirm = (time: Date) => {
    console.warn("A time has been picked: ", time);
    setSelectedTime(time);
    hideTimePicker();
  };

  const handleBookAppointment = async () => {
    setModalVisible(true);

    const senderEmail = "ignatius.mutizwa@procoders.co.za";
    const recipientEmail = session?.user?.email;
    const recipientName = session?.user?.user_metadata?.full_name;

    console.log("Sender Email:", senderEmail);
    console.log("Recipient Email:", recipientEmail);

    if (!recipientEmail) {
      console.error("Recipient email is undefined");
      Alert.alert("Error", "User email is not available.");
      return;
    }

    try {
      // Get address book ID
      const addressBookId = await getAddressBookIdByName("womb_vitality");
      if (!addressBookId) {
        console.error("Address book not found");
        return;
      }

      // Log the email being added to the address book
      console.log("Adding email to address book:", recipientEmail);

      // Add email to address book
      await addEmailToAddressBook(recipientEmail, addressBookId, recipientName);

      // Create a campaign
      await createCampaign(
        "Womb Vitality & Healing Course",
        "1fc86a0d21092f0d8feed29a9f16608e", // Template ID
        "125082" // List ID
      );

      Alert.alert("Success", "Appointment booked and email sent.");
    } catch (error) {
      console.error("Error during booking process:", error);
      Alert.alert("Error", "Failed to send email.");
    }
  };

  async function handleBookClick() {
    const result = await MailComposer.composeAsync({
      recipients: ["kodekenobi@gmail.com"],
      subject: "Booking Appointment",
      body:
        `Hi:\n\n` +
        `I would like to book an appointment with you on:\n\n` +
        `Date: ${selectedDate?.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}\n` +
        `Time: ${selectedTime?.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })}\n\n` +
        `Thank you! Kind Regards,\n\n` +
        `${route.params.fullname}`,
    });
    alert(result.status);
  }

  return (
    <SafeAreaView style={tailwind("flex-1 bg-white")}>
      <ScrollView>
        {/* Header */}
        <View
          style={tailwind(
            "flex-row items-center w-full p-4 justify-between mt-10"
          )}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={tailwind("text-xl font-bold text-center")}>
            {route.params.fullname}
          </Text>
          <View style={tailwind("w-6")} />
        </View>

        {/* Doctor Profile Card */}
        <View style={tailwind("p-4")}>
          <DoctorProfileCard doctor={route.params} />
        </View>

        {/* Details Section */}
        <View style={tailwind("px-4")}>
          <Text style={tailwind("px-4 text-lg font-bold text-gray-800 mb-2")}>
            Details
          </Text>
          <Text style={tailwind("px-4 py-2 text-gray-600 text-sm leading-8")}>
            Worem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
            vulputate libero et velit interdum, ac aliquet odio mattis. Class
            aptent taciti sociosqu ad litora torquent per conubia nostra, per
            inceptos himenaeos.
            {"\n\n"}
            Curabitur tempus urna at turpis condimentum lobortis. Ut commodo
            efficitur neque. Ut diam quam, semper iaculis condimentum ac,
            vestibulum eu nisl.
          </Text>
        </View>

        {/* Working Hours Section */}
        <View style={tailwind("px-6 py-8")}>
          <View style={tailwind("flex-row justify-between items-center")}>
            <Text style={tailwind("py-2 px-2 text-lg font-bold text-gray-800")}>
              Working Hours
            </Text>
            <TouchableOpacity onPress={showTimePicker}>
              <Text style={tailwind("text-gray-500 text-sm")}>
                See All &gt;
              </Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isTimePickerVisible}
              mode="time"
              onConfirm={handleTimeConfirm}
              onCancel={hideTimePicker}
            />
          </View>
          <View style={tailwind("px-2 flex-row justify-start mt-2")}>
            {selectedTime ? (
              <TouchableOpacity
                style={tailwind("bg-w3-green-grad-1 px-4 py-2 rounded-lg mr-2")}
              >
                <Text style={tailwind("text-white font-semibold")}>
                  {selectedTime.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </Text>
              </TouchableOpacity>
            ) : (
              <>
                <TouchableOpacity
                  style={tailwind("bg-gray-200 px-4 py-2 rounded-lg mr-22")}
                >
                  <Text style={tailwind("text-gray-700 font-semibold")}>
                    10.00 AM
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={tailwind(
                    "bg-w3-green-grad-1 px-4 py-2 rounded-lg mr-22"
                  )}
                >
                  <Text style={tailwind("text-white font-semibold")}>
                    11.00 AM
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={tailwind("bg-gray-200 px-4 py-2 rounded-lg mr-22")}
                >
                  <Text style={tailwind("text-gray-700 font-semibold")}>
                    12.00 PM
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>

        {/* Date Section */}
        <View style={tailwind("px-4 py-2")}>
          <View
            style={tailwind("px-4 py-2 flex-row justify-between items-center")}
          >
            <Text style={tailwind("text-lg font-bold text-gray-800")}>
              Date
            </Text>
            <TouchableOpacity onPress={showDatePicker}>
              <Text style={tailwind("text-gray-500 text-sm")}>
                See All &gt;
              </Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
          </View>
          <View style={tailwind("px-4 flex-row justify-start mt-2")}>
            {selectedDate ? (
              <TouchableOpacity
                style={tailwind("bg-w3-green-grad-1 rounded-lg mr-22")}
              >
                <Text style={tailwind("text-white font-semibold")}>
                  {selectedDate.toLocaleDateString("en-US", {
                    weekday: "short",
                    day: "numeric",
                  })}
                </Text>
              </TouchableOpacity>
            ) : (
              <>
                <TouchableOpacity
                  style={tailwind(
                    "bg-w3-green-grad-1 px-4 py-2 rounded-lg mr-22"
                  )}
                >
                  <Text style={tailwind("text-white font-semibold")}>
                    Sun 4
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={tailwind("bg-gray-200 px-4 py-2 rounded-lg mr-22")}
                >
                  <Text style={tailwind("text-gray-700 font-semibold")}>
                    Mon 5
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={tailwind("bg-gray-200 px-4 py-2 rounded-lg mr-2")}
                >
                  <Text style={tailwind("text-gray-700 font-semibold")}>
                    Tue 6
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>

        {/* Book Appointment Button */}
        <View style={tailwind("p-4")}>
          <ButtonComponent
            title="Book an Appointment"
            onPress={() => navigation.navigate("PaymentScreen" as never)}
            style={tailwind("w-full py-4 rounded-lg")}
            color="#228564"
            textColor="#fff"
          />
        </View>
      </ScrollView>

      {/* Modal for Confirmation */}
      <Modal
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View
          style={tailwind(
            "flex-1 justify-center items-center bg-black bg-opacity-50"
          )}
        >
          <View style={tailwind("bg-white p-6 rounded-lg")}>
            <Text style={tailwind("text-lg font-bold mb-4")}>
              Appointment Booked
            </Text>
            <Text style={tailwind("mb-4")}>
              Please check your inbox for the confirmation email.{"\n\n"}(Your
              email could be under Promotions or Spam, you may need to move it
              to your Inbox)
            </Text>
            <ButtonComponent
              title="Close"
              onPress={() => setModalVisible(false)}
              style={tailwind("p-2 rounded bg-green-500")}
              color="#228564"
              textColor="#fff"
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default DoctorProfileScreen;
