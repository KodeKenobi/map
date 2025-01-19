import { TouchableOpacity } from "react-native";
import { useTailwind } from "tailwind-rn";
import AppText from "./AppText";

export default function ButtonComponent({
  title,
  color,
  textColor,
  onPress,
}: {
  title: string;
  color: string;
  textColor?: string;
  onPress: () => void;
}) {
  const tailwind = useTailwind();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[tailwind(`w-full self-center p-4 rounded-full ${color}`)]}
    >
      <AppText
        style={{
          textAlign: "center",
          color: textColor || "#FFFFFF",
          fontSize: 16,
          fontWeight: "bold",
        }}
      >
        {title}
      </AppText>
    </TouchableOpacity>
  );
}
