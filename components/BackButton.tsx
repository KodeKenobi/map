import { TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTailwind } from "tailwind-rn";

export default function BackButton({ navigation }: { navigation: any }) {
  const tailwind = useTailwind();
  return (
    <View style={tailwind("absolute left-4 mt-16")}>
      <TouchableOpacity
        style={tailwind("")}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>
    </View>
  );
}
