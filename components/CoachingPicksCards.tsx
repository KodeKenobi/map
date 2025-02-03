import React from "react";
import { ScrollView, View } from "react-native";
import CoachingCardComponent from "./CoachingCardComponent";
import { useTailwind } from "tailwind-rn";

// Add props to accept cards
interface CoachingPicksCardsProps {
  cards: {
    imageUrl: any;
    title?: string;
    backgroundColor?: string;
  }[];
}

const CoachingPicksCards: React.FC<CoachingPicksCardsProps> = ({ cards }) => {
  const tailwind = useTailwind();

  return (
    <ScrollView horizontal>
      {cards.map((card, index) => (
        <View style={tailwind("mr-24")}>
          <CoachingCardComponent
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

export default CoachingPicksCards;
