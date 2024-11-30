import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons } from "@/constants";
import { useRoute } from "@react-navigation/native";
import InfoBoxPedido from "@/components/InfoBoxPedido";
import { router } from "expo-router";
import { ID } from "react-native-appwrite";
import { registrarVenda } from "@/lib/appwrite";
import { useGlobalContext } from "@/context/GlobalProvider";

const ResumoVenda = () => {
  const { user } = useGlobalContext();

  const route = useRoute();
  const { selectedProducts = [], total = 0, clickCounts = {} } = route.params; // Supondo que você passe o `user`

  const voltar = async () => {
    // Voltar para a tela anterior
    router.back();
  };

  // Função de cobrar
  const cobrar = async () => {
    const pedidoId = ID.unique(); // Gera um ID único para o pedido
    try {
      // Registra as vendas dos produtos selecionados
      for (const product of selectedProducts) {
        await registrarVenda(
          {
            id: product.$id,
            nome: product.title,
            quantidade: clickCounts[product.$id],
            preco: parseFloat(product.valor),
            userId: user.$id,
          },
          pedidoId
        );
      }

      Alert.alert("Sucesso", "Venda registrada com sucesso.");
    } catch (error) {
      Alert.alert("Erro", "Erro ao registrar a venda.");
    }
  };

  return (
    <SafeAreaView className="bg-primary w-full h-full">
      <View className="bg-gray-600 h-16 flex-row items-center">
        <TouchableOpacity onPress={voltar}>
          <Image
            source={icons.arrowBack}
            className="w-16 h-16"
            resizeMode="contain"
            tintColor="#FFFFFF"
          />
        </TouchableOpacity>
        <Text className="mr-4 font-pmedium text-2xl text-center text-white">
          Pedido
        </Text>
        <Text className="font-psemibold text-2xl text-center text-white">
          {selectedProducts.length}
        </Text>
      </View>
      <View className="mb-2 w-full h-[2px] bg-gray-400"></View>
      <FlatList
        data={selectedProducts}
        renderItem={({ item }) => {
          const quantidade = clickCounts[item.$id] || 0;
          return (
            <InfoBoxPedido
              title={item.title}
              qtdProduto={quantidade}
              valorTotalProduto={`R$ ${(item.valor * quantidade).toFixed(2)}`}
            />
          );
        }}
        keyExtractor={(item) => item.$id}
      />
      <TouchableOpacity
        className="mb-4 mx-4 w-full h-20 bg-[#00d807] justify-center"
        onPress={cobrar} // Ação ao pressionar o botão
      >
        <Text className="text-white text-2xl font-psemibold text-center">
          COBRAR - R$ {total.toFixed(2)} {/* Exibe o total ao lado do botão */}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ResumoVenda;
