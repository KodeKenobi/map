import React from "react";
import { ScrollView } from "react-native";
import QuickAccessCardComponent from "@/components/QuickAccessCardComponent";
import { useTailwind } from "tailwind-rn";

// Add props to accept cards
interface HorizontalQuickAccessCardScrollProps {
  quickAccessCards: {
    iconUrl: any;
    title: string;
    backgroundColor?: string;
    iconBackgroundColor?: string;
  }[];
}

const HorizontalQuickAccessCardScroll: React.FC<
  HorizontalQuickAccessCardScrollProps
> = ({ quickAccessCards }) => {
  const tailwind = useTailwind();

  return (
    <ScrollView horizontal>
      {quickAccessCards.map((card, index) => (
        <QuickAccessCardComponent
          key={index}
          iconUrl={card.iconUrl}
          title={card.title}
          backgroundColor={
            card.backgroundColor ||
            (tailwind("bg-w3-purple-opacity").backgroundColor as string)
          }
          iconBackgroundColor={card.iconBackgroundColor}
        />
      ))}
    </ScrollView>
  );
};

export default HorizontalQuickAccessCardScroll;
