import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/CustomButton";
import { icons } from "@/constants";
import ItemBoxProduto from "@/components/ItemBoxProduto";
import { getUserProducts } from "@/lib/appwrite";
import useAppwrite from "@/lib/useAppwrite";
import { useGlobalContext } from "@/context/GlobalProvider";

const Bookmark = () => {
  const { user } = useGlobalContext();
  const [loading, setLoading] = useState(true);
  const { data: produtos, error } = useAppwrite(() =>
    getUserProducts(user.$id)
  );

  useEffect(() => {
    if (produtos || error) {
      setLoading(false);
    }
  }, [produtos, error]);

  const cobrar = async () => {
    // Implementação futura
  };

  return (
    <SafeAreaView className="bg-primary w-full h-full">
      <View className="w-full flex-row justify-center items-center">
        <TouchableOpacity
          className="mr-3 mt-3 w-[20%] h-[62px]
          rounded-xl bg-red-500 justify-center items-center"
        >
          <Image
            source={icons.close}
            className="w-[30px] h-[30px]"
            resizeMode="contain"
          />
        </TouchableOpacity>
        <CustomButton
          title="COBRAR"
          handlePress={cobrar}
          containerStyles="mt-3 w-[75%]"
        />
      </View>
      <View className="mt-2 mb-2 w-full h-[2px] bg-gray-400"></View>
      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#ffffff" />
        </View>
      ) : (
        <FlatList
          data={produtos || []}
          renderItem={({ item }) => (
            <ItemBoxProduto
              imageSource={item.capa}
              title={item.title}
              price={item.valor}
              onPress={() => Alert.alert("Produto clicado")}
            />
          )}
          keyExtractor={(item) => item.id || item.$id} // Use uma chave única
          ListEmptyComponent={() => (
            <Text className="text-white text-center mt-10">
              Nenhum produto encontrado.
            </Text>
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default Bookmark;
