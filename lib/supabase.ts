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

export const eventsCards = async () => {
  const { data, error } = await supabase.from("event_cards").select("*");
};

export const getAllEventsCards = async () => {
  const { data, error } = await supabase.from("event_cards").select("*");

  // Log the data or error for debugging
  if (error) {
    console.error("Error fetching events cards:", error);
  } else {
    console.log("Fetched event cards:", data);
  }

  return data;
};

export const getComments = async (id: string) => {
  const { data, error } = await supabase
    .from("comments")
    .select("*")
    .eq("id", id);

  if (error) {
    console.error("Error fetching comments:", error);
    return null;
  }
  return data;
};

export const getAllComments = async () => {
  const { data, error } = await supabase.from("comments").select("*");
  return data;
  if (error) {
    console.error("Error fetching comments:", error);
    return null;
  }
  return data;
};

export const getLikes = async (id: string) => {
  const { data, error } = await supabase
    .from("home_cards")
    .select("likes")
    .eq("id", id);
};

export const getAllDoctors = async () => {
  const { data, error } = await supabase.from("doctors").select("*");

  if (error) {
    console.error("Error fetching doctors:", error);
    return [];
  }

  return data;
};

export const getImageUrl = (path: string) => {
  const baseUrl =
    "https://yfnseftemcxacgncqcck.supabase.co/storage/v1/object/public/images/";
  return `${baseUrl}${path}`;
};
