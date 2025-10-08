import React, { useState, useEffect, useRef } from "react";
import { ThemeProvider } from "@react-navigation/native";
import { DefaultTheme } from "@react-navigation/native";
import * as Font from "expo-font";
import SplashScreenComponent from "@/components/SplashScreen";
import WelcomeScreen from "@/components/WelcomeScreen";
import { useColorScheme } from "@/hooks/useColorScheme";
import "../styles/tailwind.css";
import {
  createStackNavigator,
  StackScreenProps,
} from "@react-navigation/stack";
import LoginScreen from "@/components/LoginScreen";
import { StatusBar, LogBox, Linking } from "react-native";
import RegisterScreen from "@/components/Register";
import UpdateProfile from "@/components/UpdateProfile";
import { TailwindProvider } from "tailwind-rn";
import utilities from "@/app/tailwind.json";
import ForgotPassword from "@/components/ForgotPassword";
import Toast from "react-native-toast-message";
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
import BrandsComponent from "@/components/BrandsComponent";
import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import Home from "@/components/Home";
import HomeOnboardingScreen from "@/components/HomeOnboarding";
import BlogRead from "@/components/BlogRead";
import UserUpdate from "@/components/UserUpdate";
import { Provider, useDispatch } from "react-redux";
import { store } from "../store/store";
import { setProfile } from "../store/slices/profileSlice";
import ProductsScreen from "@/components/ProductsScreen";
import CartScreen from "@/components/CartScreen";
import WishlistScreen from "@/components/WishlistScreen";
import EventRead from "@/components/EventRead";
import Treatments from "@/components/Treatments";
LogBox.ignoreLogs([
  "Text strings must be rendered within a <Text> component",
  "",
]);

const TailwindProviderFix = TailwindProvider as any;

const Stack = createStackNavigator();

