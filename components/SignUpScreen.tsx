// import React, { useState } from "react";
// import { View, TextInput, Button, Text, StyleSheet } from "react-native";
// import { signUp } from "../app/(auth)/auth";

// const SignUpScreen = ({ navigation }: { navigation: any }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSignUp = async () => {
//     try {
//       await signUp(email, password);
//       alert("Sign up successful");
//       navigation.navigate("Login");
//     } catch (error) {
//       alert((error as Error).message);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <TextInput
//         style={styles.input}
//         placeholder="Email"
//         value={email}
//         onChangeText={setEmail}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Password"
//         secureTextEntry
//         value={password}
//         onChangeText={setPassword}
//       />
//       <Button title="Sign Up" onPress={handleSignUp} />
//       <Text onPress={() => navigation.navigate("Login")}>
//         Already have an account? Log In
//       </Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: "center", padding: 16 },
//   input: { borderBottomWidth: 1, marginBottom: 12, padding: 8 },
// });

// export default SignUpScreen;
