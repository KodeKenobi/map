import React from "react";
import { View } from "react-native";

interface PageBodyProps {
  children: React.ReactNode;
  className?: string;
}

const PageBody: React.FC<PageBodyProps> = ({ children, className = "" }) => {
  return (
    <View className={` ${className} p-4 mt-4`}>
      <View className="">{children}</View>
    </View>
  );
};

export default PageBody;
