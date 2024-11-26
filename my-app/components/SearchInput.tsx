import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { icons, images } from "@/constants";
import { Platform } from "react-native";
import { router, usePathname, useRouter } from "expo-router";

type SearchInputProps = {
  title: string; // Título do campo
  value: string; // Valor do campo
  handleChangeText: (text: string) => void; // Função para manipular a entrada
  otherStyles?: string; // Estilos adicionais (opcional)
  placeholder?: string;
  keyboardType?: string; // Tipo de teclado (opcional)
};

const SearchInput = (initialQuery: any) => {
  const pathname = usePathname();
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery || "");

  const handleSearch = () => {
    if (!query.trim()) {
      return Alert.alert("Vazio", "Escreva algo para pesquisar");
    }
    if (pathname.startsWith("/search")) {
      router.setParams({ query });
    } else {
      router.push(`/search/${query}`);
    }
  };
  return (
    <View
      className="border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl
        focus:border-secondary items-center flex-row space-x-4"
    >
      <TextInput
        className="text-base mt-0.5 text-white flex-1 font-pregular "
        value={query}
        placeholder="Pesquisar vídeo"
        placeholderTextColor="#CDCDE0"
        onChangeText={setQuery}
      />
      <TouchableOpacity onPress={handleSearch}>
        <Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
