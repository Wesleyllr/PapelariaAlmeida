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
  // Formatando o preço com a moeda brasileira, incluindo o espaço após "R$"
  const formattedPrice = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(Number(price));

  // Substitui "R$" por "R$ " (com o espaço)
  const priceWithSpace = formattedPrice.replace("R$", "R$ ");

  return (
    <View>
      <TouchableOpacity
        className="mx-3 h-16 flex-row gap-2 bg-black-100"
        onPress={onPress}
      >
        <Image
          source={
            typeof imageSource === "string" ? { uri: imageSource } : imageSource
          }
          className="w-16 h-full bg-white rounded-sm"
          resizeMode="cover"
        />
        <Text
          className="flex-1 text-white text-center text-xl font-psemibold"
          numberOfLines={2}
        >
          {title}
        </Text>
        <Text className="w-28 text-white text-justify text-xl font-psemibold align-middle">
          {priceWithSpace}
        </Text>
      </TouchableOpacity>
      <View className="mt-2 mb-2 w-full h-[2px] bg-gray-600"></View>
    </View>
  );
};

export default ItemBoxProduto;
