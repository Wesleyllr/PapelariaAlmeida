import { View, Text } from "react-native";
import React from "react";

const InfoBoxPedido = ({ title, qtdProduto, valorTotalProduto }) => {
  return (
    <View>
      <View className="flex-row h-10 gap-2">
        <View className="flex-1 h-10 flex-row items-center justify-between px-2">
          <Text
            className="mr-2 text-white text-lg font-pmedium text-wrap"
            numberOfLines={1}
          >
            {title}
          </Text>
          <Text
            className="text-gray-200 text-base font-pmedium align-middle"
            numberOfLines={1}
          >
            x {qtdProduto}
          </Text>
        </View>
        <Text
          className="text-white text-lg font-pmedium text-wrap align-middle flex-none px-2"
          numberOfLines={1}
        >
          {valorTotalProduto}
        </Text>
      </View>
      <View className="mb-2 w-full h-[1px] bg-gray-600"></View>
    </View>
  );
};

export default InfoBoxPedido;
