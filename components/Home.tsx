import React, { useEffect, useState } from "react";
import { View, StyleSheet, LogBox, Text, Animated, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { useNavigation, NavigationProp } from "@react-navigation/native";
import Greeting from "./Greeting";
import RecommendationsCard from "./RecommendationsCard";
import BottomNav from "./BottomNav";
import { useTailwind } from "tailwind-rn";
import HorizontalCardScroll from "./HorizontalCardScroll";
import HorizontalQuickAccessCardScroll from "./HorizontalQuickAccessCardScroll";
import AppText from "./AppText";
import { supabase } from "@/lib/supabase";
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
  const [loading, setLoading] = useState<boolean>(true);
  const tailwind = useTailwind();
  const [scale] = useState(new Animated.Value(1));
  const [homeCards, setHomeCards] = useState<any[]>([]);

  async function getImageUrl(path: string) {
    try {
      console.log("Input image path:", path);
      const {
        data: { publicUrl },
      } = supabase.storage.from("images").getPublicUrl(path);

      console.log("Generated public URL:", publicUrl);
      // Make sure the URL is in the correct format for React Native Image component
      return { uri: publicUrl }; // Wrap in uri object for Image component
    } catch (error) {
      console.error("Error getting image public URL:", error);
      return null;
    }
  }

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

          if (!profile.hascompletedhomeonboarding) {
            navigation.navigate("Welcome");
            return;
          }
          if (!profile.hascompletedprofileupdate) {
            navigation.navigate("UpdateProfile");
            return;
          }

          const allProfiles = await getAllProfiles();
          console.log("All Profiles:", allProfiles);

          const allHomeCards = await getAllHomeCards();
          console.log("All Home Cards:", allHomeCards);
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
            console.log("Final transformed cards:", transformedCards);
            setHomeCards(transformedCards);
          }
          setLoading(false);
        } else {
          setLoading(false);
          navigation.navigate("Login");
        }
      } catch (error) {
        console.error("Error:", error);
        setLoading(false);
        navigation.navigate("Login");
      }
    };

    getProfile();
  }, [navigation]);

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
        />{" "}
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
            />
          </ScrollView>
        </View>
        <View style={tailwind("mt-4 mb-2 p-2")}>
          <AppText style={tailwind("text-lg font-bold")}>
            {" "}
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
  loadingBarsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
  },
  loadingBar: {
    height: 4,
    width: "30%",
    backgroundColor: "#ccc",
    borderRadius: 2,
    overflow: "hidden",
  },
  loadingBarActive: {
    backgroundColor: "#000",
  },
  faviconBig: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
});

export default Home;
