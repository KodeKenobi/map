import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import AppText from "./AppText";

type AuthButtonProps = {
  title: string;
  onPress: () => void;
};

export default function AuthButton({ title, onPress }: AuthButtonProps) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <AppText style={styles.buttonText}>{title}</AppText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
