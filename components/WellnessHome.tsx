import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  Animated,
  TouchableOpacity,
  Modal,
  GestureResponderEvent,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  setWellnessCards,
  setLoading,
} from "../store/slices/wellnessCardsSlice";
import { supabase } from "../lib/supabase";
import { RootState } from "../store/store";
import Greeting from "./Greeting";
import BottomNav from "./BottomNav";
import { useTailwind } from "tailwind-rn";
import SearchComponent from "./SearchComponent";
import ServicesNavMenu from "./ServicesNavMenu";
import HorizontalCardScroll from "./HorizontalCardScroll";

const WellnessHome = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const [firstName, setFirstName] = useState<string | null>(null);
  const dispatch = useDispatch();
  const wellnessCards = useSelector(
    (state: RootState) => state.wellnessCards.cards
  );
  const loading = useSelector(
    (state: RootState) => state.wellnessCards.loading
  );
  const tailwind = useTailwind();
  const [scale] = useState(new Animated.Value(1));
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [clickedPart, setClickedPart] = useState<string | null>(null);

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
            setFirstName(profile.firstName);
            if (!profile.hascompletedwellnessonboarding) {
              navigation.navigate("WellnessWelcome");
            }
          }

          const allWellnessCards = await supabase
            .from("wellness_cards")
            .select("*");
          if (allWellnessCards.data) {
            dispatch(setWellnessCards(allWellnessCards.data));
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
