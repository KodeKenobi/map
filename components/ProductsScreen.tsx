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
  TouchableWithoutFeedback,
} from "react-native";
import { useTailwind } from "tailwind-rn";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import AppText from "./AppText";
import BackButton from "./BackButton"; // Assuming you have a BackButton component
import Ionicons from "react-native-vector-icons/Ionicons";

interface Product {
  id: string;
  imageUrl: any;
  price: string;
  title: string;
}

const products: Product[] = [
  // Vitamins
  {
    id: "1",
    imageUrl: require("../assets/images/vitamin-c.jpg"),
    price: "R10",
    title: "Vitamin C",
  },
  {
    id: "2",
    imageUrl: require("../assets/images/vitamin-d3.jpg"),
    price: "R20",
    title: "Vitamin D3",
  },
  {
    id: "3",
    imageUrl: require("../assets/images/vitamin-e.jpg"),
    price: "R30",
    title: "Vitamin E",
  },
  {
    id: "4",
    imageUrl: require("../assets/images/vitamin-k2.jpeg"),
    price: "R5",
    title: "Vitamin K2",
  },

  // Supplements
  {
    id: "5",
    imageUrl: require("../assets/images/omega-3-fish-oil.jpeg"),
    price: "R75",
    title: "Omega-3 Fish Oil",
  },
  {
    id: "6",
    imageUrl: require("../assets/images/probiotic-complex.jpg"),
    price: "R85",
    title: "Probiotic Complex",
  },
  {
    id: "7",
    imageUrl: require("../assets/images/whey-protein-powder.jpeg"),
    price: "R95",
    title: "Whey Protein Powder",
  },
  {
    id: "8",
    imageUrl: require("../assets/images/creatine-monohydrate.jpg"),
    price: "R100",
    title: "Creatine Monohydrate",
  },

  // Herbal Products
  {
    id: "9",
    imageUrl: require("../assets/images/echinacea.png"),
    price: "R170",
    title: "Echinacea",
  },
  {
    id: "10",
    imageUrl: require("../assets/images/ginseng.jpg"),
    price: "R180",
    title: "Ginseng",
  },
  {
    id: "11",
    imageUrl: require("../assets/images/turmeric-curcumin.jpg"),
    price: "R190",
    title: "Turmeric Curcumin",
  },
  {
    id: "12",
    imageUrl: require("../assets/images/ashwagandha.jpg"),
    price: "R200",
    title: "Ashwagandha",
  },

  // Minerals
  {
    id: "13",
    imageUrl: require("../assets/images/iron-supplement.jpg"),
    price: "R270",
    title: "Iron Supplement",
  },
  {
    id: "14",
    imageUrl: require("../assets/images/selenium.jpeg"),
    price: "R280",
    title: "Selenium",
  },
  {
    id: "15",
    imageUrl: require("../assets/images/potassium.jpeg"),
    price: "R290",
    title: "Potassium",
  },
  {
    id: "16",
    imageUrl: require("../assets/images/copper.jpg"),
    price: "R300",
    title: "Copper",
  },
];

