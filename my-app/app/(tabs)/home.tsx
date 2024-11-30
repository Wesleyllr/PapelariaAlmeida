import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { images } from "@/constants";
import { useGlobalContext } from "@/context/GlobalProvider";
import { getAllProdutosVendidos } from "@/lib/appwrite";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";

const Home = () => {
  const { user } = useGlobalContext();
  const [produtosOrdenados, setProdutosOrdenados] = useState([]); // Lista ordenada por faturamento
  const [produtoSelecionado, setProdutoSelecionado] = useState(null); // Produto selecionado pelo usuário

  const somaProdutosVendidos = async () => {
    const produtosVendidos = await getAllProdutosVendidos(user.$id);

    const quantidadesTotais = {};

    produtosVendidos.forEach((produto) => {
      const produtoId = produto.produtoId;
      const nomeProduto = produto.nomeproduto; // Supondo que o nome do produto está nesta propriedade
      const quantidade = produto.quantidade;
      const faturado = produto.quantidade * produto.valor; // Supondo que há uma propriedade `valor`

      if (quantidadesTotais[produtoId]) {
        quantidadesTotais[produtoId].quantidade += quantidade;
        quantidadesTotais[produtoId].faturado += faturado;
      } else {
        quantidadesTotais[produtoId] = {
          nomeProduto,
          quantidade,
          faturado,
        };
      }
    });

    // Ordena os produtos por faturamento em ordem decrescente
    const produtosOrdenadosArray = Object.values(quantidadesTotais).sort(
      (a, b) => b.faturado - a.faturado
    );

    // Atualiza o estado com a lista ordenada
    setProdutosOrdenados(produtosOrdenadosArray);

    // Define o produto mais faturado como selecionado por padrão
    setProdutoSelecionado(produtosOrdenadosArray[0]);
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <View className="py-6 px-4 flex-1 ">
        <View className="justify-between items-start flex-row">
          <View>
            <Text className="font-pmedium text-sm text-gray-100">
              Bem vindo
            </Text>
            <Text className="text-2xl font-psemibold text-white">
              {user?.username}
            </Text>
          </View>
          <View className="mt-1.5">
            <Image
              source={images.logopapelariasemtexto}
              className="w-14 h-14 mb-1"
              resizeMode="contain"
            />
          </View>
        </View>

        <CustomButton
          containerStyles="bg-white w-full h-16 mb-2"
          handlePress={somaProdutosVendidos}
          title="Buscar Produtos Vendidos"
        />

        {produtosOrdenados.length > 0 && (
          <>
            <FlatList
              data={produtosOrdenados}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  className="bg-gray-200 p-4 mb-1 rounded"
                  onPress={() => setProdutoSelecionado(item)}
                >
                  <Text className="text-black font-psemibold">
                    {index + 1}. {item.nomeProduto} - R${" "}
                    {item.faturado.toFixed(2)}
                  </Text>
                </TouchableOpacity>
              )}
            />

            {produtoSelecionado && (
              <View className="w-full h-32 mt-2 flex-row gap-2">
                <View className="flex-1 bg-green-600 rounded-t-lg">
                  <Text
                    className="h-18 font-psemibold text-xl text-center text-white rounded-t-lg"
                    numberOfLines={1}
                  >
                    {produtoSelecionado.nomeProduto}
                  </Text>
                  <View className="mb-1 w-full h-[1px] bg-gray-600"></View>

                  <Text
                    className="h-18 font-psemibold text-xl text-center text-white"
                    numberOfLines={1}
                  >
                    R$ {produtoSelecionado.faturado.toFixed(2)}
                  </Text>
                  <View className="mb-1 w-full h-[1px] bg-gray-600"></View>
                  <Text
                    className="h-16 font-psemibold text-xl text-center align-middle text-white"
                    numberOfLines={1}
                  >
                    {produtoSelecionado.quantidade} un
                  </Text>
                </View>
                {/* <View className="flex-1 bg-green-600 rounded-t-lg"></View>
                <View className="flex-1 bg-green-600 rounded-t-lg"></View> */}
              </View>
            )}
          </>
        )}
      </View>

      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};

export default Home;
