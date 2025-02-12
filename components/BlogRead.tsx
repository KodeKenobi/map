import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import {
  useNavigation,
  RouteProp,
  NavigationProp,
} from "@react-navigation/native";
import { useTailwind } from "tailwind-rn";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackNavigationProp } from "@react-navigation/stack";
import BackButton from "./BackButton";
type RootStackParamList = {
  BlogRead: {
    title: string;
    subtitle: string;
    cta: string;
    imageUrl: any;
    description?: string;
    tag?: string;
  };
};

interface BlogReadProps {
  route: RouteProp<
    {
      params: {
        title: string;
        subtitle: string;
        cta: string;
        imageUrl: any;
        description?: string;
        tag?: string;
      };
    },
    "params"
  >;
  navigation: StackNavigationProp<any>;
}

const BlogRead: React.FC<BlogReadProps> = ({ route, navigation }) => {
  const { title, subtitle, cta, imageUrl, description, tag } = route.params;
  const tailwind = useTailwind();
  const [imageError, setImageError] = useState(false);

  const imageSource = React.useMemo(() => {
    if (typeof imageUrl === "string") {
      return { uri: imageUrl };
    }
    if (imageUrl?.uri) {
      return { uri: imageUrl.uri };
    }
    return imageUrl;
  }, [imageUrl]);

  console.log("Final image source:", imageSource);

  return (
    <SafeAreaView style={tailwind("flex-1 bg-white")}>
      <ScrollView>
        <View style={tailwind("flex-1 justify-center items-center mt-14")}>
          <View
            style={tailwind("flex-row items-center w-full p-4 justify-between")}
          >
            <BackButton navigation={navigation as NavigationProp<any>} />
            <Text style={tailwind("text-xl font-bold text-center")}>Blog</Text>
            <View style={tailwind("w-10")} />
          </View>
        </View>
        <View style={tailwind("p-4")}>
          {/* Main content */}
          {imageError ? (
            <View
              style={[
                tailwind(
                  "w-full h-64 rounded-lg mb-4 bg-gray-200 items-center justify-center"
                ),
              ]}
            >
              <Text>Failed to load image</Text>
            </View>
          ) : (
            <Image
              source={imageSource}
              style={[
                tailwind("w-full rounded-lg mb-4"),
                {
                  backgroundColor: "#f0f0f0",
                  height: 256,
                },
              ]}
              resizeMode="cover"
              onError={(error) => {
                console.log("Image loading error:", error.nativeEvent);
                console.log("Attempted image source:", imageSource);
                setImageError(true);
              }}
            />
          )}

          {tag && (
            <View style={tailwind("mb-2")}>
              <Text style={tailwind("text-sm uppercase text-gray-600")}>
                {tag}
              </Text>
            </View>
          )}

          <Text style={tailwind("text-2xl font-bold mb-2")}>{title}</Text>
          <Text style={tailwind("text-gray-600 mb-4")}>{subtitle}</Text>

          {description && (
            <Text
              style={[
                tailwind("text-base mb-6 text-gray-800"),
                { lineHeight: 24 },
              ]}
            >
              {description}
            </Text>
          )}

          <TouchableOpacity
            style={[
              tailwind("mt-6 p-4 rounded-lg"),
              { backgroundColor: "#7C3AED" },
            ]}
            onPress={() => {
              /* Handle CTA */
            }}
          >
            <Text style={tailwind("text-white text-center font-bold")}>
              {cta}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BlogRead;
