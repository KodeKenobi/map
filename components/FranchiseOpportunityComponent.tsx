import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { useTailwind } from "tailwind-rn";
import ButtonComponent from "./ButtonComponent";

const FranchiseOpportunityComponent = () => {
  const tailwind = useTailwind();

  return (
    <View
      style={tailwind(
        "bg-w3-gold-1-opacity p-4 rounded-lg flex-row items-center"
      )}
    >
      <View style={tailwind("flex-row items-center")}>
        <Image
          source={require("../assets/images/happy-woman.png")}
          style={{ width: 172, height: 228, marginLeft: -22, marginTop: -200 }}
          resizeMode="contain"
        />
      </View>

      <View style={tailwind("flex-1")}>
        <Text style={tailwind("text-md mb-4")}>
          Ready to take the first step toward owning your dream business?
          Explore our franchise opportunities today.
        </Text>
        <View style={tailwind("flex-col space-x-4")}>
          <ButtonComponent
            title="Get Started"
            onPress={() => {}}
            style={tailwind("bg-transparent rounded-full")}
            color="bg-w3-gold-4"
            textColor="#B77A03"
            borderColor="border-w3-gold-4"
            borderWidth={1}
            size="small"
          />
        </View>
        <View style={tailwind("mt-4")}>
          <ButtonComponent
            title="Consultation"
            onPress={() => {}}
            style={tailwind("bg-w3-gold-4 rounded-full")}
            color="bg-w3-gold-4"
            textColor="white"
            borderWidth={1}
            size="small"
          />
        </View>
      </View>
    </View>
  );
};

export default FranchiseOpportunityComponent;

const styles = StyleSheet.create({
  // Add any additional styles if needed
});
