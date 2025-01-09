import React, { useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";
import * as SplashScreen from "expo-splash-screen";

export default function SplashScreenComponent({
  onFinish,
}: {
  onFinish: () => void;
}) {
  useEffect(() => {
    const hideSplashScreen = async () => {
      await SplashScreen.preventAutoHideAsync();
      setTimeout(async () => {
        await SplashScreen.hideAsync();
        onFinish();
      }, 2000);
    };

    hideSplashScreen();
  }, [onFinish]);

  return (
    <View style={styles.container}>
      <Image source={require("../assets/images/logo.png")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
});
