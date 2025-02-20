import React, { useState } from "react";
import { View, StyleSheet, ScrollView, SafeAreaView, Text } from "react-native";
import { useTailwind } from "tailwind-rn";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import ButtonComponent from "./ButtonComponent";
import BackButton from "./BackButton";
import WealthNavMenu from "./WealthNavMenu";
import LogoCardScroll from "./LogoCardScroll";
import FranchiseOpportunityComponent from "./FranchiseOpportunityComponent";

export default function BrandsComponent() {
  const navigation = useNavigation();
  const tailwind = useTailwind();

  const cards = [
    {
      imageUrl: require("../assets/images/kwani-transparent.png"),
    },
    { imageUrl: require("../assets/images/bee-ing-transparent.png") },
  ];

  return (
    <SafeAreaView style={tailwind("flex-1")}>
      <ScrollView>
        <View style={tailwind("flex-1 justify-center items-center mt-14")}>
          <View
            style={tailwind("flex-row items-center w-full p-4 justify-between")}
          >
            <BackButton navigation={navigation as NavigationProp<any>} />
            <Text style={tailwind("text-xl font-bold text-center")}>
              Discover Our Unique Brands
            </Text>
            <View style={tailwind("w-10")} />
          </View>
        </View>
        <View style={tailwind("mb-4 p-4 mt-0")}>
          <WealthNavMenu />
        </View>
        <View style={tailwind("mt-0 mb-8")}>
          <LogoCardScroll cards={cards} />
        </View>
        <View style={tailwind("mt-16 p-4 mb-8")}>
          <FranchiseOpportunityComponent />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
