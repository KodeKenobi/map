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

const PaymentScreen = ({ navigation }: { navigation: NavigationProp<any> }) => {
  const tailwind = useTailwind();
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");

  return (
    <SafeAreaView style={tailwind("flex-1 bg-w3-green")}>
      <View style={tailwind("flex-1 justify-center items-center mt-10")}>
        <View
          style={tailwind("flex-row items-center w-full p-4 justify-between")}
        >
          <BackButton navigation={navigation as NavigationProp<any>} />
          <View style={tailwind("flex-row items-center")}>
            <Text style={tailwind("text-white text-2xl font-bold text-center")}>
              Payment
            </Text>
          </View>
          <View style={tailwind("w-10")} />
        </View>
      </View>
      <View style={tailwind("flex-1 justify-center items-center p-4")}>
        <Text
          style={tailwind("text-white text-3xl font-bold text-center mt-4")}
        >
          R1,220
        </Text>
      </View>

      <View
        style={[
          tailwind("mt-8 bg-white p-4"),
          { borderTopLeftRadius: 20, borderTopRightRadius: 20, flexGrow: 0 },
        ]}
      >
        <View style={tailwind("flex-row justify-between")}>
          <TouchableOpacity style={tailwind("rounded-full p-4 w-48 h-48")}>
            <Text
              style={tailwind(
                "text-gray-800 rounded-full p-4 bg-w3-green font-semibold text-white"
              )}
            >
              Card Payment
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={tailwind("rounded-full p-4 w-48 h-48")}>
            <Text
              style={tailwind(
                "text-gray-800 rounded-full p-4 bg-w3-green font-semibold text-white"
              )}
            >
              Cash Payment
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={tailwind("text-gray-500 mt-4 font-semibold text-lg")}>
          Card Number
        </Text>
        <View style={tailwind("flex-row w-full mt-4")}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="1234 8896 1145 0896"
            placeholderTextColor="#ccc"
            value={cardNumber}
            onChangeText={setCardNumber}
          />
        </View>

        <View style={tailwind("flex-row justify-between")}>
          <View style={tailwind("flex-1 mr-24")}>
            <Text
              style={tailwind("text-gray-500 mt-4 font-semibold text-lg mb-4")}
            >
              Expiry Date
            </Text>
            <TextInput
              style={styles.input}
              placeholder="10/02/2022"
              placeholderTextColor="#ccc"
              value={expiryDate}
              onChangeText={setExpiryDate}
            />
          </View>
          <View style={tailwind("flex-1 ml-24")}>
            <Text
              style={tailwind("text-gray-500 mt-4 font-semibold text-lg mb-4")}
            >
              CVV
            </Text>
            <TextInput
              style={styles.input}
              placeholder="204"
              placeholderTextColor="#ccc"
              value={cvv}
              onChangeText={setCvv}
            />
          </View>
        </View>

        <Text style={tailwind("text-gray-500 mt-4 font-semibold text-lg mb-4")}>
          Name
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Lindiwe"
          placeholderTextColor="#ccc"
          value={name}
          onChangeText={setName}
        />
        <ButtonComponent
          title="Pay Now"
          onPress={() => navigation.navigate("PaymentSuccessScreen" as never)}
          style={tailwind("mt-8 p-4 rounded mb-6")}
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
