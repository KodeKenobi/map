import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { useNavigation, NavigationProp } from "@react-navigation/native";
import { supabase } from "../lib/supabase";
import Greeting from "./Greeting";
import RecommendationsCard from "./RecommendationsCard";
import BottomNav from "./BottomNav";
import { useTailwind } from "tailwind-rn";
import HorizontalCardScroll from "./HorizontalCardScroll";
import HorizontalQuickAccessCardScroll from "./HorizontalQuickAccessCardScroll";
import AppText from "./AppText";

const cards = [
  {
    id: 1,
    imageUrl: require("../assets/images/vitamin-drip.png"),
    title: "MAP Wellness",
    subtitle: "QUEENPOWER",
    description:
      "This is all about guiding women through major life transitions, helping them ditch what's holding them back and step into their true potential. Think of it as a journey from surviving to thriving, where women can reclaim their power, trust their intuition, and live authentically. When women find MAPW3 (Wellness), they are often standing at a crossroads, job-business-relationship-life no longer fits, ready to release what no longer serves them uncertain how to step into what's next but something ancient telling them to wake up: we call this period – SOULS CALLING YOUR NAME…we see this phase as rupture, being emptied so truth can enter. Most women live below their full potential, limited by inner blocks that quietly shape their choices in business, career, and relationships. By uncovering and reframing these beliefs, MAPW3 helps free energy, creativity, and purpose. Wounds become Wisdom! MAPW3 exists to guide that transition from survival to thriving, from fear to freedom, from living by others' expectations to walking a soul-aligned path. This is where the old story ends, and the true self begins to lead. This is where you reclaim parts of yourself that were lost, you reclaim your gifts and your magic. At MAPW3, we hold space for women to trust their intuition, use their bodies as compasses, and treat every challenge as a guide. We walk beside them through uncertainty, helping them restore their sovereignty and create lives rooted in authenticity, wisdom, and wealth. The journey begins the moment you stop chasing the light and start walking as it.",
    cta: "Read More",
    backgroundColor: "rgba(34, 133, 100, 0.16)",
  },
  {
    id: 2,
    imageUrl: require("../assets/images/coaching.png"),
    title: "Map Wisdom",
    subtitle: "QUEENCRICLE",
    description:
      "This is a women's circle club that empowers women through connection and growth. They've got a bunch of cool stuff planned, like thought leader series, workshops, and masterclasses on wellness, wisdom, and wealth. It's all about creating a supportive community where women can share knowledge, experiences, and insights. QUEECIRCLE: Empowering Women Through Connection and Growth. QUEENCRICLE is a dynamic women's circle club that brings together like-minded individuals to learn, grow, and empower one another. Our mission is to create a supportive community where women can share knowledge, experiences, and insights on wellness, wisdom, and wealth. Key Features of the event annually in November: Thought Leader Series: Invite renowned experts in wellness, wisdom, and wealth to share their experiences and insights. Trend Showcases: Highlight new and innovative trends in wellness, wisdom, and wealth, providing attendees with cutting-edge knowledge and tools. Book and Podcast Launches: Provide a platform for women authors and podcasters to launch their work and connect with like-minded individuals. Panel Discussions: Host engaging and thought-provoking discussions on topics relevant to women's empowerment. Experiential Healing Modalities: Offer hands-on experiences with various healing modalities, allowing attendees to explore new ways to nurture their mind, body, and spirit. Annual Publication: The QUEENCRICLE Booklet: A powerful collection of empowering stories, tools, and insights from women who have overcome challenges and achieved success. Mentorship Program: Pair experienced women with those just starting out, providing guidance and support. Workshops and Masterclasses: Offer in-depth training sessions on specific topics, such as mindfulness, entrepreneurship, and financial literacy. Online Platform: Create a private online community where members can access exclusive content, connect with one another, and participate in discussions. Partnerships: Collaborate with like-minded businesses and organizations to amplify the impact of QUEENCRICLE and provide exclusive benefits to members. QUEENCRICLE is a vibrant community that will inspire, motivate, and empower women to reach their full potential.",
    cta: "Read More",
    backgroundColor: "rgba(255, 215, 0, 0.16)",
  },
  {
    id: 3,
    imageUrl: require("../assets/images/wellness-seminar.png"),
    title: "Map Wealth",
    subtitle: "QUEENPRENEUR",
    description:
      "This one's all about supporting women-led businesses in the wellness ecosystem. They're celebrating women-owned and managed businesses, and they've even got awards and recognition programs in place. It's all about building an ecosystem of support for women who are changing the game in wellness. These services seem to be all about empowering women to take control of their lives, build meaningful connections, and thrive in their personal and professional journeys. She builds. She grows. She changes the game. to build an ecosystem of support for women-led businesses that serve the well-being of their market. Focus: Celebrating women-owned and managed businesses in the wellness ecosystem. This includes products and services related to: Wellness Ecosystem Categories (entries Open annually in April 2026, Awards to be held annually in Augst 2026) Tourism Wellness: Focuses on travel and leisure activities promoting relaxation, rejuvenation, and overall well-being. Holistic Wellness: Encompasses physical, emotional, mental, and spiritual well-being, often incorporating alternative therapies. Corporate Wellness: Aims to improve employees' health, productivity, and job satisfaction through workplace initiatives. Digital Wellness: Explores the impact of technology on mental and physical health, promoting healthy digital habits. Community Wellness: Focuses on building healthy communities through social connections, support networks, and collective well-being. Education Wellness: Integrates wellness principles into educational settings, promoting students' overall well-being and academic success. Lifestyle Wellness: Encompasses various aspects of daily life, such as nutrition, physical activity, stress management, and self-care. Environmental Wellness: Focuses on the interconnectedness of human well-being and the natural environment. Financial Wellness: Aims to promote financial stability, security, and well-being. Social Wellness: Emphasizes building and maintaining healthy relationships, social connections, and community engagement. Spiritual Wellness: Explores an individual's values, purpose, and meaning in life, often incorporating mindfulness and meditation practices.",
    cta: "Read More",
    backgroundColor: "rgba(115, 69, 182, 0.16)",
  },
];

