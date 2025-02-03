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
    textColor?: string;
  }[];
}

const HorizontalCardScroll: React.FC<HorizontalCardScrollProps> = ({
  cards,
}) => {
  const tailwind = useTailwind();
  const cardHeight = 320;

  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      {cards.map((card, index) => (
        <View key={index} style={[tailwind("mr-24"), { height: cardHeight }]}>
          <HomeCardComponent
            imageUrl={card.imageUrl}
            title={card.title}
            date={card.date}
            registrationText={card.registrationText}
            backgroundColor={card.backgroundColor}
            textColor={card.textColor}
          />
        </View>
      ))}
    </ScrollView>
  );
};

export default HorizontalCardScroll;
