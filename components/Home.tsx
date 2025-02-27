import React, { useEffect, useState } from "react";
import { View, StyleSheet, Animated, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setHomeCards, setLoading } from "../store/slices/homeCardsSlice";
import { supabase } from "../lib/supabase";
import { RootState } from "../store/store";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import Greeting from "./Greeting";
import RecommendationsCard from "./RecommendationsCard";
import BottomNav from "./BottomNav";
import { useTailwind } from "tailwind-rn";
import HorizontalCardScroll from "./HorizontalCardScroll";
import HorizontalQuickAccessCardScroll from "./HorizontalQuickAccessCardScroll";
import AppText from "./AppText";
import { getAllProfiles, getAllHomeCards } from "@/lib/supabase";

const quickAccessCards = [
  {
    iconUrl: require("../assets/images/heart-bit-icon-white.png"),
    title: "Explore Wellness Services",
    backgroundColor: "rgba(74, 244, 170, 0.16)",
    iconBackgroundColor: "rgba(34, 133, 101, 1)",
  },
  {
    iconUrl: require("../assets/images/light-bulb-white.png"),
    title: "Discover Coaching and Mindfulness",
    backgroundColor: "rgba(115, 69, 182, 0.16)",
    iconBackgroundColor: "rgba(115, 69, 182, 1)",
  },
];

const Home = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const [firstName, setFirstName] = useState<string | null>(null);
  const dispatch = useDispatch();
  const homeCards = useSelector((state: RootState) => state.homeCards.cards);
  const loading = useSelector((state: RootState) => state.homeCards.loading);
  const tailwind = useTailwind();
  const [scale] = useState(new Animated.Value(1));

  async function getImageUrl(path: string): Promise<string> {
    try {
      const {
        data: { publicUrl },
      } = supabase.storage.from("images").getPublicUrl(path);
      return publicUrl || "";
    } catch (error) {
      console.error("Error getting image public URL:", error);
      return "";
    }
  }

  useEffect(() => {
    const getProfile = async () => {
      dispatch(setLoading(true));
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

          if (!profile.hascompletedhomeonboarding) {
            navigation.navigate("Welcome");
            return;
          }
          if (!profile.hascompletedprofileupdate) {
            navigation.navigate("UpdateProfile");
            return;
          }

          const allProfiles = await getAllProfiles();
          const allHomeCards = await getAllHomeCards();
          if (allHomeCards) {
            const transformedCards = await Promise.all(
              allHomeCards.map(async (card) => ({
                id: card.id,
                imageUrl: await getImageUrl(card.image_url),
                title: card.title,
                subtitle: card.subtitle,
                cta: card.cta,
                backgroundColor:
                  card.tag === "wellness"
                    ? "rgba(118, 184, 162, 0.14)"
                    : card.tag === "wisdom"
                    ? "rgba(115, 69, 182, 0.16)"
                    : "rgba(249, 207, 103, 0.5)",
                textColor:
                  card.tag === "wellness"
                    ? "rgba(32, 112, 53, 1)"
                    : card.tag === "wisdom"
                    ? "rgba(115, 69, 182, 1)"
                    : "rgba(187, 132, 0, 1)",
                description: card.description,
                tag: card.tag,
              }))
            );
            dispatch(setHomeCards(transformedCards));
          }
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

  useEffect(() => {
    const pulsate = () => {
      scale.setValue(1);
      Animated.timing(scale, {
        toValue: 1.1,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        Animated.timing(scale, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start(pulsate);
      });
    };

    pulsate();
  }, [scale]);

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
        <View style={tailwind("p-2")}>
          <HorizontalCardScroll cards={homeCards} />
        </View>
        <View style={tailwind("mt-0 mb-2 p-2")}>
          <AppText style={tailwind("text-lg font-bold")}>Quick Access</AppText>
        </View>
        <View style={tailwind("p-2")}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <HorizontalQuickAccessCardScroll
              quickAccessCards={quickAccessCards}
              navigation={navigation}
            />
          </ScrollView>
        </View>
        <View style={tailwind("mt-4 mb-2 p-2")}>
          <AppText style={tailwind("text-lg font-bold")}>
            Personalised Recommendations
          </AppText>
        </View>
        <View style={tailwind("p-2")}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <RecommendationsCard
              iconUrl={require("../assets/images/wellness-seminar.png")}
              title="IV Drip for Boosting Immunity     >"
              description="Top pick"
              backgroundColor="rgba(249, 207, 103, 0.5)"
              iconBackgroundColor="transparent"
            />
          </ScrollView>
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

export default Home;
