import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  Animated,
  ScrollView,
} from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import Greeting from "./Greeting";
import BottomNav from "./BottomNav";
import { useTailwind } from "tailwind-rn";
import WisdomNavMenu from "./WisdomNavMenu";
import HorizontalCardScroll from "./HorizontalCardScroll";
import BottomCTASection from "./BottomCTASection";
import { supabase } from "@/lib/supabase";
import { useDispatch, useSelector } from "react-redux";
import { setWisdomCards, setLoading } from "../store/slices/wisdomCardsSlice";
import { RootState } from "../store/store";

const WisdomHome = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const [firstName, setFirstName] = useState<string | null>(null);
  const dispatch = useDispatch();
  const wisdomCards = useSelector(
    (state: RootState) => state.wisdomCards.cards
  );
  const loading = useSelector((state: RootState) => state.wisdomCards.loading);
  const tailwind = useTailwind();
  const [scale] = useState(new Animated.Value(1));

  // Existing card data
  const cards = [
    {
      id: 1,
      imageUrl: require("../assets/images/vitamin-drip.png"),
      title: "Free Wellness Webinar: The Path to Cellular Health",
      cta: "Register Now >",
      subtitle: "Join us for insights",
      date: "Dec 15th, 7 PM - Join Now",
      registrationText: "Register Now >",
      backgroundColor: "rgba(115, 69, 182, 0.16)",
    },
    {
      id: 2,
      imageUrl: require("../assets/images/coaching.png"),
      title: "Career Coaching: From Entry Level to C-Suite and beyond",
      cta: "Explore Coaching >",
      subtitle: "Make an appointment today",
      date: "Make an appointment today",
      registrationText: "Explore Coaching >",
      backgroundColor: "rgba(115, 69, 182, 0.16)",
    },
    // Add other cards as needed...
  ];

  useEffect(() => {
    const getProfile = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user) {
          const { data: profile } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", user.id)
            .single();

          if (profile) {
            setFirstName(profile.first_name);
            if (!profile.hascompletedwisdomonboarding) {
              navigation.navigate("WisdomWelcome");
            }
          }

          // Simulate fetching wisdom cards from the database
          dispatch(setWisdomCards(cards));
          dispatch(setLoading(false));
        } else {
          dispatch(setLoading(false));
          navigation.navigate("Login");
        }
      } catch (error) {
        console.error("Error:", error);
        dispatch(setLoading(false));
        navigation.navigate("Login");
      }
    };

    getProfile();
  }, [navigation, dispatch]);

  if (loading) {
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
          userName={firstName ? `${firstName}` : ""}
          notificationCount={8}
        />
      </View>
      <ScrollView contentContainerStyle={[styles.scrollContainer]}>
        <View>
          <WisdomNavMenu />
        </View>
        <View style={tailwind("mt-4 mb-2 p-4")}>
          <Text style={tailwind("text-lg font-bold")}> What's Happening</Text>
        </View>
        <View style={tailwind("p-4")}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <HorizontalCardScroll cards={wisdomCards} />
          </ScrollView>
        </View>

        <View style={tailwind("mb-4 flex items-center justify-center p-4")}>
          <BottomCTASection />
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
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  faviconBig: {
    width: 100,
    height: 100,
  },
});

export default WisdomHome;
