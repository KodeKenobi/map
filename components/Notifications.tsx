import React, { useState } from "react";
import { View, TouchableOpacity, ScrollView, SafeAreaView } from "react-native";
import { useTailwind } from "tailwind-rn";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import AppText from "./AppText";
import Ionicons from "@expo/vector-icons/build/Ionicons";

const Notifications = () => {
  const tailwind = useTailwind();
  const navigation = useNavigation<NavigationProp<any>>();

  const [notifications, setNotifications] = useState([
    {
      id: "1",
      text: "Your order has been shipped.",
      read: false,
      timestamp: new Date(),
    },
    {
      id: "2",
      text: "Your payment was successful.",
      read: false,
      timestamp: new Date(new Date().getTime() - 600000),
    },
    {
      id: "3",
      text: "You have a new message.",
      read: true,
      timestamp: new Date(new Date().getTime() - 7200000),
    },
    {
      id: "4",
      text: "Update your profile to get better recommendations.",
      read: false,
      timestamp: new Date(new Date().getTime() - 86400000),
    },
    {
      id: "5",
      text: "Your subscription is about to expire.",
      read: false,
      timestamp: new Date(new Date().getTime() - 18000000),
    },
    {
      id: "6",
      text: "You have a new follower.",
      read: true,
      timestamp: new Date(new Date().getTime() - 86400000 * 2),
    },
    {
      id: "7",
      text: "Reminder: Meeting in 30 minutes.",
      read: false,
      timestamp: new Date(new Date().getTime() - 1200000),
    },
  ]);

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((item) => ({
        ...item,
        read: true,
      }))
    );
  };

  const formatDate = (timestamp: Date) => {
    return timestamp.toLocaleString("default", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const getTimePassed = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) {
      return `${minutes} min${minutes > 1 ? "s" : ""}`;
    } else if (hours < 24) {
      return `${hours} hr${hours > 1 ? "s" : ""}`;
    } else {
      return `${days} day${days > 1 ? "s" : ""}`;
    }
  };

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
              Notifications
            </AppText>
            <View style={tailwind("w-10")} />
          </View>
        </View>

        {/* Header */}
        <View style={tailwind("flex-row justify-between items-center p-4")}>
          <AppText style={tailwind("text-lg font-bold text-black")}>
            New
          </AppText>
          <TouchableOpacity onPress={markAllAsRead}>
            <AppText style={tailwind("text-lg")}>Mark All</AppText>
          </TouchableOpacity>
        </View>

        {/* Notifications List */}
        <ScrollView style={tailwind("flex-1 p-4")}>
          {notifications.map((notification) => (
            <View
              key={notification.id}
              style={tailwind(
                `flex-row items-center p-4 mb-6 rounded-lg h-20 ${
                  notification.read ? "bg-gray-200" : "bg-w3-purple-opacity"
                }`
              )}
            >
              {/* Bell Icon */}
              <Ionicons
                name="notifications-outline"
                size={24}
                style={tailwind("mr-4")}
              />

              {/* Notification Content */}
              <View style={tailwind("flex-1 items-center")}>
                <AppText
                  style={tailwind(
                    "text-lg font-bold text-gray-700 text-center"
                  )}
                >
                  {formatDate(notification.timestamp)}
                </AppText>
                <AppText
                  style={tailwind(
                    `truncate text-sm ${
                      notification.read ? "text-black" : "text-white"
                    } text-center`
                  )}
                >
                  {notification.text}
                </AppText>
              </View>

              {/* Time Passed */}
              <AppText style={tailwind("text-right text-gray-500 ml-4")}>
                {getTimePassed(notification.timestamp)}
              </AppText>
            </View>
          ))}
        </ScrollView>

        {/* See All Button */}
        <TouchableOpacity
          style={tailwind("mt-4 mb-8")}
          onPress={() => navigation.navigate("AllNotifications")}
        >
          <AppText
            style={tailwind("text-center text-lg font-bold text-blue-500")}
          >
            See All
          </AppText>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Notifications;
