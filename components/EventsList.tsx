import React, { useEffect, useState } from "react";
import { View, FlatList, ActivityIndicator } from "react-native";
import EventsCardComponent from "./EventsCardComponent";

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
      renderItem={({ item }) => (
        <EventsCardComponent
          id={item.id}
          title={item.title.rendered}
          subtitle={item.slug} // Assuming slug is used as a subtitle
          date={item.date}
          tagline={item.excerpt.rendered} // Assuming excerpt is used as a tagline
          tag={item.type} // Assuming type is used as a tag
          description={item.content.rendered}
          image_url={item.yoast_head_json.og_image[0].url}
          meta={item.meta}
        />
      )}
    />
  );
};

export default EventsList;
