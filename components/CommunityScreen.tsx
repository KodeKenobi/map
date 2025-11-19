import React from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTailwind } from "tailwind-rn";
import WideHomeCard from "./WideHomeCard";
import { Ionicons } from "@expo/vector-icons";

const CommunityScreen = () => {
  const tailwind = useTailwind();
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={tailwind("flex-1 justify-center items-center mt-10")}>
          <View
            style={tailwind("flex-row items-center w-full p-4 justify-between")}
          >
            <View style={tailwind("bg-gray-200 rounded-full p-2")}>
              <TouchableOpacity
                style={tailwind("flex items-center justify-center")}
                onPress={() => {
                  if (navigation.canGoBack()) {
                    navigation.goBack();
                  } else {
                    alert("No previous screen to go back to.");
                  }
                }}
              >
                <Ionicons name="arrow-back" size={24} color="#000" />
              </TouchableOpacity>
            </View>
            <View style={tailwind("w-10")} />
          </View>
        </View>
        <View style={tailwind("p-4")}>
          <WideHomeCard
            id={2}
            imageUrl={require("../assets/images/coaching.png")}
            title="Map Wisdom"
            subtitle="QUEENCRICLE"
            description="This is a women's circle club that empowers women through connection and growth. They've got a bunch of cool stuff planned, like thought leader series, workshops, and masterclasses on wellness, wisdom, and wealth. It's all about creating a supportive community where women can share knowledge, experiences, and insights. QUEECIRCLE: Empowering Women Through Connection and Growth. QUEENCRICLE is a dynamic women's circle club that brings together like-minded individuals to learn, grow, and empower one another. Our mission is to create a supportive community where women can share knowledge, experiences, and insights on wellness, wisdom, and wealth. Key Features of the event annually in November: Thought Leader Series: Invite renowned experts in wellness, wisdom, and wealth to share their experiences and insights. Trend Showcases: Highlight new and innovative trends in wellness, wisdom, and wealth, providing attendees with cutting-edge knowledge and tools. Book and Podcast Launches: Provide a platform for women authors and podcasters to launch their work and connect with like-minded individuals. Panel Discussions: Host engaging and thought-provoking discussions on topics relevant to women's empowerment. Experiential Healing Modalities: Offer hands-on experiences with various healing modalities, allowing attendees to explore new ways to nurture their mind, body, and spirit. Annual Publication: The QUEENCRICLE Booklet: A powerful collection of empowering stories, tools, and insights from women who have overcome challenges and achieved success. Mentorship Program: Pair experienced women with those just starting out, providing guidance and support. Workshops and Masterclasses: Offer in-depth training sessions on specific topics, such as mindfulness, entrepreneurship, and financial literacy. Online Platform: Create a private online community where members can access exclusive content, connect with one another, and participate in discussions. Partnerships: Collaborate with like-minded businesses and organizations to amplify the impact of QUEENCRICLE and provide exclusive benefits to members. QUEENCRICLE is a vibrant community that will inspire, motivate, and empower women to reach their full potential."
            cta="Read More"
            backgroundColor="rgba(255, 215, 0, 0.16)"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContainer: {
    paddingBottom: 20,
  },
});

export default CommunityScreen;
