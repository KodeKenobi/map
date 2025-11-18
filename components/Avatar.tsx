import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import ButtonComponent from "./ButtonComponent";
import { useTailwind } from "tailwind-rn";
import CustomAlert from "./CustomAlert";

interface Props {
  size: number;
  url: string | null;
  onUpload: (filePath: string) => void;
}

export default function Avatar({ url, size = 150, onUpload }: Props) {
  const [uploading, setUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertConfig, setAlertConfig] = useState({
    type: "error" as "success" | "warning" | "error" | "info",
    title: "",
    message: "",
  });
  const avatarSize = { height: size, width: size };
  const circleRadius = size / 2;
  const tailwind = useTailwind();

  const showAlert = (
    type: "success" | "warning" | "error" | "info",
    title: string,
    message: string
  ) => {
    setAlertConfig({ type, title, message });
    setAlertVisible(true);
  };

  useEffect(() => {
    if (url) downloadImage(url);
  }, [url]);

  async function downloadImage(path: string) {
    try {
      console.log("🔄 Downloading image from path:", path);

      // Get the public URL for the image
      const { data } = supabase.storage.from("avatars").getPublicUrl(path);

      if (data?.publicUrl) {
        console.log("✅ Got public URL for image:", data.publicUrl);
        setAvatarUrl(data.publicUrl);
      } else {
        console.error("❌ Failed to get public URL for image");
        showAlert("error", "Download Failed", "Could not get image URL");
      }
    } catch (error) {
      console.error("❌ Download image error:", error);
      if (error instanceof Error) {
        showAlert("error", "Download Failed", error.message);
      } else {
        showAlert(
          "error",
          "Download Failed",
          "An unexpected error occurred. Please try again."
        );
      }
    }
  }

  async function uploadAvatar() {
    try {
      setUploading(true);
      console.log("🔄 Starting avatar upload process...");
      console.log("🖼️ Avatar clicked - opening image picker");

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: false,
        allowsEditing: true,
        aspect: [1, 1], // Force square aspect ratio (1:1)
        quality: 0.3, // Moderate quality
        exif: false,
      });

      if (result.canceled || !result.assets || result.assets.length === 0) {
        console.log("❌ Image picker was canceled or no assets selected");
        setUploading(false);
        return;
      }

      const image = result.assets[0];
      console.log("✅ Image selected:", {
        uri: image.uri,
        width: image.width,
        height: image.height,
        fileSize: image.fileSize,
        mimeType: image.mimeType,
      });

      // Check if image is square (cropping should have made it square)
      const isSquare = Math.abs(image.width - image.height) <= 5; // Allow 5px tolerance
      console.log(
        "🔍 Image is square after cropping:",
        isSquare,
        `(${image.width}x${image.height})`
      );

      if (!isSquare) {
        console.log(
          "⚠️ Image is not square - cropping may not have worked properly"
        );
      }

      if (!image.uri) {
        console.error("❌ No image URI found in selected asset");
        throw new Error("No image uri!");
      }

      // For now, just proceed with the original image
      // Image resizing can be handled by the ImagePicker quality setting
      console.log("📊 Image dimensions:", image.width, "x", image.height);
      console.log("📊 Image file size:", image.fileSize, "bytes");

      // Proceed with upload using the original image
      uploadResizedImage(image);
    } catch (error) {
      console.error("❌ Upload avatar error:", error);
      setAvatarUrl(null);
      if (error instanceof Error) {
        showAlert("error", "Upload Failed", error.message);
      } else {
        showAlert(
          "error",
          "Upload Failed",
          "An unexpected error occurred. Please try again."
        );
      }
      setUploading(false);
    }
  }

  async function uploadResizedImage(image: any) {
    try {
      // Show preview immediately after image selection
      console.log("🖼️ Setting preview image...");
      setAvatarUrl(image.uri);

      console.log("🔄 Converting image to array buffer...");
      const arraybuffer = await fetch(image.uri).then((res) => {
        console.log("📊 Fetch response status:", res.status, res.statusText);
        return res.arrayBuffer();
      });

      console.log("📦 Array buffer size:", arraybuffer.byteLength, "bytes");

      // Get current user ID for proper RLS permissions
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        throw new Error("User not authenticated");
      }

      const path = `${user.id}/${Date.now()}.jpg`;
      console.log("📁 Upload path:", path);

      console.log("☁️ Uploading to Supabase storage...");
      const { data, error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(path, arraybuffer, {
          contentType: image.mimeType ?? "image/jpeg",
        });

      if (uploadError) {
        console.error("❌ Supabase upload error:", uploadError);
        throw uploadError;
      }

      console.log("✅ Upload successful! Path:", data.path);
      onUpload(data.path);
    } catch (error) {
      console.error("❌ Upload error:", error);
      setAvatarUrl(null);
      if (error instanceof Error) {
        showAlert("error", "Upload Failed", error.message);
      } else {
        showAlert(
          "error",
          "Upload Failed",
          "An unexpected error occurred. Please try again."
        );
      }
    } finally {
      console.log("🏁 Upload process finished, setting uploading to false");
      setUploading(false);
    }
  }

  return (
    <View style={tailwind("flex-col items-center justify-center")}>
      <TouchableOpacity
        onPress={uploadAvatar}
        disabled={uploading}
        style={{
          width: size,
          height: size,
          borderWidth: 4,
          borderColor: uploading ? "#ccc" : "#F9CF67",
          borderRadius: circleRadius, // Perfect circle
          backgroundColor: "#FFFFFF", // White background
          overflow: "hidden",
          opacity: uploading ? 0.7 : 1,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
        activeOpacity={0.8}
      >
        {avatarUrl ? (
          <Image
            source={{ uri: avatarUrl }}
            accessibilityLabel="Avatar - Tap to change"
            style={[avatarSize, styles.avatar, styles.image]}
          />
        ) : (
          <View style={[avatarSize, styles.avatar, styles.noImage]}>
            <Image
              source={require("../assets/images/faviconBig.png")}
              accessibilityLabel="Default Avatar - Tap to select image"
              style={styles.image}
            />
          </View>
        )}
      </TouchableOpacity>
      <View style={tailwind("mt-2")}>
        <ButtonComponent
          title={uploading ? "Uploading ..." : "Select Image"}
          onPress={uploadAvatar}
          disabled={uploading}
          color="transparent"
          style={tailwind("border-2")}
        />
      </View>
      <CustomAlert
        visible={alertVisible}
        type={alertConfig.type}
        title={alertConfig.title}
        message={alertConfig.message}
        onClose={() => setAlertVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    borderRadius: 0, // Let the parent handle the border radius
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover", // Ensure image covers the entire circle
  },
  noImage: {
    backgroundColor: "#FFFFFF", // White background for default image
    borderWidth: 0,
    borderRadius: 0,
  },
});
