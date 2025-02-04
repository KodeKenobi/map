import { TouchableOpacity, View, StyleProp, ViewStyle } from "react-native";
import { useTailwind } from "tailwind-rn";
import AppText from "./AppText";

export default function ButtonComponent({
  title,
  color,
  textColor,
  onPress,
  icon,
  style,
  borderColor,
  borderWidth,
  size = "medium",
}: {
  title: string;
  color: string;
  textColor?: string;
  onPress: () => void;
  icon?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  borderColor?: string;
  borderWidth?: number;
  size?: "small" | "medium" | "large";
}) {
  const tailwind = useTailwind();

  const sizeStyles = {
    small: "p-2 text-sm",
    medium: "p-4 text-base",
    large: "p-6 text-lg",
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        tailwind(
          `w-full rounded-full ${color} items-center justify-center ${sizeStyles[size]}`
        ),
        style,
        {
          borderColor: borderColor || "transparent",
          borderWidth: borderWidth || 0,
        },
      ]}
    >
      <View style={tailwind("flex-row items-center justify-center w-full")}>
        {icon}
        <View style={tailwind("flex-1")}>
          <AppText
            style={{
              textAlign: "center",
              fontSize: 16,
              fontWeight: "bold",
              marginLeft: icon ? 5 : 0,
            }}
            fontColor={textColor}
          >
            {title}
          </AppText>
        </View>
      </View>
    </TouchableOpacity>
  );
}
