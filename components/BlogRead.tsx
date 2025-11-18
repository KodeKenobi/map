import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  TextInput,
} from "react-native";
import { RouteProp, NavigationProp } from "@react-navigation/native";
import { useTailwind } from "tailwind-rn";
import { Ionicons } from "@expo/vector-icons";
import BackButton from "./BackButton";
import { supabase } from "../lib/supabase";
import GreetingAvatar from "./GreetingAvatar";
import { LinearGradient } from "expo-linear-gradient";

type RootStackParamList = {
  BlogRead: {
    id?: number;
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
        id?: number;
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
  navigation: NavigationProp<any>;
}

type Comment = {
  content: string;
  user_id: string;
  users: {
    profiles: {
      first_name: string;
      last_name: string;
      avatar_url: string;
    };
  };
};

const BlogRead: React.FC<BlogReadProps> = ({ route, navigation }) => {
  const { title, subtitle, cta, imageUrl, description, tag } = route.params;
  const tailwind = useTailwind();
  const [imageError, setImageError] = useState(false);
  const [likes, setLikes] = useState(0);
  const [userLiked, setUserLiked] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [userName, setUserName] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [url, setUrl] = useState(null);
  const [isLoadingComments, setIsLoadingComments] = useState(true);

  const imageSource = React.useMemo(() => {
    if (typeof imageUrl === "string") {
      return { uri: imageUrl };
    }
    if (imageUrl?.uri) {
      return { uri: imageUrl.uri };
    }
    return imageUrl;
  }, [imageUrl]);

  const handleLike = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const newLikedState = !userLiked;

    try {
      if (newLikedState) {
        // Add like
        const { data: likeData, error: likeError } = await supabase
          .from("likes")
          .insert({
            post_id: route.params.id,
            user_id: user.id,
          });

        // Increment likes count in home_cards
        const { data: incrementData, error: incrementError } =
          await supabase.rpc("increment_likes", { row_id: route.params.id });

        setLikes((prev) => {
          return prev + 1;
        });
      } else {
        // Remove like
        const { data: unlikeData, error: unlikeError } = await supabase
          .from("likes")
          .delete()
          .eq("post_id", route.params.id)
          .eq("user_id", user.id);

        // Decrement likes count in home_cards
        const { data: decrementData, error: decrementError } =
          await supabase.rpc("decrement_likes", { row_id: route.params.id });

        setLikes((prev) => {
          return prev - 1;
        });
      }

      setUserLiked(newLikedState);
    } catch (error) {
      console.error("Error updating like:", error);
    }
  };

  const fetchUserProfile = async () => {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (user) {
      const { data, error } = await supabase
        .from("profiles")
        .select("first_name, last_name, avatar_url")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("Error fetching user profile:", error);
      } else {
        setUserName(`${data.first_name} ${data.last_name}`);
        setAvatarUrl(data.avatar_url);
      }
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (route.params.id) {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) return;
        // Fetch likes count and user's like status in parallel
        const [likesResponse, userLikeResponse] = await Promise.all([
          supabase
            .from("home_cards")
            .select("likes")
            .eq("id", route.params.id)
            .single(),
          supabase
            .from("likes")
            .select("*")
            .eq("post_id", route.params.id)
            .eq("user_id", user.id)
            .single(),
        ]);

        // Update likes count
        if (likesResponse.data) {
          setLikes(likesResponse.data.likes || 0);
        }

        // Update user's like status
        setUserLiked(!!userLikeResponse.data);

        // Fetch comments...
        setIsLoadingComments(true);
        const { data: commentsData } = await supabase
          .from("comments")
          .select(
            `
            content,
            user_id,
            first_name,
            last_name,
            avatar_url
          `
          )
          .eq("post_id", route.params.id)
          .order("created_at", { ascending: false });

        if (commentsData) {
          const formattedComments = commentsData.map((comment) => ({
            content: comment.content,
            user_id: comment.user_id,
            users: {
              profiles: {
                first_name: comment.first_name,
                last_name: comment.last_name,
                avatar_url: comment.avatar_url,
              },
            },
          })) as Comment[];

          setComments(formattedComments);
        }
        setIsLoadingComments(false);
      }
    };

    fetchData();
  }, [route.params.id]);

  const handleCommentSubmit = async () => {
    if (!comment.trim()) return;

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    try {
      // First get the user's profile
      const { data: profile } = await supabase
        .from("profiles")
        .select("first_name, last_name, avatar_url")
        .eq("id", user.id)
        .single();

      // Then insert comment with user's name
      const { data: newComment, error: commentError } = await supabase
        .from("comments")
        .insert({
          content: comment.trim(),
          user_id: user.id,
          post_id: route.params.id,
          first_name: profile?.first_name,
          last_name: profile?.last_name,
          avatar_url: profile?.avatar_url,
        })
        .select(
          `
          content,
          user_id,
          first_name,
          last_name,
          avatar_url
        `
        )
        .single();

      if (commentError) throw commentError;

      if (newComment) {
        const formattedComment = {
          content: newComment.content,
          user_id: newComment.user_id,
          users: {
            profiles: {
              first_name: newComment.first_name,
              last_name: newComment.last_name,
              avatar_url: newComment.avatar_url,
            },
          },
        };

        setComments((prevComments) => [formattedComment, ...prevComments]);
        setComment("");
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  const handleKeyPress = ({
    nativeEvent: { key },
  }: {
    nativeEvent: { key: string };
  }) => {
    if (key === "Enter") {
      handleCommentSubmit();
    }
  };

  useEffect(() => {
    if (url) downloadImage(url);
  }, [url]);

  async function downloadImage(path: string) {
    try {
      const { data, error } = await supabase.storage
        .from("avatars")
        .download(path);
      if (error) {
        throw error;
      }
      const url = URL.createObjectURL(data);
      setAvatarUrl(url);
    } catch (error: any) {}
  }

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
            <Text style={[tailwind(" mb-6 text-gray-800"), { lineHeight: 24 }]}>
              {description}
            </Text>
          )}

          {/* Comments Section */}
          <View style={tailwind("mt-0 border-t border-gray-300")}>
            <View style={tailwind("flex-row items-center justify-between")}>
              <View style={tailwind("flex-row items-center")}>
                <TouchableOpacity onPress={handleLike}>
                  <Ionicons
                    name={userLiked ? "heart" : "heart-outline"}
                    size={24}
                    color="#7C3AED"
                  />
                </TouchableOpacity>
                <Text style={tailwind("ml-16 text-gray-600")}>
                  {likes === 1 ? `${likes} Like` : `${likes} Likes`}
                </Text>
              </View>
            </View>
            <Text style={tailwind("mt-6 text-gray-800 font-bold text-md")}>
              Comments:
            </Text>
            {isLoadingComments ? (
              <View style={tailwind("flex-row items-center flex-1 mt-4")}>
                <Text>Loading comments...</Text>
              </View>
            ) : (
              comments.map((comment, index) => {
                return (
                  <View
                    key={index}
                    style={tailwind("mt-4 bg-gray-50 rounded-lg mb-8")}
                  >
                    <View style={tailwind("flex-row items-center")}>
                      {comment.users.profiles.avatar_url && (
                        <View style={tailwind("mr-2")}>
                          <GreetingAvatar
                            url={comment.users.profiles.avatar_url}
                            width={40}
                            height={40}
                          />
                        </View>
                      )}
                      <View style={tailwind("flex-1 ml-18")}>
                        <Text style={tailwind("font-bold")}>
                          {comment.users.profiles.first_name}{" "}
                          {comment.users.profiles.last_name}
                        </Text>
                        <Text style={tailwind("mt-1 text-gray-600")}>
                          {comment.content}
                        </Text>
                      </View>
                    </View>
                  </View>
                );
              })
            )}
            <View style={tailwind("mt-4 bg-gray-100 rounded-lg px-4 py-2")}>
              <View style={tailwind("flex-row items-center mt-6 mb-6")}>
                <TextInput
                  style={tailwind(
                    "border border-gray-300 rounded p-2 flex-1 rounded-lg bg-white"
                  )}
                  placeholder="Type your comment..."
                  value={comment}
                  onChangeText={setComment}
                  returnKeyType="done"
                  onSubmitEditing={handleCommentSubmit}
                  multiline={false}
                />
                <TouchableOpacity
                  style={tailwind("ml-2 p-2 bg-purple-600 rounded")}
                  onPress={handleCommentSubmit}
                >
                  <Text style={tailwind("text-wh font-bold")}>Send</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {avatarUrl && (
            <Image
              source={{ uri: avatarUrl }}
              style={tailwind("w-10 h-10 rounded-full")}
              accessibilityLabel="User Avatar"
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BlogRead;
