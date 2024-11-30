import React, { useState } from "react";
import {
  TouchableOpacity,
  Image,
  Text,
  View,
  GestureResponderEvent,
  ActivityIndicator,
} from "react-native";

interface ItemBoxProdutoProps {
  imageSource: string | null;
  title: string;
  price: string;
  onPress?: (event: GestureResponderEvent) => void;
  backgroundColor?: string;
  clickCount: number; // Adiciona a prop clickCount
}

const ItemBoxProduto: React.FC<ItemBoxProdutoProps> = ({
  imageSource,
  title,
  price,
  onPress,
  backgroundColor,
  clickCount,
}) => {
  const [loading, setLoading] = useState(true);

  const formattedPrice = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(Number(price));

  const priceWithSpace = formattedPrice.replace("R$", "R$ ");

  return (
    <View>
      <TouchableOpacity
        className="mx-3 h-16 flex-row gap-2 bg-black-100"
        onPress={onPress}
      >
        {imageSource ? (
          <View className="w-16 h-full bg-white rounded-sm">
            {loading && (
              <ActivityIndicator
                size="small"
                color="#0000ff"
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: [{ translateX: -10 }, { translateY: -10 }],
                }}
              />
            )}
            <Image
              source={{ uri: imageSource }}
              className="w-16 h-full rounded-sm"
              resizeMode="cover"
              onLoad={() => setLoading(false)}
              onError={() => setLoading(false)}
            />
          </View>
        ) : (
          <View
            className="w-16 h-full rounded-sm"
            style={{ backgroundColor: backgroundColor || "#ccc" }}
          />
        )}
        <View className="flex-1">
          {clickCount > 0 && (
            <View className="w-8 h-8 bg-white absolute rounded-full -translate-x-1 -translate-y-1">
              <Text className="flex-1 text-green-700 text-center text-xl font-psemibold align-middle">
                {clickCount}
              </Text>
            </View>
          )}
          <Text
            className="flex-1 text-white text-center text-xl font-psemibold"
            numberOfLines={2}
          >
            {title}
          </Text>
        </View>
        <Text className="w-28 text-white text-right text-xl font-psemibold align-middle">
          {priceWithSpace}
        </Text>
      </TouchableOpacity>
      <View className="mt-2 mb-2 w-full h-[2px] bg-gray-600"></View>
    </View>
  );
};

export default ItemBoxProduto;
