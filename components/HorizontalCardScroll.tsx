import React from "react";
import { ScrollView, View } from "react-native";
import HomeCardComponent from "./HomeCardComponent";
import { useTailwind } from "tailwind-rn";

// Add props to accept cards
interface HorizontalCardScrollProps {
  cards: {
    imageUrl: any;
    title: string;
    date: string;
    registrationText: string;
    backgroundColor?: string;
  }[];
}

const HorizontalCardScroll: React.FC<HorizontalCardScrollProps> = ({
  cards,
}) => {
  const tailwind = useTailwind();

  return (
    <ScrollView horizontal>
      {cards.map((card, index) => (
        <View style={tailwind("mr-24")}>
          <HomeCardComponent
            key={index}
            imageUrl={card.imageUrl}
            title={card.title}
            date={card.date}
            registrationText={card.registrationText}
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

export default HorizontalCardScroll;
