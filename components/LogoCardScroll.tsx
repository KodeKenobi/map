import React from "react";
import { ScrollView, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import LogoCard from "./LogoCard";

// Add props to accept cards
interface LogoCardScrollProps {
  cards: {
    imageUrl: any;
    title?: string;
    backgroundColor?: string;
  }[];
}

const LogoCardScroll: React.FC<LogoCardScrollProps> = ({ cards }) => {
  const tailwind = useTailwind();

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {cards.map((card, index) => (
        <View style={tailwind("mr-12 p-4")}>
          <LogoCard
            key={index}
            imageUrl={card.imageUrl}
            title={card?.title || ""}
            backgroundColor={
              card.backgroundColor ||
              (tailwind("bg-white").backgroundColor as string)
            }
          />
        </View>
      ))}
    </ScrollView>
  );
};

export default LogoCardScroll;
