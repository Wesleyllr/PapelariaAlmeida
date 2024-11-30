import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons } from "@/constants";
import { router } from "expo-router";
import InfoBoxPedido from "@/components/InfoBoxPedido";

const ResumoVenda = () => {
  const voltar = async () => {
    // Implementação futura
    router.back();
  };

  return (
    <SafeAreaView className="bg-primary w-full h-full">
      <View className=" bg-gray-600 h-16 flex-row ">
        <TouchableOpacity onPress={voltar}>
          <Image
            source={icons.arrowBack}
            className="w-16 h-16"
            resizeMode="contain"
            tintColor="#FFFFFF"
          />
        </TouchableOpacity>
        <Text className="mr-4 font-pmedium text-2xl align-middle text-center text-white">
          Pedido
        </Text>
        <Text className="font-psemibold text-2xl align-middle text-center text-white">
          4
        </Text>
      </View>
      <View className="mb-2 w-full h-[2px] bg-gray-400"></View>
      <View className="w-full">
        <InfoBoxPedido
          title="Papel A4 colorido plastificado com 2 bordas cortadas"
          qtdProduto="99"
          valorTotalProduto="R$10000,00"
        />
      </View>
      <Text>asdsadsd</Text>
    </SafeAreaView>
  );
};

export default ResumoVenda;
