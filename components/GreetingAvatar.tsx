import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { StyleSheet, View, Image } from "react-native";
import { useTailwind } from "tailwind-rn";

interface Props {
  width: number;
  height: number;
  url: string | null;
}

export default function GreetingAvatar({
  url,
  width = 150,
  height = 150,
}: Props) {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const tailwind = useTailwind();

  useEffect(() => {
    if (url) downloadImage(url);
  }, [url]);

  async function downloadImage(path: string) {
    try {
      const { data, error } = await supabase.storage
        .from("avatars")
        .download(path);

      if (error) {
        throw error;
      }

      const fr = new FileReader();
      fr.readAsDataURL(data);
      fr.onload = () => {
        setAvatarUrl(fr.result as string);
      };
    } catch (error) {
      if (error instanceof Error) {
      }
    }
  }

  return (
    <View style={tailwind("flex-col items-center justify-center")}>
      <View
        style={{
          borderWidth: 1,
          borderColor: "#999",
          borderRadius: width / 2,
          overflow: "hidden",
          width: width,
          height: height,
        }}
      >
        {avatarUrl ? (
          <Image
            source={{ uri: avatarUrl }}
            accessibilityLabel="Avatar"
            style={{ width: width, height: height }}
          />
        ) : (
          <View
            style={{
              width: width,
              height: height,
              backgroundColor: "#333",
              borderWidth: 1,
              borderStyle: "solid",
              borderColor: "rgb(200, 200, 200)",
              borderRadius: 5,
            }}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    borderRadius: 5,
    overflow: "hidden",
    width: 60,
    height: 60,
  },
  image: {
    objectFit: "contain",
    paddingTop: 0,
  },

  noImage: {
    backgroundColor: "#333",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgb(200, 200, 200)",
    borderRadius: 5,
  },
});
