import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  Animated,
  TouchableOpacity,
  Modal,
  GestureResponderEvent,
  ScrollView,
} from "react-native";
import {
  useNavigation,
  NavigationProp,
  useFocusEffect,
} from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  setWellnessCards,
  setLoading,
} from "../store/slices/wellnessCardsSlice";
import { supabase } from "../lib/supabase";
import { RootState } from "../store/store";
import { setProfile } from "../store/slices/profileSlice";
import Greeting from "./Greeting";
import BottomNav from "./BottomNav";
import { useTailwind } from "tailwind-rn";
import SearchComponent from "./SearchComponent";
import ServicesNavMenu from "./ServicesNavMenu";
import HorizontalCardScroll from "./HorizontalCardScroll";

const WellnessHome = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const dispatch = useDispatch();
  const wellnessCards = useSelector(
    (state: RootState) => state.wellnessCards.cards
  );
  const loading = useSelector(
    (state: RootState) => state.wellnessCards.loading
  );
  const profile = useSelector((state: RootState) => state.profile);
  const tailwind = useTailwind();
  const [scale] = useState(new Animated.Value(1));
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [clickedPart, setClickedPart] = useState<string | null>(null);
  const [checkingOnboarding, setCheckingOnboarding] = useState<boolean>(true);

  console.log("📍 CURRENT SCREEN: WellnessHome");

  // Reset loading state when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      dispatch(setLoading(false));
    }, [dispatch])
  );

  useEffect(() => {
    const checkOnboarding = async () => {
      try {
        console.log("🔍 WellnessHome: Starting onboarding check...");
        setCheckingOnboarding(true);
        const {
          data: { user },
        } = await supabase.auth.getUser();

        console.log("👤 WellnessHome: User found:", user?.email);

        if (user) {
          const { data: profileData } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", user.id)
            .single();

          console.log("📊 WellnessHome: Profile data:", {
            hasProfile: !!profileData,
            hasCompletedWellnessOnboarding:
              profileData?.hascompletedwellnessonboarding,
            firstName: profileData?.first_name,
            lastName: profileData?.last_name,
          });

          if (profileData) {
            // Update Redux profile state if not already set
            if (!profile.firstName || !profile.lastName) {
              console.log("🔄 WellnessHome: Updating Redux profile state");
              dispatch(
                setProfile({
                  firstName: profileData.first_name,
                  lastName: profileData.last_name,
                  avatarUrl: profileData.avatar_url,
                })
              );
            }

            if (!profileData.hascompletedwellnessonboarding) {
              console.log(
                "🚀 WellnessHome: Redirecting to WellnessWelcome - onboarding not completed"
              );
              navigation.navigate("WellnessWelcome");
              return;
            } else {
              console.log(
                "✅ WellnessHome: Onboarding completed, staying on WellnessHome"
              );
            }
          } else {
            console.log(
              "❌ WellnessHome: No profile data found, redirecting to WellnessWelcome"
            );
            navigation.navigate("WellnessWelcome");
            return;
          }

          console.log("📋 WellnessHome: Fetching wellness cards...");
          const allWellnessCards = await supabase
            .from("wellness_cards")
            .select("*");
          if (allWellnessCards.data) {
            console.log(
              "✅ WellnessHome: Loaded",
              allWellnessCards.data.length,
              "wellness cards"
            );
            dispatch(setWellnessCards(allWellnessCards.data));
          }
          dispatch(setLoading(false));
          setCheckingOnboarding(false);
          console.log(
            "🏁 WellnessHome: Onboarding check completed successfully"
          );
        } else {
          console.log("❌ WellnessHome: No user found, redirecting to Login");
          dispatch(setLoading(false));
          setCheckingOnboarding(false);
          navigation.navigate("Login");
        }
      } catch (error) {
        console.error("💥 WellnessHome: Error in checkOnboarding:", error);
        dispatch(setLoading(false));
        setCheckingOnboarding(false);
        navigation.navigate("Login");
      }
    };

    console.log(
      "🚀 WellnessHome: useEffect triggered, calling checkOnboarding"
    );
    checkOnboarding();
  }, [navigation, dispatch, profile.firstName, profile.lastName]);

  const handleHeadClick = (event: GestureResponderEvent) => {
    const { locationX, locationY } = event.nativeEvent;

    if (
      locationX >= 200 &&
      locationX <= 300 &&
      locationY >= 0 &&
      locationY <= 50
    ) {
      setClickedPart("head");
    } else if (
      locationX >= 200 &&
      locationX <= 300 &&
      locationY >= 50 &&
      locationY <= 100
    ) {
      setClickedPart("neck");
    } else if (
      locationX >= 200 &&
      locationX <= 300 &&
      locationY >= 100 &&
      locationY <= 175
    ) {
      setClickedPart("torso");
    } else if (
      locationX >= 200 &&
      locationX <= 300 &&
      locationY >= 175 &&
      locationY <= 250
    ) {
      setClickedPart("stomach");
    } else if (
      locationX >= 200 &&
      locationX <= 240 &&
      locationY >= 200 &&
      locationY <= 500
    ) {
      setClickedPart("leftLeg");
    } else if (
      locationX >= 250 &&
      locationX <= 350 &&
      locationY >= 250 &&
      locationY <= 500
    ) {
      setClickedPart("rightLeg");
    } else if (
      locationX >= 60 &&
      locationX <= 270 &&
      locationY >= 50 &&
      locationY <= 220
    ) {
      setClickedPart("leftArm");
    } else if (
      locationX >= 300 &&
      locationX <= 400 &&
      locationY >= 100 &&
      locationY <= 300
    ) {
      setClickedPart("leftArm");
    } else if (
      locationX >= 300 &&
      locationX <= 400 &&
      locationY >= 100 &&
      locationY <= 300
    ) {
      setClickedPart("rightArm");
    } else {
      setClickedPart("other");
    }

    setModalVisible(true);
  };

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
        <View>
          <SearchComponent />
        </View>

        <View style={tailwind("mt-2")}>
          <ServicesNavMenu />
        </View>

        <HorizontalCardScroll cards={wellnessCards} />

        <TouchableOpacity onPress={handleHeadClick} activeOpacity={1}>
          <View style={tailwind("mb-4 mt-8 flex items-center justify-center")}>
            <Image
              source={require("../assets/images/wellness-body.png")}
              style={{ width: 512, height: 512, resizeMode: "contain" }}
            />
          </View>
        </TouchableOpacity>
      </ScrollView>
      <BottomNav navigation={navigation} />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>
              {clickedPart === "head"
                ? "Information about the head"
                : clickedPart === "neck"
                  ? "Information about the neck"
                  : clickedPart === "leftArm"
                    ? "Information about the left arm"
                    : clickedPart === "rightArm"
                      ? "Information about the right arm"
                      : clickedPart === "stomach"
                        ? "Information about the stomach"
                        : clickedPart === "leftLeg"
                          ? "Information about the left leg"
                          : clickedPart === "rightLeg"
                            ? "Information about the right leg"
                            : clickedPart === "torso"
                              ? "Information about the torso"
                              : "Information about other parts"}
            </Text>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButton}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 20,
    width: "80%",
    alignItems: "center",
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#007bff",
    borderRadius: 5,
    color: "white",
  },
});

export default WellnessHome;
