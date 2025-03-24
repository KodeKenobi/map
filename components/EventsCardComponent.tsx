import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextStyle,
  Linking,
} from "react-native";
import AppText from "./AppText";
import { useTailwind } from "tailwind-rn";
import Icon from "react-native-vector-icons/AntDesign";
import { useNavigation, NavigationProp } from "@react-navigation/native";

interface EventsCardProps {
  id: number;
  title: string;
  subtitle: string;
  date: string;
  tagline: string;
  tag: string;
  description: string;
  image_url: string;
  meta: any; // Assuming meta is of type any
}

interface Ticket {
  id: number;
  title: string;
  price: string;
  available: number;
  currencySymbol: string;
}

// Update the navigation type
type RootStackParamList = {
  EventRead: {
    id: number;
    title: string;
    subtitle: string;
    date: string;
    tagline: string;
    tag: string;
    description: string;
    image_url: string;
  };
  // add other screens as needed
};

const EventsCardComponent: React.FC<EventsCardProps> = ({
  image_url,
  title,
  subtitle,
  date,
  description,
  tag,
  tagline,
  id,
  meta,
}) => {
  const tailwind = useTailwind();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const tickets: Ticket[] = JSON.parse(meta._tribe_tickets_list || "[]"); // Parse the tickets list

  // Update the handleCardPress function
  const handleCardPress = () => {
    const eventData = {
      id,
      title,
      subtitle,
      date,
      image_url,
      description,
      tag,
      tagline,
    };
    navigation.navigate("EventRead", eventData);
  };

  // Function to open the calendar app with event details
  const addToCalendar = () => {
    const startDate = new Date(date).toISOString();
    const endDate = new Date(
      new Date(date).getTime() + 60 * 60 * 1000
    ).toISOString(); // Assuming 1-hour event
    const url = `https://calendar.google.com/calendar/r/eventedit?text=${encodeURIComponent(title)}&dates=${startDate}/${endDate}&details=${encodeURIComponent(description)}&location=${encodeURIComponent(subtitle)}`;
    Linking.openURL(url).catch((err) =>
      console.error("An error occurred", err)
    );
  };

  // Determine if the event is a whole-day event
  const isWholeDayEvent = (date: string) => {
    // Logic to determine if the event is a whole-day event
    // This could be based on specific time values or a flag in the meta data
    return date.includes("00:00:00") && date.includes("23:59:59");
  };

  return (
    <TouchableOpacity onPress={handleCardPress}>
      <View
        style={[
          tailwind("rounded-lg mr-4 border-2"),
          {
            backgroundColor: "#FCFCFC",
            width: "100%",
            borderColor: "#E5E7EB",
            borderWidth: 4,
          },
        ]}
      >
        <Image
          source={
            typeof image_url === "string" ? { uri: image_url } : image_url
          }
          style={[
            tailwind("w-full h-40 rounded-lg mb-3"),
            { backgroundColor: "transparent" },
          ]}
          resizeMode="cover"
        />
        <View style={tailwind("p-2")}>
          <AppText
            style={
              StyleSheet.flatten([
                tailwind("text-md font-bold"),
                {
                  height: 44, // Fixed height for 2 lines
                  lineHeight: 22, // Consistent line height
                  marginBottom: 0,
                },
              ]) as TextStyle
            }
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {title}
          </AppText>
          {/* Render the event date and time */}
          <AppText style={tailwind("text-md text-gray-600 mb-2")}>
            {isWholeDayEvent(date)
              ? "All Day"
              : `${new Date(date).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })} @ ${new Date(date).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}`}
          </AppText>
          {/* Render ticket information */}
          {tickets.map((ticket: Ticket) => (
            <AppText key={ticket.id} style={tailwind("text-md mt-2 mb-4")}>
              {ticket.title}: R{ticket.price} (Available: {ticket.available})
            </AppText>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default EventsCardComponent;
