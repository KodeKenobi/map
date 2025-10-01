import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Modal,
  Animated,
  Text,
} from "react-native";
import { useTailwind } from "tailwind-rn";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { getImageUrl } from "../lib/supabase";
import { WebView } from "react-native-webview";
import Icon from "react-native-vector-icons/Ionicons";
import { TextStyle } from "react-native";
import * as Font from "expo-font";

interface BodyTherapiesScreen {
  id: number;
  fullname: string;
  job_title: string;
  experience: number;
  rating: number;
  consultation_fee: number;
  job_description: string;
  avatar_url: string;
  specializations?: string[];
}

// This is the doctor card that will be used to display the doctor's information
const BodyTherapiesScreenCard = ({
  consultation,
}: {
  consultation: BodyTherapiesScreen;
}) => {
  const tailwind = useTailwind();
  const [modalVisible, setModalVisible] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [webViewVisible, setWebViewVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [scale] = useState(new Animated.Value(1));
  const webViewRef = useRef(null);

  useEffect(() => {
    if (consultation && consultation.avatar_url) {
      const fullUrl = getImageUrl(consultation.avatar_url);
      setAvatarUrl(fullUrl);
    }
  }, [consultation?.avatar_url]);

  useEffect(() => {
    async function loadFont() {
      await Font.loadAsync({
        kindAvenue: require("../assets/fonts/kindAvenue.ttf"),
      });
    }
    loadFont();
  }, []);

  const imageSource = avatarUrl ? { uri: avatarUrl } : null;

  return (
    <View style={tailwind("bg-white rounded-lg shadow-lg p-4 mb-4")}>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Image
          source={require("../assets/images/body-therapy.jpg")}
          style={[tailwind("w-full rounded-lg"), { height: 200 }]}
          resizeMode="cover"
        />
      </TouchableOpacity>
      <View style={tailwind("mt-6")}>
        <Text style={[tailwind("text-xl font-bold mb-2")]}>Body Therapies</Text>
        <Text style={tailwind("text-gray-600 text-md")}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
          tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
        </Text>
        <View style={tailwind("flex-row justify-between items-center mt-4")}>
          <Text style={tailwind("text-lg font-bold")}>From R100.00</Text>
          <TouchableOpacity
            style={tailwind("bg-green-500 rounded-full px-4 py-2")}
            onPress={() => {
              setWebViewVisible(true);
            }}
          >
            <Text style={tailwind("text-white text-md font-semibold")}>
              Book On Site
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={webViewVisible}
        onRequestClose={() => setWebViewVisible(false)}
      >
        <View
          style={tailwind(
            "flex-1 justify-center items-center bg-black bg-opacity-50"
          )}
        >
          <View style={tailwind("relative w-full h-full")}>
            <TouchableOpacity
              onPress={() => setWebViewVisible(false)}
              style={tailwind(
                "absolute mt-1 mb-6 left-4 z-10 p-2 bg-w3-green-1 rounded-full"
              )}
            >
              <Icon name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            {loading && (
              <View
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "white",
                  zIndex: 1000,
                }}
              >
                <Animated.Image
                  source={require("../assets/images/faviconBig.png")}
                  style={[
                    { width: 100, height: 100, marginBottom: 20 },
                    { transform: [{ scale }] },
                  ]}
                />
                <Text style={{ color: "black", fontSize: 18 }}>Loading...</Text>
              </View>
            )}
            <WebView
              ref={webViewRef}
              source={{ uri: "https://test.mapw3.co.za/#services-list" }}
              style={tailwind("w-full h-full")}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              onLoadStart={() => {
                console.log("WebView loading started");
                setLoading(true);
              }}
              onLoadEnd={() => {
                console.log("WebView loading ended");
                setLoading(false);
              }}
              onHttpError={() => {
                console.log("WebView HTTP error");
                setLoading(false);
              }}
              onError={() => {
                console.log("WebView general error");
                setLoading(false);
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default BodyTherapiesScreenCard;
