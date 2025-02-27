import React, { useState } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  ScrollView,
  Text,
  Modal,
  Button,
  TextInput,
} from "react-native";
import { useTailwind } from "tailwind-rn";
import {
  useNavigation,
  NavigationProp,
  useRoute,
} from "@react-navigation/native";
import AppText from "./AppText";
import Ionicons from "react-native-vector-icons/Ionicons";

interface Product {
  id: string;
  imageUrl: any;
  price: string;
  title: string;
}

const CartScreen: React.FC = () => {
  const tailwind = useTailwind();
  const route = useRoute();
  const { cart } = route.params as { cart: Product[] };
  const navigation = useNavigation<NavigationProp<any>>();

  const renderProduct = ({ item }: { item: Product }) => (
    <View style={tailwind("flex-col w-1/2 p-2")}>
      <View style={tailwind("bg-white rounded-lg shadow-lg p-2")}>
        <Image
          source={item.imageUrl}
          style={[tailwind("rounded-lg"), { height: 150, width: "100%" }]}
          resizeMode="cover"
        />
        <Text
          style={tailwind("text-sm text-gray-600 w-full mt-2")}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {item.title}
        </Text>
        <View style={tailwind("p-2 flex-row justify-between items-center")}>
          <AppText style={tailwind("text-lg font-bold text-gray-800")}>
            {item.price}
          </AppText>
          <TouchableOpacity
            style={tailwind("rounded-full p-2")}
            onPress={() => {
              // Logic to remove from wishlist can be added here
            }}
          >
            <Ionicons name="trash-outline" size={20} color="#000" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={tailwind("flex-1")}>
      <ScrollView>
        <View
          style={tailwind("flex flex-row justify-center items-center mt-10")}
        >
          <View
            style={tailwind("flex-row items-center w-full p-4 justify-between")}
          >
            <View style={tailwind("bg-gray-200 rounded-full p-2")}>
              <TouchableOpacity
                style={tailwind("flex items-center justify-center")}
                onPress={() => {
                  if (navigation.canGoBack()) {
                    navigation.goBack();
                  } else {
                    alert("No previous screen to go back to.");
                  }
                }}
              >
                <Ionicons name="arrow-back" size={24} color="#000" />
              </TouchableOpacity>
            </View>
            <AppText style={tailwind("text-xl font-bold text-center")}>
              Cart
            </AppText>
            <View style={tailwind("w-10")} />
          </View>
        </View>
        <FlatList
          data={cart}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id}
          numColumns={2}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={tailwind("p-4")}
        />
        {cart.length === 0 && (
          <View style={tailwind("flex-1 justify-center items-center mt-10")}>
            <Text style={tailwind("text-lg text-gray-600")}>
              Your cart is empty.
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default CartScreen;
