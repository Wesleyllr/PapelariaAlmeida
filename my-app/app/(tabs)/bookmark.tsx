import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/CustomButton";
import { icons } from "@/constants";
import ItemBoxProduto from "@/components/ItemBoxProduto";
import { useGlobalContext } from "@/context/GlobalProvider";
import { getUserProducts } from "@/lib/appwrite";
import useAppwrite from "@/lib/useAppwrite";

const Bookmark = () => {
  const { user } = useGlobalContext();
  const { data: produtos, isLoading } = useAppwrite(() =>
    getUserProducts(user.$id)
  );

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
              onPress={() => Alert.alert("Produto clicado")}
            />
          )}
          keyExtractor={(item) => item.$id}
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
