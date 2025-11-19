import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
  TextStyle,
  SafeAreaView,
} from "react-native";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import AppText from "./AppText";
import { useTailwind } from "tailwind-rn";
import BackButton from "./BackButton";

// Define the type for the route parameters
type EventReadRouteParams = {
  id: number;
  title: string;
  subtitle: string;
  date: string;
  image_url: string;
  tagline: string;
  tag: string;
  description: string;
  meta?: any; // Make meta optional
};

// Define the props for the component, including navigation
interface EventReadProps {
  navigation: NavigationProp<any>; // Add navigation prop
  route: {
    params: EventReadRouteParams;
  };
}

const EventRead: React.FC<EventReadProps> = ({ navigation, route }) => {
  useEffect(() => {
    console.log("Navigated to EventRead"); // Log when navigating to EventRead
    console.log("Event details:", route.params); // Log event details for debugging
  }, [route.params]); // Add route.params as a dependency

  const {
    id,
    title,
    subtitle,
    date,
    image_url,
    tagline,
    tag,
    description,
    meta = {}, // Default to an empty object if meta is undefined
  } = route.params;
  const tailwind = useTailwind();

  // Determine accent color based on subtitle or tag
  const getAccentColor = () => {
    // Wellness (QUEENPOWER) - Green
    if (subtitle?.includes("QUEENPOWER") || tag?.includes("Wellness")) {
      return "#228565"; // Wellness green
    }
    // Wisdom (QUEENCRICLE) - Gold
    if (subtitle?.includes("QUEENCRICLE") || tag?.includes("Wisdom")) {
      return "#FFD700"; // Gold
    }
    // Wealth (QUEENPRENEUR) - Purple
    if (subtitle?.includes("QUEENPRENEUR") || tag?.includes("Wealth")) {
      return "#7345B6"; // Wealth purple
    }
    // Default to purple
    return "#7345B6";
  };

  const accentColor = getAccentColor();

  // Parse the tickets list from meta
  const tickets = JSON.parse(meta._tribe_tickets_list || "[]");

  // Function to open the calendar app with event details
  const addToCalendar = () => {
    const startDate = new Date(date).toISOString().replace(/-|:|\.\d+/g, ""); // Format to YYYYMMDDTHHMMSSZ
    const endDate = new Date(new Date(date).getTime() + 60 * 60 * 1000)
      .toISOString()
      .replace(/-|:|\.\d+/g, ""); // Format to YYYYMMDDTHHMMSSZ

    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${startDate}/${endDate}&details=${encodeURIComponent(description)}&location=${encodeURIComponent(subtitle)}`;

    Linking.openURL(url).catch((err) =>
      console.error("An error occurred", err)
    );
  };

  // Determine if the event is a whole-day event
  const isWholeDayEvent = (date: string) => {
    return date.includes("00:00:00") && date.includes("23:59:59");
  };

  return (
    <SafeAreaView style={tailwind("flex-1 bg-white")}>
      <ScrollView>
        <View style={tailwind("flex-1 justify-center items-center mt-14")}>
          <View
            style={tailwind("flex-row items-center w-full p-4 justify-between")}
          >
            <BackButton navigation={navigation} />
            <Text style={tailwind("text-xl font-bold text-center")}>Event</Text>
            <View style={tailwind("w-10")} />
          </View>
        </View>
        <View style={tailwind("p-4")}>
          <Image
            source={{
              uri: image_url,
            }}
            style={styles.image}
          />
          <View
            style={[
              tailwind("flex-row items-start justify-between mb-4"),
              { width: "100%" },
            ]}
          >
            <View style={{ flex: 1, marginRight: 12 }}>
              <AppText style={tailwind("text-lg font-bold")}>{title}</AppText>
              {subtitle && (
                <AppText style={tailwind("text-md text-gray-600 mt-2")}>
                  {subtitle}
                </AppText>
              )}
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: accentColor,
                paddingHorizontal: 16,
                paddingVertical: 10,
                borderRadius: 8,
                alignSelf: "flex-start",
                minWidth: 100,
              }}
              onPress={() => {
                // Navigate to booking or appointment screen
                navigation.navigate("Consult");
              }}
            >
              <Text
                style={{
                  color: "#FFFFFF",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Book Now
              </Text>
            </TouchableOpacity>
          </View>
          <AppText style={tailwind("text-md text-gray-600 mb-2 mt-4")}>
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
          {tickets.map((ticket: any) => (
            <AppText key={ticket.id} style={tailwind("text-md mt-2")}>
              {ticket.title}: R{ticket.price} (Available: {ticket.available})
            </AppText>
          ))}
          <TouchableOpacity
            onPress={addToCalendar}
            style={tailwind("mt-4 bg-w3-gold-1 rounded-lg shadow-lg p-3")}
          >
            <Text
              style={tailwind("text-white text-lg font-semibold text-center")}
            >
              Add to Calendar
            </Text>
          </TouchableOpacity>
          {/* <Text style={styles.subtitle}>{subtitle}</Text>
          <Text style={styles.subtitle}>{tagline}</Text>
          <Text style={styles.subtitle}>{tag}</Text>
          <Text style={styles.description}>{description}</Text> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: "#666",
    marginBottom: 8,
  },
  date: {
    fontSize: 14,
    color: "#999",
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
});

export default EventRead;
