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
import { StatusBar, LogBox } from "react-native";
import RegisterScreen from "@/components/Register";
import Home from "@/components/Home";
import { auth } from "@/app/(auth)/firebaseConfig";
import { TailwindProvider } from "tailwind-rn";
import utilities from "@/app/tailwind.json";
import OnboardingScreen from "@/components/HomeOnboarding";
import ForgotPassword from "@/components/ForgotPassword";
import ProfileComponent from "@/components/ProfileComponent";
import WellnessWelcomeScreen from "@/components/WellnessWelcomeScreen";
import WellnessOnboardingComponent from "@/components/WellnessOnboarding";
import WellnessHome from "@/components/WellnessHome";
import Notifications from "@/components/Notifications";
import OTPCodeComponent from "@/components/OTPCodeComponent";
import ResetPasswordComponent from "@/components/ResetPasswordComponent";
import ConsultScreen from "@/components/ConsultScreen";
import DoctorProfileScreen from "@/components/DoctorProfileScreen";
import PaymentSuccessScreen from "@/components/PaymentSuccessScreen";
import PaymentScreen from "@/components/PaymentScreen";
import MessageComponent from "@/components/MessageComponent";
import CallScreen from "@/components/CallScreen";
import WisdomWelcomeScreen from "@/components/WisdomWelcome";
import WisdomHome from "@/components/WisdomHome";
import WisdomOnboardingScreen from "@/components/WisdomOnboarding";
import CoachingScreen from "@/components/CoachingScreen";
import WealthHome from "@/components/WealthHome";
import WealthWelcomeScreen from "@/components/WeathWelcome";
import WealthOnboardingScreen from "@/components/WealthOnboarding";
LogBox.ignoreLogs([
  "Text strings must be rendered within a <Text> component",
  "",
]);

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
        setInitialRoute("Login");
      }
    });

    return () => unsubscribe();
  }, []);

  if (!isSplashFinished || !isFontLoaded) {
    return <SplashScreenComponent onFinish={handleSplashFinish} />;
  }

  return (
    <ThemeProvider
      value={colorScheme === "light" ? DefaultTheme : DefaultTheme}
    >
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
          <Stack.Screen name="Notifications" component={Notifications} />
          <Stack.Screen
            name="WellnessWelcome"
            component={WellnessWelcomeScreen}
          />
          <Stack.Screen
            name="WellnessOnboarding"
            component={WellnessOnboardingComponent}
          />
          <Stack.Screen name="WellnessHome" component={WellnessHome} />
          <Stack.Screen name="OTPCode" component={OTPCodeComponent} />
          <Stack.Screen
            name="ResetPassword"
            component={ResetPasswordComponent}
          />
          <Stack.Screen name="Consult" component={ConsultScreen} />
          <Stack.Screen name="DoctorProfile" component={DoctorProfileScreen} />
          <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
          <Stack.Screen
            name="PaymentSuccessScreen"
            component={PaymentSuccessScreen}
          />
          <Stack.Screen name="Message" component={MessageComponent} />
          <Stack.Screen name="CallScreen" component={CallScreen} />
          <Stack.Screen name="WisdomWelcome" component={WisdomWelcomeScreen} />
          <Stack.Screen name="WisdomHome" component={WisdomHome} />
          <Stack.Screen
            name="WisdomOnboarding"
            component={WisdomOnboardingScreen}
          />
          <Stack.Screen name="Coaching" component={CoachingScreen} />
          <Stack.Screen name="WealthWelcome" component={WealthWelcomeScreen} />
          <Stack.Screen name="Wealth" component={WealthHome} />
          <Stack.Screen
            name="WealthOnboarding"
            component={WealthOnboardingScreen}
          />
        </Stack.Navigator>
      </TailwindProviderFix>
    </ThemeProvider>
  );
}
