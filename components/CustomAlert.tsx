import React from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

interface CustomAlertProps {
  visible: boolean;
  type: "success" | "warning" | "error" | "info";
  title: string;
  message: string;
  onClose: () => void;
  showCloseButton?: boolean;
  onAction?: () => void;
  actionText?: string;
  onCloseAction?: () => void; // New prop for custom close action
}

const { width } = Dimensions.get("window");

export default function CustomAlert({
  visible,
  type,
  title,
  message,
  onClose,
  showCloseButton = true,
  onAction,
  actionText,
  onCloseAction,
}: CustomAlertProps) {
  const getTypeConfig = () => {
    switch (type) {
      case "success":
        return {
          icon: "check-circle",
          iconColor: "#10B981",
          backgroundColor: "#F0FDF4",
          borderColor: "#10B981",
          titleColor: "#065F46",
        };
      case "warning":
        return {
          icon: "warning",
          iconColor: "#F59E0B",
          backgroundColor: "#FFFBEB",
          borderColor: "#F59E0B",
          titleColor: "#92400E",
        };
      case "error":
        return {
          icon: "error",
          iconColor: "#EF4444",
          backgroundColor: "#FEF2F2",
          borderColor: "#EF4444",
          titleColor: "#991B1B",
        };
      case "info":
        return {
          icon: "info",
          iconColor: "#3B82F6",
          backgroundColor: "#EFF6FF",
          borderColor: "#3B82F6",
          titleColor: "#1E40AF",
        };
      default:
        return {
          icon: "info",
          iconColor: "#3B82F6",
          backgroundColor: "#EFF6FF",
          borderColor: "#3B82F6",
          titleColor: "#1E40AF",
        };
    }
  };

  const config = getTypeConfig();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View
          style={[
            styles.container,
            {
              backgroundColor: config.backgroundColor,
              borderColor: config.borderColor,
            },
          ]}
        >
          <View style={styles.iconContainer}>
            <MaterialIcons
              name={config.icon}
              size={32}
              color={config.iconColor}
            />
          </View>

          <Text style={[styles.title, { color: config.titleColor }]}>
            {title}
          </Text>

          <Text style={styles.message}>{message}</Text>

          <View style={styles.buttonContainer}>
            {onAction && actionText && (
              <TouchableOpacity
                style={[
                  styles.button,
                  styles.actionButton,
                  { borderColor: config.iconColor },
                ]}
                onPress={onAction}
              >
                <Text style={[styles.buttonText, { color: config.iconColor }]}>
                  {actionText}
                </Text>
              </TouchableOpacity>
            )}
            {showCloseButton && (
              <TouchableOpacity
                style={[styles.button, { backgroundColor: config.iconColor }]}
                onPress={onCloseAction || onClose}
              >
                <Text style={styles.buttonText}>
                  {onAction && actionText ? "Cancel" : "Got it"}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  container: {
    width: width * 0.85,
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    borderWidth: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  iconContainer: {
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
  },
  message: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
    color: "#374151",
    marginBottom: 24,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 12,
    justifyContent: "center",
  },
  button: {
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 120,
  },
  actionButton: {
    backgroundColor: "transparent",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});