const ProductsScreen: React.FC = () => {
  const tailwind = useTailwind();
  const navigation = useNavigation<NavigationProp<any>>();

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]);

  const handleHeartClick = (item: Product) => {
    if (wishlist.some((product) => product.id === item.id)) {
      handleRemoveFromWishlist(item);
    } else {
      setSelectedProduct(item);
      handleWishlistConfirm();
    }
  };

  const handleRemoveFromWishlist = (item: Product) => {
    setWishlist((prevWishlist) =>
      prevWishlist.filter((product) => product.id !== item.id)
    );
    alert(`${item.title} removed from wishlist!`);
  };

  const handleCartClick = (item: Product) => {
    if (cart.some((product) => product.id === item.id)) {
      handleRemoveFromCart(item);
    } else {
      setSelectedProduct(item);
      handleCartConfirm();
    }
  };

  const handleWishlistConfirm = () => {
    if (selectedProduct) {
      setWishlist((prevWishlist) => [...prevWishlist, selectedProduct]);
      alert(`${selectedProduct.title} added to wishlist!`);
    }
    setModalVisible(false);
  };

  const handleCartConfirm = () => {
    if (selectedProduct) {
      setCart((prevCart) => [...prevCart, selectedProduct]);
      alert(`${selectedProduct.title} added to cart!`);
    }
    setModalVisible(false);
  };

  const handleWishlistCancel = () => {
    setModalVisible(false);
  };

  const handleCartCancel = () => {
    setModalVisible(false);
  };

  const handleProductClick = (item: Product) => {
    setSelectedProduct(item);
    setModalVisible(true);
  };

  const handleRemoveFromCart = (item: Product) => {
    setCart((prevCart) => prevCart.filter((product) => product.id !== item.id));
    alert(`${item.title} removed from cart!`);
  };

  const renderProduct = ({ item }: { item: Product }) => (
    <View style={[{ marginRight: 16, width: 240 }]}>
      <View style={tailwind("bg-white rounded-lg shadow-lg p-2")}>
        <TouchableOpacity onPress={() => handleProductClick(item)}>
          <Image
            source={item.imageUrl}
            style={[tailwind("rounded-lg"), { height: 150, width: "100%" }]}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleProductClick(item)}>
          <Text
            style={tailwind("text-sm text-gray-600 w-full mt-2")}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {item.title}
          </Text>
        </TouchableOpacity>
        <View style={tailwind("p-2 flex-row justify-between items-center")}>
          <AppText style={tailwind("text-lg font-bold text-gray-800")}>
            {item.price}
          </AppText>
          <View style={tailwind("flex-row")}>
            <TouchableOpacity
              style={[tailwind("rounded-full p-2"), { marginLeft: 120 }]}
              onPress={() => handleHeartClick(item)}
            >
              <Ionicons
                name={
                  wishlist.some((product) => product.id === item.id)
                    ? "heart"
                    : "heart-outline"
                }
                size={20}
                color="#000"
              />
            </TouchableOpacity>
          </View>
          <View style={tailwind("flex-row")}>
            <TouchableOpacity
              style={[tailwind("rounded-full p-2"), { marginLeft: -6 }]}
              onPress={() => handleCartClick(item)}
            >
              <Ionicons
                name={
                  cart.some((product) => product.id === item.id)
                    ? "cart"
                    : "cart-outline"
                }
                size={20}
                color="#000"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={tailwind("flex-1")}>
      <ScrollView>
        <View style={tailwind("flex-1 justify-center items-center mt-10")}>
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
              Products
            </AppText>
            <View style={tailwind("w-10")} />
          </View>
        </View>

        <View style={tailwind("w-full p-4")}>
          <TextInput
            style={tailwind("w-full bg-gray-200 p-2 rounded-lg mb-4")}
            placeholder="Search products..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <View style={tailwind("flex-row justify-end mb-4")}>
            <TouchableOpacity
              style={[
                tailwind("bg-gray-300 p-2 rounded-lg flex-row items-center"),
                { marginRight: 20 },
              ]}
              onPress={() => navigation.navigate("CartScreen", { cart })}
            >
              <Ionicons name="cart-outline" size={24} color="#000" />
              <AppText style={tailwind("text-sm ml-8 mr-8")}>Cart</AppText>
            </TouchableOpacity>
            <TouchableOpacity
              style={tailwind(
                "bg-gray-300 p-2 rounded-lg flex-row items-center"
              )}
              onPress={() =>
                navigation.navigate("WishlistScreen", { wishlist })
              }
            >
              <Ionicons name="heart-outline" size={24} color="#000" />
              <AppText style={tailwind("text-sm ml-8 mr-8")}>Wishlist</AppText>
            </TouchableOpacity>
          </View>
        </View>

        <View style={tailwind("w-full p-4")}>
          <AppText style={tailwind("text-xl font-bold")}>Vitamins</AppText>
          <View style={tailwind("mt-4")}>
            <FlatList
              data={products.slice(0, 4)}
              renderItem={renderProduct}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>

          <AppText style={tailwind("text-xl font-bold mt-6")}>
            Supplements
          </AppText>
          <View style={tailwind("mt-4")}>
            <FlatList
              data={products.slice(4, 8)}
              renderItem={renderProduct}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>

          <AppText style={tailwind("text-xl font-bold mt-6")}>
            Herbal Products
          </AppText>
          <View style={tailwind("mt-4")}>
            <FlatList
              data={products.slice(8, 12)}
              renderItem={renderProduct}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>

          <AppText style={tailwind("text-xl font-bold mt-6")}>Minerals</AppText>
          <View style={tailwind("mt-4")}>
            <FlatList
              data={products.slice(12, 16)}
              renderItem={renderProduct}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
            <View
              style={tailwind(
                "flex-1 justify-center items-center bg-black bg-opacity-50"
              )}
            >
              <TouchableWithoutFeedback>
                <View style={tailwind("bg-white rounded-lg p-4 w-80 relative")}>
                  <Image
                    source={selectedProduct?.imageUrl}
                    style={{ height: 150, width: "100%", borderRadius: 8 }}
                    resizeMode="contain"
                  />
                  <Text style={tailwind("text-lg font-bold mt-2")}>
                    {selectedProduct?.title}
                  </Text>
                  <Text style={tailwind("text-md text-gray-600 mt-1")}>
                    {selectedProduct?.price}
                  </Text>

                  <Text style={tailwind("text-sm text-gray-500 mt-2")}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </Text>
                  <View style={tailwind("flex-row justify-between mt-4")}>
                    <TouchableOpacity
                      style={
                        cart.some(
                          (product) => product.id === selectedProduct?.id
                        )
                          ? tailwind("bg-red-500 p-2 rounded flex-1 mr-4")
                          : tailwind("bg-green-500 p-2 rounded flex-1 mr-4")
                      }
                      onPress={() => {
                        if (selectedProduct) {
                          if (
                            cart.some(
                              (product) => product.id === selectedProduct.id
                            )
                          ) {
                            handleRemoveFromCart(selectedProduct);
                          } else {
                            handleCartConfirm();
                          }
                        }
                      }}
                    >
                      <Text style={tailwind("text-white text-center")}>
                        {cart.some(
                          (product) => product.id === selectedProduct?.id
                        )
                          ? "Remove From Your Cart"
                          : "Add To Your Cart"}
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={
                        wishlist.some(
                          (product) => product.id === selectedProduct?.id
                        )
                          ? tailwind("bg-w3-gold-1 p-2 rounded flex-1 ml-6")
                          : tailwind("bg-w3-gold-1 p-2 rounded flex-1 ml-6")
                      }
                      onPress={() => {
                        if (selectedProduct) {
                          if (
                            wishlist.some(
                              (product) => product.id === selectedProduct.id
                            )
                          ) {
                            handleRemoveFromWishlist(selectedProduct);
                          } else {
                            handleWishlistConfirm();
                          }
                        }
                      }}
                    >
                      <Text style={tailwind("text-white text-center")}>
                        {wishlist.some(
                          (product) => product.id === selectedProduct?.id
                        )
                          ? "Remove From Your Wishlist"
                          : "Add To Your Wishlist"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    style={tailwind("mt-4 bg-blue-500 p-2 rounded")}
                    onPress={() => setModalVisible(false)}
                  >
                    <Text style={tailwind("text-black text-center")}>
                      Close
                    </Text>
                  </TouchableOpacity>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductsScreen;