const AppContent = () => {
  const colorScheme = useColorScheme();
  const dispatch = useDispatch();
  const navigationRef = useRef<any>(null);

  const [isSplashFinished, setSplashFinished] = useState(false);
  const [isFontLoaded, setFontLoaded] = useState(false);
  const [initialRoute, setInitialRoute] = useState("Welcome");
  const [isProfileChecked, setIsProfileChecked] = useState(false);
  
  // Debug initial route changes
  useEffect(() => {
    console.log("🚀 Initial route changed to:", initialRoute);
  }, [initialRoute]);
  
  // Navigate to the correct screen after profile check
  useEffect(() => {
    if (isProfileChecked && navigationRef.current && session) {
      console.log("🧭 Navigating to:", initialRoute);
      navigationRef.current.reset({
        index: 0,
        routes: [{ name: initialRoute }],
      });
    }
  }, [isProfileChecked, initialRoute, session]);
  
  const [session, setSession] = useState<Session | null>(null);
  const [isEmailConfirmed, setIsEmailConfirmed] = useState(false);
  const [isDeepLinkHandled, setIsDeepLinkHandled] = useState(false);

  const handleSplashFinish = () => {
    setSplashFinished(true);
  };

  useEffect(() => {
    const loadFonts = async () => {
      try {
        // For web, use system fonts as fallback
        if (typeof window !== "undefined") {
          setFontLoaded(true);
          return;
        }

        // For mobile, load custom fonts with timeout
        const fontPromise = Font.loadAsync({
          "SFPro-Regular": require("../assets/fonts/regular.ttf"),
          "SFPro-Bold": require("../assets/fonts/regular.ttf"),
        });

        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Font loading timeout")), 3000)
        );

        await Promise.race([fontPromise, timeoutPromise]);
        setFontLoaded(true);
      } catch (error) {
        console.warn("Font loading failed, using fallback fonts:", error);
        setFontLoaded(true);
      }
    };

    loadFonts();
  }, []);

  // Handle deep links for email confirmation
  useEffect(() => {
    const handleDeepLink = (url: string) => {
      console.log("🔗 Deep link received:", url);

      // Check if this is an email confirmation link
      if (url.includes("auth/callback") || url.includes("confirm")) {
        console.log("📧 Email confirmation deep link detected");
        setIsEmailConfirmed(true);
        setInitialRoute("Login");
        setIsDeepLinkHandled(true);

        // Show success message
        Toast.show({
          type: "success",
          text1: "Email Confirmed!",
          text2: "Your account has been verified. Please sign in.",
          position: "top",
          visibilityTime: 4000,
        });
      }
    };

    // Handle initial deep link if app was opened via deep link
    Linking.getInitialURL().then((url) => {
      if (url) {
        handleDeepLink(url);
      }
    });

    // Handle deep links while app is running
    const subscription = Linking.addEventListener("url", ({ url }) => {
      handleDeepLink(url);
    });

    return () => subscription?.remove();
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        checkFirstTimeUser(session);
      } else {
        setInitialRoute("Login");
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth state change:", event, session?.user?.email);

      // Handle email confirmation specifically
      if (event === "SIGNED_IN" && session?.user?.email_confirmed_at) {
        console.log("✅ Email confirmed, user signed in:", session.user.email);
        setIsEmailConfirmed(true);
        setSession(session);
        checkFirstTimeUser(session);
        return;
      }

      // Handle other auth events
      setSession(session);
      if (session) {
        checkFirstTimeUser(session);
      } else {
        // If user just confirmed email via deep link, redirect to Login
        if (isDeepLinkHandled || isEmailConfirmed) {
          console.log("📧 Email confirmed via deep link, redirecting to Login");
          setInitialRoute("Login");
          setIsEmailConfirmed(false);
          setIsDeepLinkHandled(false);
        } else {
          setInitialRoute("Login");
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [isEmailConfirmed, isDeepLinkHandled]);

  // Force re-check onboarding status when session changes
  useEffect(() => {
    if (session) {
      checkFirstTimeUser(session);
    }
  }, [session]);

  const fetchUserProfile = async (session: Session) => {
    if (session?.user) {
      try {
        const { data: profile, error } = await supabase
          .from("profiles")
          .select("first_name, last_name, avatar_url")
          .eq("id", session.user.id)
          .single();

        if (error) {
          console.log("No profile found in fetchUserProfile:", error.code);
          // Don't treat this as an error - it's expected for first-time users
        } else if (profile) {
          console.log("Profile found in fetchUserProfile:", profile);
          // Store profile data in Redux
          dispatch(
            setProfile({
              firstName: profile.first_name,
              lastName: profile.last_name,
              avatarUrl: profile.avatar_url,
            })
          );
        }
      } catch (error) {
        console.log("Error in fetchUserProfile (expected for first-time users):", error);
      }
    }
  };

  const checkFirstTimeUser = async (session: Session) => {
    if (session?.user) {
      console.log("🔍 Checking first time user for:", session.user.email);
      
      // First fetch the profile data
      await fetchUserProfile(session);

      const { data: profile, error } = await supabase
        .from("profiles")
        .select("hascompletedprofileupdate, hascompletedhomeonboarding")
        .eq("id", session.user.id)
        .single();

      console.log("📊 Profile check result:", { profile, error: error?.code });

      // If no profile exists (first-time user), go to UpdateProfile
      if (error && error.code === "PGRST116") {
        console.log("✅ No profile found - first-time user, going to UpdateProfile");
        setInitialRoute("UpdateProfile");
      } else if (error) {
        console.error("❌ Error checking profile:", error);
        setInitialRoute("UpdateProfile"); // Default to UpdateProfile on error
      } else if (!profile?.hascompletedprofileupdate) {
        console.log("📝 Profile exists but not completed, going to UpdateProfile");
        setInitialRoute("UpdateProfile");
      } else if (!profile?.hascompletedhomeonboarding) {
        console.log("🏠 Profile completed but not home onboarding, going to Welcome");
        setInitialRoute("Welcome");
      } else {
        console.log("🏡 Everything completed, going to Home");
        setInitialRoute("Home");
      }
      
      setIsProfileChecked(true);
    }
  };

  function UpdateProfileWrapper({ navigation }: any) {
    if (!session) return null;
    return <UpdateProfile navigation={navigation} session={session} />;
  }

  function HomeOnboardingWrapper({ navigation }: any) {
    if (!session) return null;
    return <HomeOnboardingScreen navigation={navigation} session={session} />;
  }

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
          ref={navigationRef}
          initialRouteName={initialRoute}
          screenOptions={{ headerShown: false }}
        >
          {!session ? (
            <>
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Register" component={RegisterScreen} />
              <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
              <Stack.Screen name="OTPCode" component={OTPCodeComponent} />
              <Stack.Screen
                name="ResetPassword"
                component={ResetPasswordComponent}
              />
            </>
          ) : (
            <>
              <Stack.Screen name="Welcome" component={WelcomeScreen} />
              <Stack.Screen
                name="UpdateProfile"
                component={UpdateProfileWrapper}
                options={{
                  gestureEnabled: false,
                }}
              />
              <Stack.Screen
                name="Home"
                component={Home}
                options={{
                  gestureEnabled: false,
                }}
              />
              <Stack.Screen
                name="HomeOnboarding"
                component={HomeOnboardingWrapper}
              />
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
              <Stack.Screen name="Consult" component={ConsultScreen} />
              <Stack.Screen
                name="DoctorProfile"
                component={DoctorProfileScreen}
              />
              <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
              <Stack.Screen
                name="PaymentSuccessScreen"
                component={PaymentSuccessScreen}
              />
              <Stack.Screen name="Message" component={MessageComponent} />
              <Stack.Screen name="CallScreen" component={CallScreen} />
              <Stack.Screen
                name="WisdomWelcome"
                component={WisdomWelcomeScreen}
              />
              <Stack.Screen name="WisdomHome" component={WisdomHome} />
              <Stack.Screen
                name="WisdomOnboarding"
                component={WisdomOnboardingScreen}
              />
              <Stack.Screen name="Coaching" component={CoachingScreen} />
              <Stack.Screen
                name="WealthWelcome"
                component={WealthWelcomeScreen}
              />
              <Stack.Screen name="Wealth" component={WealthHome} />
              <Stack.Screen
                name="WealthOnboarding"
                component={WealthOnboardingScreen}
              />
              <Stack.Screen name="Brands" component={BrandsComponent} />
              <Stack.Screen name="BlogRead" component={BlogRead} />
              <Stack.Screen
                name="UserUpdate"
                component={UserUpdate}
                initialParams={{ session: session }}
              />
              <Stack.Screen name="Products" component={ProductsScreen} />
              <Stack.Screen name="CartScreen" component={CartScreen} />
              <Stack.Screen name="WishlistScreen" component={WishlistScreen} />
              <Stack.Screen name="EventRead" component={EventRead} />
              <Stack.Screen name="Treatments" component={Treatments} />
            </>
          )}
        </Stack.Navigator>
        <Toast />
      </TailwindProviderFix>
    </ThemeProvider>
  );
};

const AppLayout = () => {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
};

export default AppLayout;
