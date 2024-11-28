import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/CustomButton";
import { icons } from "@/constants";
import ItemBoxProduto from "@/components/ItemBoxProduto";

const cobrar = async () => {};

const Bookmark = () => {
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
      <TouchableOpacity className="mx-3 h-16 flex-row border gap-2  border-secondary">
        <Image
          source={require("@/assets/images/papel.png")}
          className=" w-16 h-full "
          resizeMode="contain"
          //Será usado a imagem referente a ele do servido appwrite
        />
        <Text
          className="flex-1 text-white
            text-center text-xl font-psemibold"
          numberOfLines={2}
          //Será passado o Título/nome do produto
        >
          Cópia A4 colorida com recorte e platificadosdsdsdsd asdsdsdsdsa
        </Text>
        <Text
          className="w-28 text-white
          text-center text-xl font-psemibold align-middle"
          // Será passado o valor
        >
          R$ 1200,00
        </Text>
      </TouchableOpacity>
      <ItemBoxProduto
        imageSource={require("@/assets/images/folha-de-papel.png")}
        title="Foto 3x4"
        price="R$ 12,00"
        onPress={() => Alert.alert("Produto clicado")}
      />
      <ItemBoxProduto
        imageSource={require("@/assets/images/folha-de-papel.png")}
        title="Foto 3x4"
        price="R$ 12,00"
        onPress={() => Alert.alert("Produto clicado")}
      />
      <ItemBoxProduto
        imageSource={require("@/assets/images/folha-de-papel.png")}
        title="Foto 3x4"
        price="R$ 12,00"
        onPress={() => Alert.alert("Produto clicado")}
      />
    </SafeAreaView>
  );
};

export default Bookmark;
