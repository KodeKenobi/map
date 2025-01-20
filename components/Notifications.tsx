import React, {useState} from "react";
import { View, TouchableOpacity } from "react-native";
import { useTailwind } from "tailwind-rn";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import AppText from "./AppText";
import Ionicons from "@expo/vector-icons/build/Ionicons";

const Notifications = () => {
    const tailwind = useTailwind();
    // Sample notifications data
    const [notifications, setNotifications] = useState([
        { id: "1", text: "Your order has been shipped.", read: false },
        { id: "2", text: "Your payment was successful.", read: false },
        { id: "3", text: "You have a new message.", read: true },
    ]);
    const navigation = useNavigation<NavigationProp<any>>();
    const markAllAsRead = () => {
        setNotifications((prev) =>
            prev.map((item) => ({
                ...item,
                read: true,
            }))
        );
    };

    return (
        <View style={tailwind("flex-1 p-4")}>
            {/* Back Button */}
            <TouchableOpacity
                style={tailwind("absolute left-4 top-4")}
                onPress={() => navigation.goBack()}
            >
                <Ionicons name="arrow-back" size={24} color="#000" />
            </TouchableOpacity>

            {/* Page Title */}
            <AppText
                style={tailwind(
                    "text-2xl font-bold mb-2 mt-16 text-gray-800 text-center"
                )}
            >
                Notifications
            </AppText>
                {/* Header */}
                <View style={tailwind("flex-row justify-between items-center mb-4")}>
                    <AppText style={tailwind("text-lg font-bold text-black")}>New</AppText>
                    <TouchableOpacity onPress={() => setNotifications(notifications.map(n => ({ ...n, checked: true })))}>
                        <AppText style={tailwind("text-lg text-blue-500")}>Mark All</AppText>
                    </TouchableOpacity>
                </View>

                {/* Placeholder for Notifications */}
            <View style={tailwind("mt-8 items-center")}>
                <AppText style={tailwind("text-lg text-gray-600 text-center")}>
                    No new notifications at the moment.
                </AppText>
            </View>
        </View>
    );
};

export default Notifications;
