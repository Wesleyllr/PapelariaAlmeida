import React from "react";
import { View, TouchableOpacity } from "react-native";

const ColorSelector = ({ selectedColor, setSelectedColor, disabled }) => {
  // Lista de cores
  const colors = [
    "#f9fafb",
    "#2dde12",
    "#603209",
    "#007bff",
    "#ff0000",
    "#ffc107",
    "#fd7e14",
    "#6f42c1",
  ];

  return (
    <View className="flex-1 flex-row justify-between flex-wrap gap-2">
      {colors.map((color) => (
        <TouchableOpacity
          key={color}
          className="w-16 h-16 rounded-md"
          style={{
            backgroundColor: color,
            borderWidth: selectedColor === color ? 2 : 0, // Destaque no selecionado
            borderColor: selectedColor === color ? "#ffffff" : "transparent",
            opacity: disabled ? 0.5 : 1, // Reduz a opacidade se desabilitado
          }}
          onPress={() => !disabled && setSelectedColor(color)} // Define a cor selecionada se não estiver desabilitado
          disabled={disabled} // Desabilita o botão se necessário
        />
      ))}
    </View>
  );
};

export default ColorSelector;
