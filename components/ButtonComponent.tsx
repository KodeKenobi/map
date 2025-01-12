import { TouchableOpacity, Text, StyleProp, ViewStyle } from "react-native";
import { useTailwind } from "tailwind-rn";

export default function ButtonComponent({
  title,
  color,
  onPress,
}: {
  title: string;
  color: string;
  onPress: () => void;
}) {
  const tailwind = useTailwind();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[tailwind(`w-full self-center p-4 rounded-full ${color}`)]}
    >
      <Text
        style={{
          textAlign: "center",
          color: "#FFFFFF",
          fontSize: 16,
          fontWeight: "bold",
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}
