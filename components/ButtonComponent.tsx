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
  disabled,
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
  disabled?: boolean;
}) {
  const tailwind = useTailwind();

  const handlePress = () => {
    console.log("🔘 Button pressed:", title);
    console.log("🔘 Button disabled:", disabled);
    console.log("🔘 Button timestamp:", new Date().toISOString());
    if (!disabled) {
      console.log("🔘 Executing button onPress function");
      onPress();
    } else {
      console.log("🔘 Button is disabled, ignoring press");
    }
  };

  const sizeStyles = {
    small: "p-2 text-sm",
    medium: "p-4 text-base w-full",
    large: "p-6 text-lg w-full",
  };

  return (
    <TouchableOpacity
      style={[
        { backgroundColor: color, padding: 15 },
        tailwind("rounded-full"),
        style,
        borderColor ? { borderColor, borderWidth } : {},
        tailwind(sizeStyles[size]),
        disabled && { opacity: 0.5 },
      ]}
      onPress={handlePress}
      disabled={disabled}
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
