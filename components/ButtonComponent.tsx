import { TouchableOpacity, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import AppText from "./AppText";

export default function ButtonComponent({
  title,
  color,
  textColor,
  onPress,
  icon,
}: {
  title: string;
  color: string;
  textColor?: string;
  onPress: () => void;
  icon?: React.ReactNode;
}) {
  const tailwind = useTailwind();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        tailwind(
          `w-full p-4 rounded-full ${color} items-center justify-center`
        ),
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
