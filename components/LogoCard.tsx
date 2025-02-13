import React from "react";
import { View, Image, ScrollView } from "react-native";
import AppText from "./AppText";
import { useTailwind } from "tailwind-rn";
import ButtonComponent from "./ButtonComponent";

interface LogoCardProps {
  imageUrl: any;
  title?: string;
  backgroundColor?: string;
}

const LogoCard: React.FC<LogoCardProps> = ({
  imageUrl,
  title,
  backgroundColor,
}) => {
  const tailwind = useTailwind();

  return (
    <ScrollView horizontal>
      <View
        style={[
          tailwind("p-4 rounded-lg mr-4 border-2"),
          {
            backgroundColor: backgroundColor || "",
            width: 260,
            borderColor: "#E5E7EB",
          },
        ]}
      >
        <Image
          source={imageUrl}
          style={tailwind("w-32 h-32 rounded-lg mb-3 mx-auto")}
          resizeMode="contain"
        />

        {title && (
          <View style={tailwind("space-y-1")}>
            <AppText
              style={tailwind("text-sm font-bold text-center mb-2")}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {title}
            </AppText>
          </View>
        )}
        <View style={tailwind("flex-row justify-center gap-4")}>
          <ButtonComponent
            title="Learn More About Kwani"
            onPress={() => console.log("Learn More")}
            color="bg-white"
            borderColor="#000"
            borderWidth={1}
            textColor="text-white"
          />
        </View>
        <View style={tailwind("flex-row justify-center gap-4 mt-4 mb-4")}>
          <ButtonComponent
            title="Learn More"
            onPress={() => console.log("Learn More")}
            color="#093100"
            textColor="white"
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default LogoCard;
