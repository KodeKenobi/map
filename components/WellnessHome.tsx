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
import { auth } from "../app/(auth)/firebaseConfig";
import { getUserData } from "../app/(auth)/auth";
import Greeting from "./Greeting";
import BottomNav from "./BottomNav";
import { useTailwind } from "tailwind-rn";
import SearchComponent from "./SearchComponent";
import ServicesNavMenu from "./ServicesNavMenu";

const WellnessHome = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const [firstName, setFirstName] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [scale] = useState(new Animated.Value(1));
  const tailwind = useTailwind();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [clickedPart, setClickedPart] = useState<string | null>(null);

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      getUserData(user.uid).then((data) => {
        if (data) {
          setFirstName(data.firstName);
          if (!data.hasCompletedWellnessOnboarding) {
            navigation.navigate("WellnessWelcome");
          }
        }
        setLoading(false);
      });
    } else {
      setLoading(false);
      navigation.navigate("Login");
    }
  }, [navigation]);

  const handleHeadClick = (event: GestureResponderEvent) => {
    const { locationX, locationY } = event.nativeEvent;

    console.log(`Clicked coordinates: X: ${locationX}, Y: ${locationY}`);

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
