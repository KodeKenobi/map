import React, { useEffect, useState, useCallback } from "react";
import { View, StyleSheet, Animated, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setWealthCards, setLoading } from "../store/slices/wealthCardsSlice";
import { supabase } from "../lib/supabase";
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
import WideHomeCard from "./WideHomeCard";

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
  const [checkingOnboarding, setCheckingOnboarding] = useState<boolean>(true);

  console.log("📍 CURRENT SCREEN: WealthHome");

  // Reset loading state when screen comes into focus
  useFocusEffect(
    useCallback(() => {
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
        <View style={tailwind("p-4")}>
          <WideHomeCard
            id={3}
            imageUrl={require("../assets/images/queenpreneur.jpg")}
            title="Map Wealth"
            subtitle="QUEENPRENEUR"
            description="This one's all about supporting women-led businesses in the wellness ecosystem. They're celebrating women-owned and managed businesses, and they've even got awards and recognition programs in place. It's all about building an ecosystem of support for women who are changing the game in wellness. These services seem to be all about empowering women to take control of their lives, build meaningful connections, and thrive in their personal and professional journeys. She builds. She grows. She changes the game. to build an ecosystem of support for women-led businesses that serve the well-being of their market. Focus: Celebrating women-owned and managed businesses in the wellness ecosystem. This includes products and services related to: Wellness Ecosystem Categories (entries Open annually in April 2026, Awards to be held annually in Augst 2026) Tourism Wellness: Focuses on travel and leisure activities promoting relaxation, rejuvenation, and overall well-being. Holistic Wellness: Encompasses physical, emotional, mental, and spiritual well-being, often incorporating alternative therapies. Corporate Wellness: Aims to improve employees' health, productivity, and job satisfaction through workplace initiatives. Digital Wellness: Explores the impact of technology on mental and physical health, promoting healthy digital habits. Community Wellness: Focuses on building healthy communities through social connections, support networks, and collective well-being. Education Wellness: Integrates wellness principles into educational settings, promoting students' overall well-being and academic success. Lifestyle Wellness: Encompasses various aspects of daily life, such as nutrition, physical activity, stress management, and self-care. Environmental Wellness: Focuses on the interconnectedness of human well-being and the natural environment. Financial Wellness: Aims to promote financial stability, security, and well-being. Social Wellness: Emphasizes building and maintaining healthy relationships, social connections, and community engagement. Spiritual Wellness: Explores an individual's values, purpose, and meaning in life, often incorporating mindfulness and meditation practices."
            cta="Read More"
            backgroundColor="rgba(115, 69, 182, 0.16)"
          />
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
    backgroundColor: "#fff",
  },
  faviconBig: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
});

export default WealthHome;
