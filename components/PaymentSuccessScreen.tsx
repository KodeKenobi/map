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
    <View style={tailwind("flex-1 justify-center items-center bg-white px-4")}>
      <View style={styles.circle}>
        <Text style={styles.checkmark}>✓</Text>
      </View>
      <Text style={tailwind("text-3xl font-bold mt-6 text-w3-green")}>
        Congratulations
      </Text>
      <Text style={tailwind("text-lg text-gray-600 mt-2 text-center")}>
        Your payment was successfully
      </Text>
      <View style={tailwind("w-full mt-8")}>
        <ButtonComponent
          title="Back"
          onPress={() => navigation.goBack()}
          style={tailwind("py-4 rounded-lg")}
          color="#228564"
          textColor="#fff"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  circle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#228564",
    justifyContent: "center",
    alignItems: "center",
  },
  checkmark: {
    fontSize: 50,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default PaymentSuccessScreen;
