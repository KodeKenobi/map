import React from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTailwind } from "tailwind-rn";

const SearchBar = () => {
  const tailwind = useTailwind();

  return (
    <View
      style={tailwind(
        "flex-row items-center bg-gray-200 rounded-full px-4 py-2 w-full mt-4"
      )}
    >
      {/* Search Icon */}
      <Ionicons name="search" size={20} color="gray" />

      {/* Text Input */}
      <TextInput
        placeholder="Search"
        placeholderTextColor="gray"
        style={{
          flex: 1, // Expand to take remaining space
          marginLeft: 10,
          fontSize: 16,
          color: "black",
        }}
      />

      {/* Voice Recording Icon */}
      <TouchableOpacity>
        <Ionicons name="mic" size={20} color="gray" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;
