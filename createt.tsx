import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "@/components/FormField";
import { icons } from "@/constants";
import CustomButton from "@/components/CustomButton";
import * as DocumentPicker from "expo-document-picker";
import { useGlobalContext } from "@/context/GlobalProvider";
import { router } from "expo-router";
import { createProduto } from "@/lib/appwrite";
import ColorSelector from "@/components/ColorSelector";

const Create = () => {
  const { user } = useGlobalContext();
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    capa: null,
    valor: "",
  });
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const openPicker = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: ["image/png", "image/jpg", "image/jpeg"],
    });

    if (!result.canceled) {
      setForm({
        ...form,
        capa: result.assets[0],
      });
      setSelectedColor(null); // Redefine a cor selecionada
    }
  };

  const submit = async () => {
    if (form.valor === "" || form.title === "" || !form.capa) {
      return Alert.alert("Preencha todos os campos.");
    }

    setUploading(true);

    try {
      const floatValor = parseFloat(form.valor);
      if (isNaN(floatValor)) {
        throw new Error("O valor deve ser um número válido.");
      }

      await createProduto({
        ...form,
        valor: floatValor,
        userId: user.$id,
      });

      Alert.alert("Sucesso", "Produto Criado");
      router.push("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setForm({
        title: "",
        capa: null,
        valor: "",
      });
      setUploading(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6">
        <Text className="text-2xl text-white font-psemibold">
          Registrar Produto
        </Text>

        <FormField
          title="Produto"
          value={form.title}
          placeholder="Nome do produto"
          handleChangeText={(e) => setForm({ ...form, title: e })}
          otherStyles="mt-10"
        />

        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">Imagem</Text>
          <View className="w-full flex-row gap-2">
            <TouchableOpacity onPress={openPicker}>
              {form.capa ? (
                <Image
                  source={{ uri: form.capa.uri }}
                  resizeMode="cover"
                  className="w-36 h-36 rounded-2xl"
                />
              ) : (
                <View className="w-36 h-36 px-4 bg-black-100 rounded-2xl border-2 border-black-200 justify-center items-center space-x-2">
                  <Image
                    source={icons.upload}
                    resizeMode="contain"
                    alt="upload"
                    className="w-8 h-8"
                  />
                  <Text className="text-sm text-center text-gray-100 font-pmedium">
                    Escolha um arquivo
                  </Text>
                </View>
              )}
            </TouchableOpacity>
            <View className="h-36 flex-1">
              <ColorSelector
                selectedColor={selectedColor}
                setSelectedColor={setSelectedColor}
                disabled={!!form.capa} // Desabilita se houver uma imagem selecionada
              />
            </View>
          </View>
        </View>

        <FormField
          title="Preço"
          value={form.valor}
          placeholder="Valor do produto"
          handleChangeText={(e) => setForm({ ...form, valor: e })}
          otherStyles="mt-7"
          keyboardType="numeric"
        />

        <CustomButton
          title="Publicar"
          handlePress={submit}
          containerStyles="mt-7"
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
