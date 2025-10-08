import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { StyleSheet, View, Image } from "react-native";
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

      const { data, error } = await supabase.storage
        .from("avatars")
        .download(path);

      if (error) {
        console.error("❌ Supabase storage download error:", error);
        throw error;
      }

      console.log(
        "✅ Image downloaded successfully, size:",
        data?.size || "unknown"
      );

      const fr = new FileReader();
      fr.readAsDataURL(data);
      fr.onload = () => {
        console.log("✅ Image converted to data URL successfully");
        setAvatarUrl(fr.result as string);
        try {
          // Cache the avatar URL
          localStorage.setItem(`avatar-${path}`, fr.result as string);
        } catch (error) {
          console.error("Error saving avatar URL to storage:", error);
        }
      };
      fr.onerror = (error) => {
        console.error("❌ FileReader error:", error);
        showAlert("error", "Download Failed", "Failed to process the image");
      };
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

      // Automatically resize image if it's too large
      const maxDimension = 512; // Resize to max 512x512 for profile pictures

      if (image.width > maxDimension || image.height > maxDimension) {
        console.log(
          "🔄 Image too large, resizing from",
          image.width,
          "x",
          image.height,
          "to max",
          maxDimension,
          "x",
          maxDimension
        );

        // Create a canvas to resize the image
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        // Calculate new dimensions maintaining aspect ratio
        const aspectRatio = image.width / image.height;
        let newWidth, newHeight;

        if (aspectRatio > 1) {
          // Landscape
          newWidth = maxDimension;
          newHeight = maxDimension / aspectRatio;
        } else {
          // Portrait or square
          newHeight = maxDimension;
          newWidth = maxDimension * aspectRatio;
        }

        canvas.width = newWidth;
        canvas.height = newHeight;

        // Create HTML image element and draw resized image
        const img = new (window as any).Image();
        img.onload = () => {
          ctx?.drawImage(img, 0, 0, newWidth, newHeight);
          const resizedDataUrl = canvas.toDataURL("image/jpeg", 0.8);

          console.log("✅ Image resized to:", newWidth, "x", newHeight);
          console.log(
            "📊 New URI length:",
            resizedDataUrl.length,
            "characters"
          );

          // Continue with upload using resized image
          uploadResizedImage({
            ...image,
            uri: resizedDataUrl,
            width: newWidth,
            height: newHeight,
            fileSize: Math.round(resizedDataUrl.length * 0.75),
          });
        };

        img.src = image.uri;
        return; // Exit early, will continue in img.onload
      } else {
        // Image is already small enough, proceed normally
        uploadResizedImage(image);
      }
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
      <View
        style={{
          borderWidth: 4,
          borderColor: "#999",
          borderRadius: 160,
          overflow: "hidden",
        }}
      >
        {avatarUrl ? (
          <Image
            source={{ uri: avatarUrl }}
            accessibilityLabel="Avatar"
            style={[avatarSize, styles.avatar, styles.image]}
          />
        ) : (
          <Image
            source={require("../assets/images/faviconBig.png")}
            accessibilityLabel="Default Avatar"
            style={[avatarSize, styles.avatar, styles.image]}
          />
        )}
      </View>
      <View style={tailwind("mt-2")}>
        <ButtonComponent
          title={uploading ? "Uploading ..." : "Upload Image"}
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
    borderRadius: 5,
    overflow: "hidden",
    width: 180,
    height: 180,
  },
  image: {
    objectFit: "contain",
    paddingTop: 0,
  },
  noImage: {
    backgroundColor: "#333",
    borderWidth: 5,
    borderColor: "#ccc",
    borderRadius: 5,
  },
});
