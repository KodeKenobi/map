import React from "react";
import { ScrollView, View } from "react-native";
import CoachingCardComponent from "./CoachingCardComponent";
import { useTailwind } from "tailwind-rn";

interface Service {
  title: string;
  description: string;
}

interface CoachingPicksCardsProps {
  cards: {
    imageUrl: any;
    title?: string;
    backgroundColor?: string;
    services?: Service[];
  }[];
}

const CoachingPicksCards: React.FC<CoachingPicksCardsProps> = ({ cards }) => {
  const tailwind = useTailwind();

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {cards.map((card, index) => (
        <View key={index} style={tailwind("mr-24")}>
          <CoachingCardComponent
            imageUrl={card.imageUrl}
            title={card?.title || ""}
            backgroundColor={
              card.backgroundColor ||
              (tailwind("bg-w3-purple-opacity").backgroundColor as string)
            }
            services={card.services}
          />
        </View>
      ))}
    </ScrollView>
  );
};

export default CoachingPicksCards;
