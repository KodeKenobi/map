import React from "react";
import { ScrollView, View } from "react-native";
import HomeCardComponent from "./HomeCardComponent";
import { useTailwind } from "tailwind-rn";

interface HorizontalCardScrollProps {
  cards: {
    id: number;
    imageUrl: any;
    title: string;
    cta: string;
    subtitle: string;
    backgroundColor?: string;
    textColor?: string;
    description?: string;
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
            id={card.id}
            imageUrl={card.imageUrl}
            title={card.title}
            cta={card.cta}
            subtitle={card.subtitle}
            description={card.description}
            backgroundColor={card.backgroundColor}
            textColor={card.textColor}
          />
        </View>
      ))}
    </ScrollView>
  );
};

export default HorizontalCardScroll;
