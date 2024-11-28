import React from "react";
import {
  TouchableOpacity,
  Image,
  Text,
  View,
  GestureResponderEvent,
} from "react-native";

interface ItemBoxProdutoProps {
  imageSource: string; // Caminho da imagem, ex.: "require(...)" ou URL
  title: string; // Título do produto
  price: string; // Valor do produto
  onPress?: (event: GestureResponderEvent) => void; // Função para clique
}

const ItemBoxProduto: React.FC<ItemBoxProdutoProps> = ({
  imageSource,
  title,
  price,
  onPress,
}) => {
  return (
    <View>
      <TouchableOpacity className="mx-3 h-16 flex-row gap-2" onPress={onPress}>
        <Image
          source={
            typeof imageSource === "string" ? { uri: imageSource } : imageSource
          }
          className="w-16 h-full bg-white rounded-sm"
          resizeMode="contain"
        />
        <Text
          className="flex-1 text-white text-center text-xl font-psemibold"
          numberOfLines={2}
        >
          {title}
        </Text>
        <Text className="w-28 text-white text-center text-xl font-psemibold align-middle">
          {price}
        </Text>
      </TouchableOpacity>
      <View className="mt-2 mb-2 w-full h-[2px] bg-gray-600"></View>
    </View>
  );
};

export default ItemBoxProduto;
