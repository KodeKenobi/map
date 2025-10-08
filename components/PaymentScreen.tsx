import { NavigationProp } from "@react-navigation/native";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useTailwind } from "tailwind-rn";
import BackButton from "./BackButton";
import AppText from "./AppText";
import ButtonComponent from "./ButtonComponent";
import Ionicons from "@expo/vector-icons/build/Ionicons";

const PaymentScreen = ({ navigation }: { navigation: NavigationProp<any> }) => {
  const tailwind = useTailwind();
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");

  return (
    <SafeAreaView style={tailwind("flex-1 bg-white")}>
      {/* Header */}
      <View
        style={tailwind(
          "flex-row items-center w-full p-4 justify-between mt-10"
        )}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={tailwind("text-xl font-bold text-center")}>Payment</Text>
        <View style={tailwind("w-6")} />
      </View>

      {/* Amount Display */}
      <View style={tailwind("bg-w3-green mx-4 mt-4 rounded-lg p-6")}>
        <Text style={tailwind("text-white text-4xl font-bold text-center")}>
          R1,220
        </Text>
      </View>

      {/* Payment Method Selection */}
      <View style={tailwind("px-4 py-4")}>
        <View style={tailwind("flex-row justify-between")}>
          <TouchableOpacity
            style={tailwind("bg-w3-green px-6 py-3 rounded-lg flex-1 mr-2")}
          >
            <Text style={tailwind("text-white font-semibold text-center")}>
              Card Payment
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tailwind("bg-gray-200 px-6 py-3 rounded-lg flex-1 ml-2")}
          >
            <Text style={tailwind("text-w3-green font-semibold text-center")}>
              Cash Payment
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Card Details Form */}
      <View style={tailwind("px-4")}>
        <Text style={tailwind("text-gray-500 font-semibold text-lg")}>
          Card Number
        </Text>
        <TextInput
          style={[styles.input, tailwind("mt-2")]}
          placeholder="1234 8896 1145 0896"
          placeholderTextColor="#ccc"
          value={cardNumber}
          onChangeText={setCardNumber}
        />

        <View style={tailwind("flex-row justify-between mt-4")}>
          <View style={tailwind("flex-1 mr-2")}>
            <Text style={tailwind("text-gray-500 font-semibold text-lg")}>
              Expiry Date
            </Text>
            <TextInput
              style={[styles.input, tailwind("mt-2")]}
              placeholder="10/02/2022"
              placeholderTextColor="#ccc"
              value={expiryDate}
              onChangeText={setExpiryDate}
            />
          </View>
          <View style={tailwind("flex-1 ml-2")}>
            <Text style={tailwind("text-gray-500 font-semibold text-lg")}>
              CVV
            </Text>
            <TextInput
              style={[styles.input, tailwind("mt-2")]}
              placeholder="204"
              placeholderTextColor="#ccc"
              value={cvv}
              onChangeText={setCvv}
            />
          </View>
        </View>

        <Text style={tailwind("text-gray-500 font-semibold text-lg mt-4")}>
          Name
        </Text>
        <TextInput
          style={[styles.input, tailwind("mt-2")]}
          placeholder="Lindiwe"
          placeholderTextColor="#ccc"
          value={name}
          onChangeText={setName}
        />

        <ButtonComponent
          title="Pay Now"
          onPress={() => navigation.navigate("PaymentSuccessScreen" as never)}
          style={tailwind("mt-8 py-4 rounded-lg")}
          color="#228564"
          textColor="#fff"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 2,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
});

export default PaymentScreen;
