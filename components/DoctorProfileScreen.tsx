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
        "502c41d225d426462278cfab95cbb392", // Template ID
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
    <SafeAreaView style={tailwind("flex-1")}>
      <ScrollView>
        <View style={tailwind("flex-1 justify-center items-center mt-10")}>
          <View
            style={tailwind("flex-row items-center w-full p-4 justify-between")}
          >
            <BackButton navigation={navigation as NavigationProp<any>} />
            <View style={tailwind("flex-row items-center")}>
              <Text style={tailwind("text-xl font-bold text-center")}>
                Doctor Details
              </Text>
            </View>

            <View style={tailwind("w-10")} />
          </View>
        </View>
        <View style={tailwind("flex-1 justify-center items-center p-2")}>
          <DoctorProfileCard doctor={route.params} />
        </View>
        <View style={tailwind("flex-row justify-between items-center p-4")}>
          <Text style={tailwind("text-lg font-bold text-gray-800")}>
            <Text>Working Hours</Text>
          </Text>
          <TouchableOpacity onPress={showTimePicker}>
            <Text style={tailwind("text-lg underline")}>
              Book Your Time &gt;
            </Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isTimePickerVisible}
            mode="time"
            onConfirm={handleTimeConfirm}
            onCancel={hideTimePicker}
          />
        </View>
        <View style={tailwind("p-4 mb-4")}>
          <View style={tailwind("flex-row justify-between")}>
            {selectedTime ? (
              <Text
                key={selectedTime.toDateString()}
                style={tailwind(
                  "bg-w3-green-grad-1 p-2 rounded-md w-30 font-semibold text-center"
                )}
              >
                <Text>
                  {selectedTime.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Text>
              </Text>
            ) : (
              <>
                <Text
                  key="10am"
                  style={tailwind(
                    "bg-gray-400 p-2 rounded-md w-30 font-semibold text-center"
                  )}
                >
                  <Text>10:00 AM</Text>
                </Text>
                <Text
                  key="11am"
                  style={tailwind(
                    "bg-w3-green-grad-1 p-2 rounded-md w-30 font-semibold text-center"
                  )}
                >
                  <Text>11:00 AM</Text>
                </Text>
                <Text
                  key="12pm"
                  style={tailwind(
                    "bg-gray-400 p-2 rounded-md w-30 font-semibold text-center"
                  )}
                >
                  <Text>12:00 PM</Text>
                </Text>
              </>
            )}
          </View>
        </View>

        <View style={tailwind("flex-row justify-between items-center p-4")}>
          <Text style={tailwind("text-lg font-bold text-gray-800")}>
            <Text>Date</Text>
          </Text>
          <TouchableOpacity onPress={showDatePicker}>
            <Text style={tailwind("text-lg underline")}>
              Book Your Date &gt;
            </Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
        </View>
        <View style={tailwind("p-4")}>
          <View style={tailwind("flex-row justify-between")}>
            {selectedDate ? (
              <Text
                key={selectedDate.toDateString()}
                style={tailwind(
                  "bg-w3-green-grad-1 p-2 rounded-md w-30 font-semibold text-center"
                )}
              >
                <Text>{selectedDate.toLocaleDateString()}</Text>
              </Text>
            ) : (
              Array.from({ length: 3 }).map((_, index) => {
                const date = new Date();
                date.setDate(date.getDate() + index);
                const options: Intl.DateTimeFormatOptions = {
                  weekday: "short" as "short",
                  day: "numeric",
                };
                const weekday = date
                  .toLocaleDateString("en-US", { weekday: "short" })
                  .toUpperCase();
                const day = date.getDate();
                const formattedDate = `${weekday} ${day}`;

                return (
                  <Text
                    key={date.toDateString()}
                    style={tailwind(
                      index === 2
                        ? "bg-w3-green-grad-1 p-2 rounded-md w-30 font-semibold text-center"
                        : "bg-gray-400 p-2 rounded-md w-30 font-semibold text-center"
                    )}
                  >
                    <Text>{formattedDate}</Text>
                  </Text>
                );
              })
            )}
          </View>
        </View>

        <View style={tailwind("p-4 rounded mb-6 ")}>
          {selectedDate && selectedTime ? (
            <>
              <Text style={tailwind("text-lg mb-2 font-bold")}>
                Confirm your Appointment
              </Text>
              <Text style={tailwind("mt-2 font-semibold text-md")}>
                Date:{" "}
                {selectedDate
                  ? selectedDate.toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "Not selected"}
              </Text>
              <Text style={tailwind("mt-2 font-semibold text-md")}>
                Time:{" "}
                {selectedTime
                  ? selectedTime.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })
                  : "Not selected"}
              </Text>
              <View style={tailwind("flex-col justify-between mt-4")}>
                {/* <ButtonComponent
                  title="Confirm"
                  size="small"
                  onPress={() => {
                    // Handle confirmation logic here
                    console.warn(
                      "Appointment confirmed for:",
                      selectedDate,
                      selectedTime
                    );
                  }}
                  style={tailwind("p-2 rounded")}
                  color="#228564"
                  textColor="#fff"
                /> */}
                {/* <ButtonComponent
                  title="Cancel"
                  size="small"
                  onPress={() => {
                    // Reset selected date and time
                    setSelectedDate(null);
                    setSelectedTime(null);
                    console.warn("Appointment canceled");
                  }}
                  style={tailwind("p-2 rounded bg-red-500 mt-2")}
                  color="#ff0000"
                  textColor="#fff"
                /> */}
              </View>
            </>
          ) : null}
        </View>

        {selectedDate && selectedTime ? (
          <View style={tailwind("p-4 rounded mb-6")}>
            <ButtonComponent
              title="Book an Appointment"
              onPress={handleBookAppointment}
              style={tailwind("mt-2 p-4 rounded mb-2")}
              color="#228564"
              textColor="#fff"
            />
            <ButtonComponent
              title="Cancel"
              onPress={() => {
                // Reset selected date and time
                setSelectedDate(null);
                setSelectedTime(null);
                console.warn("Appointment canceled");
              }}
              style={tailwind("p-2 rounded bg-red-500 mt-2")}
              color="#ff0000"
              textColor="#fff"
            />
          </View>
        ) : null}
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