const quickAccessCards = [
  {
    iconUrl: require("../assets/images/heart-bit-icon-white.png"),
    title: "Explore Wellness Services",
    backgroundColor: "rgba(115, 69, 182, 0.16)",
    iconBackgroundColor: "black",
  },
  {
    iconUrl: require("../assets/images/light-bulb-white.png"),
    title: "Discover Coaching and Mindfulness",
    backgroundColor: "rgba(255, 215, 0, 0.16)",
    iconBackgroundColor: "black",
  },
];

const Home = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const [firstName, setFirstName] = useState<string | null>(null);
  const tailwind = useTailwind();

  console.log("📍 CURRENT SCREEN: Home");

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const {
          data: { user },
          error: authError,
        } = await supabase.auth.getUser();

        if (authError || !user) {
          console.log("No authenticated user");
          return;
        }

        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("first_name")
          .eq("id", user.id)
          .single();

        if (profileError) {
          console.error("Error fetching profile:", profileError);
          return;
        }

        if (profile) {
          setFirstName(profile.first_name);
        }
      } catch (error) {
        console.error("Error in getUserProfile:", error);
      }
    };

    getUserProfile();
  }, []);

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Logout error:", error);
        alert("An error occurred while logging out. Please try again.");
        return;
      }
      console.log("User logged out");
      navigation.navigate("Login");
    } catch (error) {
      console.error("Logout error:", error);
      alert("An error occurred while logging out. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={tailwind("mt-10")}>
        <Greeting
          userName={firstName ? `${firstName}` : ""}
          notificationCount={8}
        />
      </View>
      <ScrollView
        contentContainerStyle={[styles.scrollContainer, { paddingTop: 0 }]}
      >
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <HorizontalCardScroll cards={cards} />
        </ScrollView>
        <View style={[tailwind("mt-0 ml-4")]}>
          <AppText style={tailwind("text-lg font-bold")}>Quick Access</AppText>
        </View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <HorizontalQuickAccessCardScroll
            quickAccessCards={quickAccessCards}
            navigation={navigation}
          />
        </ScrollView>
        <View style={tailwind("mt-0 ml-4")}>
          <View style={[tailwind("mb-4")]}>
            <AppText style={tailwind("text-lg font-bold")}>
              Personalised Recommendations
            </AppText>
          </View>
          <RecommendationsCard
            iconUrl={require("../assets/images/wellness-seminar.png")}
            title="IV Drip for Boosting Immunity >"
            backgroundColor="rgba(115, 69, 182, 0.16)"
            iconBackgroundColor="black"
          />
        </View>
      </ScrollView>
      <BottomNav navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    padding: 12,
  },
});

export default Home;
