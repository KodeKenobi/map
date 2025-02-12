import { createClient } from "@supabase/supabase-js";
import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Get your Supabase URL and anon key from your Supabase project settings
const supabaseUrl = "https://yfnseftemcxacgncqcck.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlmbnNlZnRlbWN4YWNnbmNxY2NrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg3Njc1MzUsImV4cCI6MjA1NDM0MzUzNX0.yjq-ea6J95xJAbg7YGv4pOOC0nhuVMDiOMUGyNsHaVc";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

export const getAllProfiles = async () => {
  const { data, error } = await supabase
    .from("profiles") // Assuming 'profiles' is the name of your table
    .select("*");

  if (error) {
    console.error("Error fetching profiles:", error);
    return null; // or handle the error as needed
  }

  return data;
};

export const getProfileByEmail = async (email: string) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("email", email);
};

export const updateProfile = async (id: string, profileData: any) => {
  const { data, error } = await supabase
    .from("profiles")
    .update(profileData)
    .eq("id", id);
};

export const homeCards = async () => {
  const { data, error } = await supabase.from("home_cards").select("*");
};

export const getAllHomeCards = async () => {
  const { data, error } = await supabase.from("home_cards").select("*");
  return data;
};
