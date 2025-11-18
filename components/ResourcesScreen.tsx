import React, { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Platform,
  StyleSheet,
} from "react-native";
import { useTailwind } from "tailwind-rn";
import { useNavigation } from "@react-navigation/native";
import AppText from "./AppText";
import { Ionicons } from "@expo/vector-icons";
import Pdf from "react-native-pdf";
import { Asset } from "expo-asset";
import * as FileSystem from "expo-file-system";

const ResourcesScreen = () => {
  const tailwind = useTailwind();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [pdfUri, setPdfUri] = useState<string | null>(null);
  const [numberOfPages, setNumberOfPages] = useState<number>(0);

  useEffect(() => {
    const loadPdf = async () => {
      try {
        // Load the PDF asset
        const asset = Asset.fromModule(
          require("../assets/docs/queenpower.pdf")
        );
        await asset.downloadAsync();

        if (asset.localUri) {
          // For Android, we need to copy to a readable location
          if (Platform.OS === "android") {
            const fileUri = `${FileSystem.documentDirectory}queenpower.pdf`;
            await FileSystem.copyAsync({
              from: asset.localUri,
              to: fileUri,
            });
            setPdfUri(fileUri);
          } else {
            setPdfUri(asset.localUri);
          }
        } else {
          Alert.alert("Error", "Failed to load PDF file");
        }
      } catch (error) {
        console.error("Error loading PDF:", error);
        Alert.alert("Error", "Failed to load PDF file");
      } finally {
        setLoading(false);
      }
    };

    loadPdf();
  }, []);

  return (
    <SafeAreaView style={tailwind("flex-1")}>
      <View style={tailwind("flex-1 justify-center items-center mt-10")}>
        <View
          style={tailwind("flex-row items-center w-full p-4 justify-between")}
        >
          <View style={tailwind("bg-gray-200 rounded-full p-2")}>
            <TouchableOpacity
              style={tailwind("flex items-center justify-center")}
              onPress={() => {
                if (navigation.canGoBack()) {
                  navigation.goBack();
                } else {
                  Alert.alert("No previous screen to go back to.");
                }
              }}
            >
              <Ionicons name="arrow-back" size={24} color="#000" />
            </TouchableOpacity>
          </View>
          <AppText style={tailwind("text-xl font-bold text-center")}>
            Resources
          </AppText>
          <View style={tailwind("w-10")} />
        </View>

        <View style={tailwind("flex-1 w-full")}>
          {loading ? (
            <View style={tailwind("flex-1 justify-center items-center")}>
              <ActivityIndicator size="large" color="#7345B6" />
              <AppText style={tailwind("mt-4 text-gray-600")}>
                Loading PDF...
              </AppText>
            </View>
          ) : pdfUri ? (
            <Pdf
              source={{ uri: pdfUri, cache: true }}
              onLoadComplete={(numberOfPages) => {
                setNumberOfPages(numberOfPages);
                setLoading(false);
              }}
              onPageChanged={(page, numberOfPages) => {
                console.log(`Page ${page} of ${numberOfPages}`);
              }}
              onError={(error) => {
                console.error("PDF error:", error);
                Alert.alert(
                  "Error",
                  "Failed to display PDF. Please try again."
                );
              }}
              style={styles.pdf}
              enablePaging={true}
              horizontal={false}
            />
          ) : (
            <View style={tailwind("flex-1 justify-center items-center p-4")}>
              <AppText style={tailwind("text-gray-600 text-center")}>
                PDF not available
              </AppText>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  pdf: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#E4E4E4",
  },
});

export default ResourcesScreen;
