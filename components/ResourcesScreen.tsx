import React from "react";
import { View, SafeAreaView, TouchableOpacity, Alert } from "react-native";
import { useTailwind } from "tailwind-rn";
import { useNavigation } from "@react-navigation/native";
import AppText from "./AppText";
import { Ionicons } from "@expo/vector-icons";

// Commented out PDF functionality - Coming Soon placeholder
// import { useState, useEffect } from "react";
// import { ActivityIndicator, Platform, StyleSheet, Linking, Share } from "react-native";
// import { Asset } from "expo-asset";
// import RNBlobUtil from "react-native-blob-util";

const ResourcesScreen = () => {
  const tailwind = useTailwind();
  const navigation = useNavigation();

  // Commented out PDF loading and download functionality
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);
  // const [pdfSource, setPdfSource] = useState<string | null>(null);
  // const [downloading, setDownloading] = useState(false);

  // useEffect(() => {
  //   // Load PDF asset and get local file URI for react-native-pdf-renderer
  //   const loadPdf = async () => {
  //     try {
  //       setLoading(true);
  //       console.log("📄 Starting PDF load process...");

  //       const asset = Asset.fromModule(
  //         require("../assets/docs/queenpower.pdf")
  //       );
  //       console.log("📄 Asset created, downloading...");

  //       await asset.downloadAsync();
  //       console.log("📄 Asset downloaded, localUri:", asset.localUri);

  //       if (asset.localUri) {
  //         // react-native-pdf-renderer needs a file:// URI string
  //         console.log("✅ PDF source set to:", asset.localUri);
  //         setPdfSource(asset.localUri);
  //       } else {
  //         throw new Error(
  //           "Failed to get local URI for PDF - asset.localUri is null"
  //         );
  //       }
  //       setLoading(false);
  //     } catch (err: any) {
  //       console.error("❌ Error loading PDF asset:", err);
  //       console.error("❌ Error type:", typeof err);
  //       console.error("❌ Error message:", err?.message);
  //       console.error("❌ Error stack:", err?.stack);
  //       setError(`Failed to load PDF: ${err?.message || "Unknown error"}`);
  //       setLoading(false);
  //     }
  //   };

  //   loadPdf();
  // }, []);

  // const downloadPdf = async () => {
  //   if (!pdfSource) {
  //     Alert.alert("Error", "PDF not loaded yet.");
  //     return;
  //   }

  //   try {
  //     setDownloading(true);
  //     console.log("📥 Starting PDF download...");
  //     console.log("📥 Source:", pdfSource);

  //     // Get Downloads directory path
  //     const downloadsPath =
  //       Platform.OS === "android"
  //         ? RNBlobUtil.fs.dirs.DownloadDir
  //         : RNBlobUtil.fs.dirs.DocumentDir;

  //     const fileName = "QueenPower.pdf";
  //     const filePath = `${downloadsPath}/${fileName}`;

  //     console.log("📥 Downloading to:", filePath);

  //     // Copy the PDF file to Downloads folder
  //     await RNBlobUtil.fs.cp(pdfSource, filePath);

  //     console.log("✅ PDF downloaded successfully to:", filePath);

  //     // On Android, we can also share it or open it
  //     if (Platform.OS === "android") {
  //       // Try to open the file
  //       try {
  //         await Linking.openURL(`file://${filePath}`);
  //         Alert.alert(
  //           "Success",
  //           `PDF downloaded to Downloads folder and opened!`
  //         );
  //       } catch (openError) {
  //         // If opening fails, just show success message
  //         Alert.alert(
  //           "Success",
  //           `PDF downloaded to Downloads folder: ${filePath}`
  //         );
  //       }
  //     } else {
  //       // On iOS, use Share API
  //       await Share.share({
  //         url: pdfSource,
  //         title: "QueenPower PDF",
  //       });
  //       Alert.alert("Success", "PDF shared successfully!");
  //     }
  //   } catch (err: any) {
  //     console.error("❌ Error downloading PDF:", err);
  //     console.error("❌ Error message:", err?.message);
  //     console.error("❌ Error stack:", err?.stack);
  //     Alert.alert(
  //       "Error",
  //       `Failed to download PDF: ${err?.message || "Unknown error"}`
  //     );
  //   } finally {
  //     setDownloading(false);
  //   }
  // };

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

        <View style={tailwind("flex-1 w-full justify-center items-center p-4")}>
          {/* Coming Soon Placeholder */}
          <View style={tailwind("items-center")}>
            <View
              style={[
                tailwind("rounded-full p-6 mb-6"),
                { backgroundColor: "rgba(115, 69, 182, 0.16)" },
              ]}
            >
              <Ionicons name="document-text" size={64} color="#7345B6" />
            </View>
            <AppText style={tailwind("text-2xl font-bold text-center mb-2")}>
              Coming Soon
            </AppText>
            <AppText style={tailwind("text-gray-600 text-center")}>
              Resources will be available soon
            </AppText>
          </View>
        </View>

        {/* Commented out PDF functionality */}
        {/* {error ? (
            <View style={tailwind("flex-1 justify-center items-center p-4")}>
              <AppText style={tailwind("text-gray-600 text-center mb-4")}>
                {error}
              </AppText>
              <TouchableOpacity
                style={tailwind("bg-purple-600 px-4 py-2 rounded-lg")}
                onPress={() => navigation.goBack()}
              >
                <AppText style={tailwind("text-white font-bold")}>
                  Go Back
                </AppText>
              </TouchableOpacity>
            </View>
          ) : loading || !pdfSource ? (
            <View style={tailwind("flex-1 justify-center items-center")}>
              <ActivityIndicator size="large" color="#7345B6" />
              <AppText style={tailwind("mt-4 text-gray-600")}>
                Loading PDF...
              </AppText>
            </View>
          ) : (
            <View style={tailwind("flex-1 p-4")}>
              <TouchableOpacity
                style={[
                  tailwind("bg-white rounded-lg p-6 mb-4 border-2"),
                  { borderColor: "#E5E7EB" },
                ]}
                onPress={downloadPdf}
                disabled={downloading}
                activeOpacity={0.7}
              >
                <View style={tailwind("flex-row items-center mb-4")}>
                  <View
                    style={[
                      tailwind("rounded-lg p-4 mr-4"),
                      { backgroundColor: "rgba(115, 69, 182, 0.16)" },
                    ]}
                  >
                    <Ionicons name="document-text" size={48} color="#7345B6" />
                  </View>
                  <View style={tailwind("flex-1")}>
                    <AppText style={tailwind("text-xl font-bold mb-1")}>
                      QueenPower PDF
                    </AppText>
                    <AppText style={tailwind("text-gray-600 text-sm")}>
                      Tap to download
                    </AppText>
                  </View>
                  {downloading ? (
                    <ActivityIndicator size="small" color="#7345B6" />
                  ) : (
                    <Ionicons name="download" size={24} color="#7345B6" />
                  )}
                </View>
                <View
                  style={[
                    tailwind("rounded-lg p-3"),
                    { backgroundColor: "#F3F4F6" },
                  ]}
                >
                  <AppText style={tailwind("text-gray-700 text-sm")}>
                    This document contains the QueenPower program guide and
                    resources.
                  </AppText>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  tailwind("bg-purple-600 px-6 py-4 rounded-lg items-center"),
                  downloading && tailwind("opacity-50"),
                ]}
                onPress={downloadPdf}
                disabled={downloading}
              >
                {downloading ? (
                  <View style={tailwind("flex-row items-center")}>
                    <ActivityIndicator size="small" color="#FFFFFF" />
                    <AppText
                      style={tailwind("text-white font-bold text-lg ml-2")}
                    >
                      Downloading...
                    </AppText>
                  </View>
                ) : (
                  <View style={tailwind("flex-row items-center")}>
                    <Ionicons name="download" size={24} color="#FFFFFF" />
                    <AppText
                      style={tailwind("text-white font-bold text-lg ml-2")}
                    >
                      Download PDF
                    </AppText>
                  </View>
                )}
              </TouchableOpacity>
            </View>
          )} */}
      </View>
    </SafeAreaView>
  );
};

// Commented out styles
// const styles = StyleSheet.create({
//   pdf: {
//     flex: 1,
//     width: "100%",
//     height: "100%",
//     backgroundColor: "#E4E4E4",
//   },
// });

export default ResourcesScreen;
