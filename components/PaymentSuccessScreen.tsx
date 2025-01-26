import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useTailwind } from "tailwind-rn";
import { NavigationProp } from "@react-navigation/native";
import ButtonComponent from "./ButtonComponent";

interface PaymentSuccessScreenProps {
  navigation: NavigationProp<any>;
}

const PaymentSuccessScreen: React.FC<PaymentSuccessScreenProps> = ({
  navigation,
}) => {
  const tailwind = useTailwind();

  return (
    <View style={tailwind("flex-1 justify-center items-center bg-white")}>
      <View style={styles.circle}>
        <Text style={styles.checkmark}>✓</Text>
      </View>
      <Text style={tailwind("text-2xl font-bold mt-4")}>Congratulations</Text>
      <Text style={tailwind("text-lg text-gray-600 mt-2")}>
        Your payment was successfully
      </Text>
      <View style={tailwind("mt-8 p-4 rounded mb-6")}>
        <ButtonComponent
          title="Back"
          onPress={() => navigation.goBack()}
          style={tailwind("mt-8 p-4 rounded mb-6")}
          color="bg-w3-green"
          textColor="#fff"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#E0F7E0",
    justifyContent: "center",
    alignItems: "center",
  },
  checkmark: {
    fontSize: 40,
    color: "#4CAF50",
  },
});

export default PaymentSuccessScreen;
