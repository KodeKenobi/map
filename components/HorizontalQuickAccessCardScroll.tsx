import React from "react";
import { ScrollView } from "react-native";
import QuickAccessCardComponent from "@/components/QuickAccessCardComponent";
import { useTailwind } from "tailwind-rn";

interface HorizontalQuickAccessCardScrollProps {
  quickAccessCards: {
    iconUrl: any;
    title: string;
    backgroundColor?: string;
    iconBackgroundColor?: string;
  }[];
  navigation: any;
}

const HorizontalQuickAccessCardScroll: React.FC<
  HorizontalQuickAccessCardScrollProps
> = ({ quickAccessCards, navigation }) => {
  const tailwind = useTailwind();

  return (
    <ScrollView horizontal>
      {quickAccessCards.map((card, index) => (
        <QuickAccessCardComponent
          key={index}
          iconUrl={card.iconUrl}
          title={card.title}
          backgroundColor={card.backgroundColor}
          iconBackgroundColor={card.iconBackgroundColor}
          navigation={navigation}
        />
      ))}
    </ScrollView>
  );
};

export default HorizontalQuickAccessCardScroll;
