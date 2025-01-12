import React, { useState } from "react";
import { Text, TextInput, View, StyleSheet } from "react-native";
import AppText from "./AppText";
import { Ionicons } from "@expo/vector-icons";
import { useTailwind } from "tailwind-rn";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ButtonComponent from "./ButtonComponent";

export default function ForgotPassword() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigation = useNavigation();
  const tailwind = useTailwind();

  const handleResetPassword = () => {
    console.log("Reset Password");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={tailwind("absolute left-4 top-4")}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>
      <AppText
        style={tailwind(
          "text-2xl font-bold mb-2 mt-2 text-gray-800 text-center"
        )}
      >
        Forgot Password
      </AppText>
      <AppText style={tailwind("text-center mt-2 mb-8 text-gray-800")}>
        Please enter your phone number OR email address to reset your password
      </AppText>
      <View className="flex-1 justify-center items-center mt-8 mb-8">
        <TextInput
          style={styles.input}
          placeholder="Enter your phone number"
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
      </View>
      <View style={{ marginTop: 50 }}>
        <ButtonComponent
          title="Reset Password"
          color="bg-w3-gold-1"
          textColor="#000"
          onPress={handleResetPassword}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
});

// class ForgotPassword extends Component {

//   render() {
//     return (
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <Text>Forgot Password Screen</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter your phone number"
//           keyboardType="phone-pad"
//           value={phoneNumber}
//           onChangeText={setPhoneNumber}
//         />
//       </View>
//     );
//   }
// }

// export default ForgotPassword;
