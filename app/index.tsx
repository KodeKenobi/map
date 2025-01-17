import React, { useState, useEffect } from "react";
import { ThemeProvider } from "@react-navigation/native";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import * as Font from "expo-font";
import SplashScreenComponent from "@/components/SplashScreen";
import WelcomeScreen from "@/components/WelcomeScreen";
import { useColorScheme } from "@/hooks/useColorScheme";
import "../styles/tailwind.css";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "@/components/LoginScreen";
import { StatusBar } from "react-native";
import RegisterScreen from "@/components/Register";
import Home from "@/components/Home";
import { auth } from "@/app/(auth)/firebaseConfig";
import { TailwindProvider } from "tailwind-rn";
import utilities from "@/app/tailwind.json";
import OnboardingScreen from "@/components/OnboardingScreen";
import ForgotPassword from "@/components/ForgotPassword";
import ProfileComponent from "@/components/ProfileComponent";
import WellnessWelcomeScreen from "@/components/WellnessWelcomeScreen";
import WellnessOnboardingComponent from "@/components/WellnessOnboardingComponent";
import WellnessHome from "@/components/WellnessHome";

const TailwindProviderFix = TailwindProvider as any;

const Stack = createStackNavigator();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [isSplashFinished, setSplashFinished] = useState(false);
  const [isFontLoaded, setFontLoaded] = useState(false);
  const [initialRoute, setInitialRoute] = useState("Welcome");

  const handleSplashFinish = () => {
    setSplashFinished(true);
  };

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        "SFPro-Regular": require("../assets/fonts/regular.ttf"),
        "SFPro-Bold": require("../assets/fonts/regular.ttf"),
      });
      setFontLoaded(true);
    };

    loadFonts();
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setInitialRoute("Home");
      } else {
        setInitialRoute("Welcome");
      }
    });

    return () => unsubscribe();
  }, []);

  if (!isSplashFinished || !isFontLoaded) {
    return <SplashScreenComponent onFinish={handleSplashFinish} />;
  }

  return (
    <ThemeProvider value={colorScheme === "light" ? DarkTheme : DefaultTheme}>
      <TailwindProviderFix utilities={utilities}>
        <StatusBar
          hidden={false}
          backgroundColor={"white"}
          barStyle={colorScheme === "dark" ? "dark-content" : "light-content"}
          translucent={true}
        />
        <Stack.Navigator
          initialRouteName={initialRoute}
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          <Stack.Screen name="Profile" component={ProfileComponent} />
          <Stack.Screen
            name="WellnessWelcome"
            component={WellnessWelcomeScreen}
          />
          <Stack.Screen
            name="WellnessOnboarding"
            component={WellnessOnboardingComponent}
          />
                    <Stack.Screen
            name="WellnessHome"
            component={WellnessHome}
          />
        </Stack.Navigator>
      </TailwindProviderFix>
    </ThemeProvider>
  );
}
