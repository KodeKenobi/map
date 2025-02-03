import React from "react";
import { ScrollView, View } from "react-native";
import LogoNav from "./LogoNav";
import { useTailwind } from "tailwind-rn";

// Add props to accept cards
interface LogoNavScrollProps {
  cards: {
    imageUrl: any;
    title?: string;
    backgroundColor?: string;
  }[];
}

const LogoNavScroll: React.FC<LogoNavScrollProps> = ({ cards }) => {
  const tailwind = useTailwind();

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {cards.map((card, index) => (
        <View style={tailwind("mr-24")}>
          <LogoNav
            key={index}
            imageUrl={card.imageUrl}
            title={card?.title || ""}
            backgroundColor={
              card.backgroundColor ||
              (tailwind("bg-w3-purple-opacity").backgroundColor as string)
            }
          />
        </View>
      ))}
    </ScrollView>
  );
};

export default LogoNavScroll;
