import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { icons, images } from "@/constants";
import { Platform } from "react-native";

type FormFieldProps = {
  title: string; // Título do campo
  value: string; // Valor do campo
  handleChangeText: (text: string) => void; // Função para manipular a entrada
  otherStyles?: string; // Estilos adicionais (opcional)
  placeholder?: string;
  keyboardType?: string; // Tipo de teclado (opcional)
};

const FormField: React.FC<FormFieldProps> = ({
  title,
  value,
  handleChangeText,
  otherStyles,
  placeholder,
  keyboardType = "default",
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-gray-200 font-pmedium">{title}</Text>
      <View
        className="border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl
        focus:border-secondary items-center flex-row"
      >
        <TextInput
          className="flex-1 text-white font-psemibold text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
          keyboardType={keyboardType}
        />
        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              className="w-6 h-6"
              resizeMode="contain"
              style={{
                width: Platform.OS === "web" ? 32 : 24,
                height: Platform.OS === "web" ? 32 : 24,
                resizeMode: "contain",
              }}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
