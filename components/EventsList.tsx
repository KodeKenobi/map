import React, { useEffect, useState } from "react";
import { View, FlatList, ActivityIndicator } from "react-native";
import EventsCardComponent from "./EventsCardComponent";
import { useTailwind } from "tailwind-rn";
import { decode } from "he";

// Define the interface for the event data
interface Event {
  id: number;
  date: string;
  slug: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  type: string;
  content: { rendered: string };
  yoast_head_json: { og_image: { url: string }[] };
  meta: any;
}

const EventsList: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const tailwind = useTailwind();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          "https://test.mapw3.co.za/wp-json/wp/v2/tribe_events/"
        );
        const data: Event[] = await response.json();
        console.log(data); // Log the API response to check the time data
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <FlatList
      data={events}
      keyExtractor={(item) => item.id.toString()}
      style={tailwind("")}
      contentContainerStyle={tailwind("space-y-4")}
      renderItem={({ item }) => (
        <View style={tailwind("mb-4")}>
          <EventsCardComponent
            id={item.id}
            title={decode(item.title.rendered)}
            subtitle={item.slug} // Assuming slug is used as a subtitle
            date={item.date}
            tagline={decode(item.excerpt.rendered)} // Use decode from he
            tag={item.type} // Assuming type is used as a tag
            description={decode(item.content.rendered)} // Use decode from he
            image_url={item.yoast_head_json.og_image[0].url}
            meta={item.meta}
          />
        </View>
      )}
    />
  );
};

export default EventsList;
