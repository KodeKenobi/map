import React, { useState } from "react";
import { View, TextInput, Button, Alert } from "react-native";
import { useTailwind } from "tailwind-rn";
import { useNavigation, NavigationProp } from "@react-navigation/native";

const BookingFormScreen: React.FC = () => {
  const tailwind = useTailwind();
  const navigation = useNavigation<NavigationProp<any>>();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    // Implement email sending logic here
    // For example, using an email API or a backend service
    Alert.alert("Booking Submitted", "Your booking request has been sent.");
    navigation.goBack();
  };

  return (
    <View style={tailwind("flex-1 p-4")}>
      <TextInput
        style={tailwind("border p-2 mb-4")}
        placeholder="Your Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={tailwind("border p-2 mb-4")}
        placeholder="Your Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={tailwind("border p-2 mb-4")}
        placeholder="Message"
        value={message}
        onChangeText={setMessage}
        multiline
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

export default BookingFormScreen;
