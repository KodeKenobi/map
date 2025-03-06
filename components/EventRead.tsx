import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { RouteProp } from "@react-navigation/native";

// Define the type for the route parameters
type EventReadRouteParams = {
  title: string;
  subtitle: string;
  date: string;
  description: string;
  image_url: string;
  tagline: string;
  tag: string;
};

interface EventReadProps {
  route: {
    params: EventReadRouteParams;
  };
}

const EventRead: React.FC<EventReadProps> = ({ route }) => {
  const { title, subtitle, date, description, image_url, tagline, tag } =
    route.params;

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{
          uri: `https://yfnseftemcxacgncqcck.supabase.co/storage/v1/object/public/images/${image_url}`,
        }}
        style={styles.image}
      />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
      <Text style={styles.date}>{date}</Text>
      <Text style={styles.subtitle}>{tagline}</Text>
      <Text style={styles.subtitle}>{tag}</Text>
      <Text style={styles.description}>{description}</Text>
    </ScrollView>
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
