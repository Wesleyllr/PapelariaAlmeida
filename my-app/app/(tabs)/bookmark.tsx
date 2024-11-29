import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/CustomButton";
import { icons } from "@/constants";
import ItemBoxProduto from "@/components/ItemBoxProduto";
import { useGlobalContext } from "@/context/GlobalProvider";
import { getUserProducts } from "@/lib/appwrite";
import useAppwrite from "@/lib/useAppwrite";

const Bookmark = () => {
  const { user } = useGlobalContext();
  const {
    data: produtos,
    isLoading,
    refetch,
  } = useAppwrite(() => getUserProducts(user.$id));

  // Estado de controle de recarregamento
  const [refreshing, setRefreshing] = useState(false);

  // Função que será chamada para atualizar a lista de produtos
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch(); // Chama a função de atualização de dados
    setRefreshing(false); // Termina o carregamento
  };
  const [total, setTotal] = useState(0);

  const handleProductPress = (valor) => {
    setTotal((prevTotal) => prevTotal + valor); // Soma o valor do produto ao total
  };

  const cobrar = async () => {
    // Implementação futura
  };

  const limpar = async () => {
    setTotal((prevTotal) => 0);
  };

  return (
    <SafeAreaView className="bg-primary w-full h-full">
      <View className="w-full flex-row justify-center items-center">
        <TouchableOpacity
          className="mr-3 mt-3 w-[20%] h-[62px]
          rounded-xl bg-red-500 justify-center items-center"
          onPress={limpar}
        >
          <Image
            source={icons.close}
            className="w-[30px] h-[30px]"
            resizeMode="contain"
          />
        </TouchableOpacity>
        <CustomButton
          title="COBRAR"
          valordoproduto={`R$ ${total.toFixed(2)}`}
          handlePress={cobrar}
          containerStyles="mt-3 w-[75%]"
        />
      </View>
      <View className="mt-2 mb-2 w-full h-[2px] bg-gray-400"></View>
      {isLoading ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : (
        <FlatList
          data={produtos || []}
          renderItem={({ item }) => (
            <ItemBoxProduto
              imageSource={item.capa}
              title={item.title}
              price={item.valor}
              backgroundColor={item.colorback} // Passa a cor de fundo
              onPress={() => handleProductPress(item.valor)}
            />
          )}
          keyExtractor={(item) => item.$id}
          ListEmptyComponent={() => (
            <Text className="text-white text-center mt-10">
              Nenhum produto encontrado.
            </Text>
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </SafeAreaView>
  );
};

export default Bookmark;
