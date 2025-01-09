import { TouchableOpacity, Text } from "react-native";

export default function ButtonComponent({
  title,
  onPress,
}: {
  title: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: "#7345B6",
        width: "90%",
        alignSelf: "center",
        padding: 15,
        borderRadius: 40,
        marginTop: 80,
      }}
    >
      <Text style={{ textAlign: "center", color: "#FFFFFF" }}>{title}</Text>
    </TouchableOpacity>
  );
}
