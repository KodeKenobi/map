import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  Animated,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setWealthCards, setLoading } from "../store/slices/wealthCardsSlice";
import { supabase, getAllEventsCards } from "../lib/supabase";
import { RootState } from "../store/store";
import { setProfile } from "../store/slices/profileSlice";
import {
  useNavigation,
  NavigationProp,
  useFocusEffect,
} from "@react-navigation/native";
import Greeting from "./Greeting";
import BottomNav from "./BottomNav";
import { useTailwind } from "tailwind-rn";
import HorizontalCardScroll from "./HorizontalCardScroll";
import LogoNavScroll from "./LogoNavScroll";
import WealthNavMenu from "./WealthNavMenu";
import EventsCardComponent from "./EventsCardComponent";
import WealthHorizontalCardScroll from "./WealthHorizontalCardScroll";
import EventsList from "./EventsList";

// Define the type for event cards
interface EventCard {
  id: number;
  title: string;
  subtitle: string;
  date: string;
  tagline: string;
  tag: string;
  description: string;
  image_url: string;
  meta: any;
}

const WealthHome = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const dispatch = useDispatch();
  const wealthCards = useSelector(
    (state: RootState) => state.wealthCards.cards
  );
  const loading = useSelector((state: RootState) => state.wealthCards.loading);
  const profile = useSelector((state: RootState) => state.profile);
  const tailwind = useTailwind();
  const [scale] = useState(new Animated.Value(1));
  const [eventCards, setEventCards] = useState<EventCard[]>([]);
  const [checkingOnboarding, setCheckingOnboarding] = useState<boolean>(true);

  const coachingCards = [
    {
      imageUrl: require("../assets/images/kwani-logo.png"),
      backgroundColor: "hsla(0, 0.00%, 100.00%, 0.16)",
    },
    {
      imageUrl: require("../assets/images/bee-ing-logo.png"),
      backgroundColor: "hsla(0, 0.00%, 100.00%, 0.16)",
    },
    {
      imageUrl: require("../assets/images/roar-logo.png"),
      backgroundColor: "hsla(0, 0.00%, 100.00%, 0.16)",
    },
  ];

  const cards = [
    {
      id: 1,
      imageUrl: require("../assets/images/wealth-home-card-1.jpg"),
      title: "Free Wellness Webinar: The Path to Cellular Health",
      cta: "Register Now >",
      subtitle: "Join our free webinar to learn about cellular health.",
      date: "Dec 15th - Join Now",
      registrationText: "Register Now >",
      backgroundColor: "rgba(252, 202, 102, 0.3)",
    },
    {
      id: 2,
      imageUrl: require("../assets/images/wealth-home-card-2.jpg"),
      title: "Career Coaching: From Entry Level to C-Suite and beyond",
      cta: "Explore Coaching >",
      subtitle: "Make an appointment today to advance your career.",
      date: "Make an appointment today",
      registrationText: "Explore Coaching >",
      backgroundColor: "rgba(252, 202, 102, 0.3)",
    },
    {
      id: 3,
      imageUrl: require("../assets/images/wealth-home-card-3.png"),
      title: "Free Wellness Webinar: The Path to Cellular Health",
      cta: "Register Now >",
      subtitle: "Join our free webinar to learn about cellular health.",
      date: "Dec 15th - Join Now",
      registrationText: "Register Now >",
      backgroundColor: "rgba(252, 202, 102, 0.3)",
    },
  ];

  // Reset loading state when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      setCheckingOnboarding(false);
      dispatch(setLoading(false));
    }, [dispatch])
  );

  useEffect(() => {
    const checkOnboarding = async () => {
      try {
        setCheckingOnboarding(true);
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user) {
          const { data: profileData } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", user.id)
            .single();

          if (profileData) {
            // Update Redux profile state if not already set
            if (!profile.firstName || !profile.lastName) {
              dispatch(
                setProfile({
                  firstName: profileData.first_name,
                  lastName: profileData.last_name,
                  avatarUrl: profileData.avatar_url,
                })
              );
            }

            if (!profileData.hascompletedwealthonboarding) {
              navigation.navigate("WealthWelcome");
              return;
            }
          }

          const allWealthCards = await supabase
            .from("wealth_cards")
            .select("*");
          if (allWealthCards.data) {
            dispatch(setWealthCards(allWealthCards.data));
          }

          // Fetch and log events cards
          const eventsCards = await getAllEventsCards();
          console.log("Events Cards:", eventsCards);

          dispatch(setLoading(false));
          setCheckingOnboarding(false);
        } else {
          dispatch(setLoading(false));
          setCheckingOnboarding(false);
          navigation.navigate("Login");
        }
      } catch (error) {
        console.error("Error:", error);
        dispatch(setLoading(false));
        setCheckingOnboarding(false);
        navigation.navigate("Login");
      }
    };

    checkOnboarding();
  }, [navigation, dispatch, profile.firstName, profile.lastName]);

  useEffect(() => {
    const fetchEventCards = async () => {
      const data = await getAllEventsCards();
      if (data) {
        setEventCards(data);
      }
    };

    fetchEventCards();
  }, []);

  if (loading || checkingOnboarding) {
    return (
      <View style={styles.loadingContainer}>
        <Animated.Image
          source={require("../assets/images/faviconBig.png")}
          style={[styles.faviconBig, { transform: [{ scale }] }]}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={tailwind("mt-10")}>
        <Greeting
          userName={profile.firstName ? `${profile.firstName}` : ""}
          notificationCount={8}
        />
      </View>
      <ScrollView contentContainerStyle={[styles.scrollContainer]}>
        <View style={tailwind("mt-0")}>
          <WealthNavMenu />
        </View>
        <View style={tailwind("mt-8 mb-8")}>
          <Text style={tailwind("text-lg font-bold")}>
            {" "}
            Discover Franchise Opportunities
          </Text>
        </View>
        <View style={[tailwind("mb-4")]}>
          <HorizontalCardScroll cards={cards} />
          {/* <EventsList /> */}
        </View>
        <View style={tailwind("mt-2 mb-8")}>
          <Text style={tailwind("text-lg font-bold")}>
            {" "}
            Our Brands at a Glance
          </Text>
        </View>
        <View style={tailwind("mt-0 mb-8")}>
          <LogoNavScroll cards={coachingCards} />
        </View>
      </ScrollView>
      <BottomNav navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 12,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  faviconBig: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
});

export default WealthHome;
