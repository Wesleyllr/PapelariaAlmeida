import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  Button,
} from "react-native";
import { Icon } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/CustomButton";
import { icons } from "@/constants";
import ItemBoxProduto from "@/components/ItemBoxProduto";
import { useGlobalContext } from "@/context/GlobalProvider";
import { getUserProducts } from "@/lib/appwrite";
import useAppwrite from "@/lib/useAppwrite";
import { router } from "expo-router";

const Vender = () => {
  const { user } = useGlobalContext();
  const {
    data: produtos,
    isLoading,
    refetch,
  } = useAppwrite(() => getUserProducts(user.$id));

  const [refreshing, setRefreshing] = useState(false);
  const [total, setTotal] = useState(0);
  const [sortOption, setSortOption] = useState<"title" | "price">("title");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [sortedProdutos, setSortedProdutos] = useState(produtos);
  const [clickCounts, setClickCounts] = useState({});

  useEffect(() => {
    if (produtos) {
      sortItems(sortOption, sortDirection);
    }
  }, [produtos, sortOption, sortDirection]);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const handleProductPress = (id, valor) => {
    setTotal((prevTotal) => prevTotal + valor);
    setClickCounts((prevCounts) => ({
      ...prevCounts,
      [id]: (prevCounts[id] || 0) + 1,
    }));
  };

  const cobrar = async () => {
    // Implementação futura
    router.push("/resumovenda");
  };

  const limpar = async () => {
    setTotal(0);
    setClickCounts({});
  };

  const sortItems = (option: "title" | "price", direction: "asc" | "desc") => {
    const sorted = [...produtos].sort((a, b) => {
      if (option === "title") {
        return direction === "asc"
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      } else {
        return direction === "asc"
          ? parseFloat(a.valor) - parseFloat(b.valor)
          : parseFloat(b.valor) - parseFloat(a.valor);
      }
    });
    setSortedProdutos(sorted);
  };

  const handleSortOptionChange = (option: "title" | "price") => {
    if (sortOption === option) {
      setSortDirection((prevDirection) =>
        prevDirection === "asc" ? "desc" : "asc"
      );
    } else {
      setSortOption(option);
      setSortDirection("asc");
    }
  };

  return (
    <SafeAreaView className="bg-primary w-full h-full">
      <View className="w-full flex-row justify-center items-center">
        <TouchableOpacity
          className="mr-3 mt-3 w-[20%] h-[62px] rounded-xl bg-red-500 justify-center items-center"
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
      <View className="mt-2 w-full h-[2px] bg-gray-400"></View>
      <View className="mx-3 flex-row gap-2">
        <View className="w-16"></View>
        <View className="flex-1 flex-row justify-between">
          <Text className="flex-1 text-white align-middle text-center font-pregular text-lg">
            Produto
          </Text>
          <Icon
            color="#0CC"
            containerStyle={{}}
            disabledStyle={{}}
            iconProps={{}}
            iconStyle={{}}
            name="reorder"
            onPress={() => handleSortOptionChange("title")}
            size={30}
            type="material"
          />
        </View>
        <View className="w-28 flex-row justify-between">
          <Text className="flex-1 text-white align-middle text-center font-pregular text-lg">
            Valor
          </Text>
          <Icon
            color="#0CC"
            containerStyle={{}}
            disabledStyle={{}}
            iconProps={{}}
            iconStyle={{}}
            name="reorder"
            onPress={() => handleSortOptionChange("price")}
            size={30}
            type="material"
          />
        </View>
      </View>
      {isLoading ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : (
        <FlatList
          className="pt-2"
          data={sortedProdutos || []}
          renderItem={({ item }) => (
            <ItemBoxProduto
              imageSource={item.capa}
              title={item.title}
              price={item.valor}
              backgroundColor={item.colorback}
              onPress={() => handleProductPress(item.$id, item.valor)}
              clickCount={clickCounts[item.$id] || 0}
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

export default Vender;
