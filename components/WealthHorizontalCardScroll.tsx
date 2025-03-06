import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { getAllEventsCards } from "../lib/supabase";
import { RootStackParamList } from "../types";
import { useTailwind } from "tailwind-rn";

interface EventCard {
  id: number;
  title: string;
  subtitle: string;
  date: string;
  description: string;
  image_url: string;
  tagline: string;
}

const WealthHorizontalCardScroll = () => {
  const [eventCards, setEventCards] = useState<EventCard[]>([]);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const tailwind = useTailwind();

  useEffect(() => {
    const fetchEventCards = async () => {
      const data = await getAllEventsCards();
      if (data) {
        setEventCards(data);
      }
    };

    fetchEventCards();
  }, []);

  const renderEventCard = ({ item }: { item: EventCard }) => (
    <View style={tailwind("border-2 border-gray-200 rounded-lg w-full")}>
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate("EventRead", item)}
      >
        <Image
          source={{
            uri: `https://yfnseftemcxacgncqcck.supabase.co/storage/v1/object/public/images/${item.image_url}`,
          }}
          style={styles.image}
        />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.subtitle}>{item.subtitle}</Text>
        <Text style={styles.tagline}>{item.tagline}</Text>
        <Text style={styles.date}>
          {new Date(item.date).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </Text>
        {/* Read More Text with ellipsis */}
        <Text style={styles.readMoreText}>Read More...</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <FlatList
      horizontal
      data={eventCards}
      renderItem={renderEventCard}
      keyExtractor={(item) => item.id.toString()}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 0, width: "100%" }}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 0,
    padding: 0,
    backgroundColor: "#fff",
    borderRadius: 8,
    width: "100%",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    marginLeft: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    fontWeight: "bold",
    marginLeft: 10,
    marginTop: 5,
  },
  tagline: {
    fontSize: 14,
    color: "#666",
    fontWeight: "bold",
    marginLeft: 10,
    marginTop: 5,
    marginBottom: 10,
  },
  date: {
    fontSize: 12,
    color: "#999",
    marginTop: 5,
    marginLeft: 10,
    marginBottom: 20,
  },
  readMoreText: {
    fontSize: 16,
    color: "#000",
    fontWeight: "bold",
    marginLeft: 10,
    marginBottom: 10,
  },
});

export default WealthHorizontalCardScroll;
