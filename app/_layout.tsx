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
import { StatusBar, LogBox, Linking, AppState } from "react-native";
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
  const [initialRoute, setInitialRoute] = useState("Login");
  const [isProfileChecked, setIsProfileChecked] = useState(false);
  const [isCheckingProfile, setIsCheckingProfile] = useState(false);

  const [session, setSession] = useState<Session | null>(null);
  const [isEmailConfirmed, setIsEmailConfirmed] = useState(false);
  const [isDeepLinkHandled, setIsDeepLinkHandled] = useState(false);

  // Log every state change
  console.log("🔄 AppContent State Update:", {
    session: !!session,
    initialRoute,
    isSplashFinished,
    isFontLoaded,
    isEmailConfirmed,
    isDeepLinkHandled,
    isProfileChecked,
    isCheckingProfile,
    timestamp: new Date().toISOString(),
  });

  const handleSplashFinish = () => {
    console.log("🎬 Splash screen finished, setting isSplashFinished to true");
    setSplashFinished(true);
  };

  useEffect(() => {
    console.log("🔤 Starting font loading process");
    const loadFonts = async () => {
      try {
        // For web, use system fonts as fallback
        if (typeof window !== "undefined") {
          console.log("🌐 Web environment detected, using system fonts");
          setFontLoaded(true);
          return;
        }

        console.log("📱 Mobile environment detected, loading custom fonts");
        // For mobile, load custom fonts with timeout
        const fontPromise = Font.loadAsync({
          "SFPro-Regular": require("../assets/fonts/regular.ttf"),
          "SFPro-Bold": require("../assets/fonts/regular.ttf"),
        });

        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Font loading timeout")), 3000)
        );

        console.log("⏳ Waiting for font loading to complete...");
        await Promise.race([fontPromise, timeoutPromise]);
        console.log("✅ Fonts loaded successfully");
        setFontLoaded(true);
      } catch (error) {
        console.warn("❌ Font loading failed, using fallback fonts:", error);
        console.log("⚠️ Continuing with fallback fonts");
        setFontLoaded(true);
      }
    };

    loadFonts();
  }, []);

  // Handle AppState changes to manage session auto-refresh
  useEffect(() => {
    console.log("🔄 Setting up AppState listener for session auto-refresh");

    // Start auto-refresh when app becomes active
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      console.log("🔄 AppState changed to:", nextAppState);
      if (nextAppState === "active") {
        console.log("✅ App is active, starting session auto-refresh");
        supabase.auth.startAutoRefresh();
      } else {
        console.log("⏸️ App is inactive, stopping session auto-refresh");
        supabase.auth.stopAutoRefresh();
      }
    });

    // Start auto-refresh initially if app is already active
    if (AppState.currentState === "active") {
      console.log("✅ App is already active, starting session auto-refresh");
      supabase.auth.startAutoRefresh();
    }

    return () => {
      console.log("🔄 Cleaning up AppState listener");
      subscription.remove();
      supabase.auth.stopAutoRefresh();
    };
  }, []);

  // Handle deep links for email confirmation
  useEffect(() => {
    console.log("🔗 Setting up deep link handling");
    const handleDeepLink = (url: string) => {
      console.log("🔗 Deep link received:", url);
      console.log("🔗 Deep link timestamp:", new Date().toISOString());

      // Check if this is an email confirmation link
      if (url.includes("auth/callback") || url.includes("confirm")) {
        console.log("📧 Email confirmation deep link detected");
        console.log("📧 Setting isEmailConfirmed to true");
        console.log("📧 Setting initialRoute to Login");
        console.log("📧 Setting isDeepLinkHandled to true");
        setIsEmailConfirmed(true);
        setInitialRoute("Login");
        setIsDeepLinkHandled(true);

        // Show success message
        console.log("📧 Showing success toast message");
        Toast.show({
          type: "success",
          text1: "Email Confirmed!",
          text2: "Your account has been verified. Please sign in.",
          position: "top",
          visibilityTime: 4000,
        });
      } else {
        console.log("🔗 Non-email confirmation deep link, ignoring");
      }
    };

    // Handle initial deep link if app was opened via deep link
    console.log("🔗 Checking for initial deep link URL");
    Linking.getInitialURL().then((url) => {
      if (url) {
        console.log("🔗 Initial deep link found:", url);
        handleDeepLink(url);
      } else {
        console.log("🔗 No initial deep link found");
      }
    });

    // Handle deep links while app is running
    console.log("🔗 Setting up deep link event listener");
    const subscription = Linking.addEventListener("url", ({ url }) => {
      console.log("🔗 Deep link event listener triggered with URL:", url);
      handleDeepLink(url);
    });

    return () => {
      console.log("🔗 Cleaning up deep link event listener");
      subscription?.remove();
    };
  }, []);

  useEffect(() => {
    // First, try to get the session from storage
    const initializeSession = async () => {
      try {
        console.log("🔍 Initializing session from storage...");
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error) {
          console.error("❌ Error getting session:", error);
          setInitialRoute("Login");
          return;
        }

        console.log("🔍 Initial session check:", session?.user?.email);
        console.log("🔍 Session exists:", !!session);
        console.log("🔍 Session expires at:", session?.expires_at);

        if (session) {
          // Supabase's autoRefreshToken will handle token refresh automatically
          // We just need to check if the session exists and is valid
          console.log("✅ Valid session found, checking user profile");
          console.log(
            "✅ Session will be auto-refreshed by Supabase if needed"
          );
          setSession(session);
          checkFirstTimeUser(session);
        } else {
          console.log(
            "🔍 No session found in storage, setting initial route to Login"
          );
          setInitialRoute("Login");
        }
      } catch (error) {
        console.error("❌ Error initializing session:", error);
        setInitialRoute("Login");
      }
    };

    initializeSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("🔐 Auth state change:", event, session?.user?.email);
      console.log("🔐 Auth event timestamp:", new Date().toISOString());
      console.log("🔐 Session details:", {
        hasSession: !!session,
        userId: session?.user?.id,
        email: session?.user?.email,
        emailConfirmed: session?.user?.email_confirmed_at,
        createdAt: session?.user?.created_at,
        expiresAt: session?.expires_at,
      });

      // Handle INITIAL_SESSION event - this fires when app starts and session is loaded
      if (event === "INITIAL_SESSION") {
        if (session) {
          console.log("✅ INITIAL_SESSION: Valid session found");
          setSession(session);
          checkFirstTimeUser(session);
        } else {
          console.log("⚠️ INITIAL_SESSION: No session found");
          setInitialRoute("Login");
        }
        return;
      }

      // Handle email confirmation specifically
      if (event === "SIGNED_IN" && session?.user?.email_confirmed_at) {
        console.log("✅ Email confirmed, user signed in:", session.user.email);
        console.log("✅ Setting isEmailConfirmed to true");
        console.log("✅ Setting session state");
        console.log("✅ Calling checkFirstTimeUser");
        setIsEmailConfirmed(true);
        setSession(session);
        // Don't set initial route yet - wait for profile check
        checkFirstTimeUser(session);
        return;
      }

      // Handle other auth events
      console.log("🔐 Setting session state for event:", event);
      setSession(session);
      if (session) {
        // Check if user is signed in but email not confirmed yet
        if (event === "SIGNED_IN" && !session?.user?.email_confirmed_at) {
          console.log(
            "🔐 User signed in but email not confirmed yet:",
            session.user.email
          );
          console.log("🔐 Setting initialRoute to Login (email not confirmed)");
          setInitialRoute("Login"); // Stay on login to show confirmation message
        } else {
          console.log(
            "🔐 User signed in and email confirmed, calling checkFirstTimeUser"
          );
          checkFirstTimeUser(session);
        }
      } else {
        console.log("🔐 No session, handling logout/initial state");
        // If user just confirmed email via deep link, redirect to Login
        if (isDeepLinkHandled || isEmailConfirmed) {
          console.log("📧 Email confirmed via deep link, redirecting to Login");
          console.log("📧 Resetting email confirmation flags");
          setInitialRoute("Login");
          setIsEmailConfirmed(false);
          setIsDeepLinkHandled(false);
        } else {
          console.log(
            "🔐 No deep link handling, setting initialRoute to Login"
          );
          setInitialRoute("Login");
        }
      }
    });

    return () => {
      console.log("🔐 Cleaning up auth state change subscription");
      subscription.unsubscribe();
    };
  }, [isEmailConfirmed, isDeepLinkHandled]);

  // Force re-check onboarding status when session changes
  useEffect(() => {
    console.log("🔄 Session change effect triggered");
    console.log("🔄 Session exists:", !!session);
    console.log("🔄 Session email:", session?.user?.email);
    if (session) {
      console.log("🔄 Calling checkFirstTimeUser due to session change");
      checkFirstTimeUser(session);
    } else {
      console.log("🔄 No session, skipping checkFirstTimeUser");
    }
  }, [session]);

  // Navigate to the correct screen after profile check
  useEffect(() => {
    if (isProfileChecked && session) {
      console.log("🧭 FINAL NAVIGATION DECISION:", initialRoute);
      console.log("🧭 Session exists:", !!session);
      console.log("🧭 Profile checked:", isProfileChecked);
      console.log(
        "🧭 About to render Stack.Navigator with initialRoute:",
        initialRoute
      );
    }
  }, [isProfileChecked, initialRoute, session]);

  // Log every time initialRoute changes
  useEffect(() => {
    console.log("🔄 INITIAL ROUTE CHANGED TO:", initialRoute);
  }, [initialRoute]);

  const fetchUserProfile = async (session: Session) => {
    console.log("👤 fetchUserProfile called for user:", session?.user?.email);
    if (session?.user) {
      try {
        console.log("👤 Fetching profile data from Supabase");
        const { data: profile, error } = await supabase
          .from("profiles")
          .select("first_name, last_name, avatar_url")
          .eq("id", session.user.id)
          .single();

        if (error) {
          console.log("👤 No profile found in fetchUserProfile:", error.code);
          console.log("👤 Error details:", error);
          // Don't treat this as an error - it's expected for first-time users
        } else if (profile) {
          console.log("👤 Profile found in fetchUserProfile:", profile);
          console.log("👤 Dispatching profile data to Redux store");
          // Store profile data in Redux
          dispatch(
            setProfile({
              firstName: profile.first_name,
              lastName: profile.last_name,
              avatarUrl: profile.avatar_url,
            })
          );
          console.log("👤 Profile data dispatched to Redux successfully");
        }
      } catch (error) {
        console.log(
          "👤 Error in fetchUserProfile (expected for first-time users):",
          error
        );
        console.log("👤 Error details:", error);
      }
    } else {
      console.log("👤 No session user, skipping fetchUserProfile");
    }
  };

  const checkFirstTimeUser = async (session: Session) => {
    console.log("🔍 checkFirstTimeUser called");
    console.log("🔍 Session exists:", !!session);
    console.log("🔍 User exists:", !!session?.user);
    console.log("🔍 isCheckingProfile:", isCheckingProfile);
    console.log("🔍 isProfileChecked:", isProfileChecked);

    if (session?.user && !isCheckingProfile && !isProfileChecked) {
      console.log("🔍 Starting profile check process");
      setIsCheckingProfile(true);
      console.log("🔍 Checking first time user for:", session.user.email);
      console.log("🔍 Session details:", {
        id: session.user.id,
        email: session.user.email,
        email_confirmed_at: session.user.email_confirmed_at,
        created_at: session.user.created_at,
      });

      try {
        console.log("🔍 Calling fetchUserProfile");
        await fetchUserProfile(session); // Ensure profile data is fetched/attempted

        console.log("🔍 Querying profiles table for onboarding status");
        const { data: profile, error } = await supabase
          .from("profiles")
          .select("hascompletedprofileupdate, hascompletedhomeonboarding")
          .eq("id", session.user.id)
          .single();

        console.log("📊 Profile check result:", { profile, error });
        console.log("📊 Profile data:", profile);
        console.log("📊 Error details:", error);

        // If no profile exists (first-time user), go to UpdateProfile
        if (error && error.code === "PGRST116") {
          console.log(
            "❌ No profile found - first-time user, going to UpdateProfile"
          );
          console.log("❌ Setting initialRoute to UpdateProfile");
          setInitialRoute("UpdateProfile");
        } else if (error) {
          console.error("❌ Error checking profile:", error);
          console.log(
            "❌ Setting initialRoute to UpdateProfile (error fallback)"
          );
          setInitialRoute("UpdateProfile"); // Default to UpdateProfile on other errors
        } else if (profile && !profile.hascompletedprofileupdate) {
          console.log(
            "❌ Profile update not completed, going to UpdateProfile"
          );
          console.log(
            "❌ Profile update status:",
            profile.hascompletedprofileupdate
          );
          console.log("❌ Setting initialRoute to UpdateProfile");
          setInitialRoute("UpdateProfile");
        } else if (profile && !profile.hascompletedhomeonboarding) {
          console.log("❌ Home onboarding not completed, going to Welcome");
          console.log(
            "❌ Home onboarding status:",
            profile.hascompletedhomeonboarding
          );
          console.log("❌ Setting initialRoute to Welcome");
          setInitialRoute("Welcome");
        } else {
          console.log("✅ All onboarding completed, going to Home");
          console.log(
            "✅ Profile update completed:",
            profile?.hascompletedprofileupdate
          );
          console.log(
            "✅ Home onboarding completed:",
            profile?.hascompletedhomeonboarding
          );
          console.log("✅ Setting initialRoute to Home");
          setInitialRoute("Home");
        }
      } catch (error) {
        console.error("💥 Error in checkFirstTimeUser:", error);
        console.log(
          "💥 Setting initialRoute to UpdateProfile (catch fallback)"
        );
        setInitialRoute("UpdateProfile"); // Default to UpdateProfile on error
      } finally {
        console.log("🔍 Profile check completed, setting flags");
        console.log("🔍 Setting isProfileChecked to true");
        console.log("🔍 Setting isCheckingProfile to false");
        setIsProfileChecked(true);
        setIsCheckingProfile(false);
      }
    } else if (isProfileChecked) {
      console.log("🔍 Profile already checked, skipping checkFirstTimeUser");
    } else if (isCheckingProfile) {
      console.log(
        "🔍 Profile check already in progress, skipping checkFirstTimeUser"
      );
    } else {
      console.log("🔍 No session or user, skipping checkFirstTimeUser");
    }
  };

  function UpdateProfileWrapper({ navigation }: any) {
    console.log("📝 UpdateProfileWrapper rendered");
    console.log("📝 Session exists:", !!session);
    if (!session) {
      console.log("📝 No session, returning null from UpdateProfileWrapper");
      return null;
    }
    console.log("📝 Rendering UpdateProfile component");
    return <UpdateProfile navigation={navigation} session={session} />;
  }

  function HomeOnboardingWrapper({ navigation }: any) {
    console.log("🏠 HomeOnboardingWrapper rendered");
    console.log("🏠 Session exists:", !!session);
    if (!session) {
      console.log("🏠 No session, returning null from HomeOnboardingWrapper");
      return null;
    }
    console.log("🏠 Rendering HomeOnboardingScreen component");
    return <HomeOnboardingScreen navigation={navigation} session={session} />;
  }

  console.log("🎬 Render decision check:");
  console.log("🎬 isSplashFinished:", isSplashFinished);
  console.log("🎬 isFontLoaded:", isFontLoaded);
  console.log("🎬 session exists:", !!session);
  console.log("🎬 isProfileChecked:", isProfileChecked);
  console.log(
    "🎬 Should show splash:",
    !isSplashFinished || !isFontLoaded || (session && !isProfileChecked)
  );

  if (!isSplashFinished || !isFontLoaded || (session && !isProfileChecked)) {
    console.log("🎬 Showing splash screen");
    return <SplashScreenComponent onFinish={handleSplashFinish} />;
  }

  console.log("🎬 Rendering main app with initialRoute:", initialRoute);

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
          key={initialRoute} // Force re-render when route changes
          initialRouteName={initialRoute}
          screenOptions={{ headerShown: false }}
        >
          {!session ? (
            <>
              {console.log("🔐 Rendering auth screens (no session)")}
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
              {console.log(
                "🔐 Rendering authenticated screens (session exists)"
              )}
              {console.log(
                "🔐 Initial route for authenticated user:",
                initialRoute
              )}
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
                component={DoctorProfileScreen as any}
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
              <Stack.Screen name="BlogRead" component={BlogRead as any} />
              <Stack.Screen
                name="UserUpdate"
                component={UserUpdate}
                initialParams={{ session: session }}
              />
              <Stack.Screen name="Products" component={ProductsScreen} />
              <Stack.Screen name="CartScreen" component={CartScreen} />
              <Stack.Screen name="WishlistScreen" component={WishlistScreen} />
              <Stack.Screen name="EventRead" component={EventRead as any} />
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
