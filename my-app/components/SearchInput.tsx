import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react';
import { icons, images } from '@/constants';
import { Platform } from 'react-native';

type SearchInputProps = {
    title: string; // Título do campo
    value: string; // Valor do campo
    handleChangeText: (text: string) => void; // Função para manipular a entrada
    otherStyles?: string; // Estilos adicionais (opcional)
    placeholder?: string;
    keyboardType?: string; // Tipo de teclado (opcional)
  };


  const SearchInput: React.FC<SearchInputProps> = ({
    title, 
    value, 
    handleChangeText, 
    otherStyles,
    placeholder,
    keyboardType = 'default'
  }) => {

    const [showPassword, setShowPassword] = useState(false)

  return (


        <View className='border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl
        focus:border-secondary items-center flex-row space-x-4'>
            <TextInput 
                className='text-base mt-0.5 text-white flex-1 font-pregular '
                value={value}
                placeholder='Pesquisar vídeo'
                placeholderTextColor="#7b7b8b"
                onChangeText={handleChangeText}
                secureTextEntry={title === 'Password' && !showPassword}
            />
            <TouchableOpacity>
                <Image source={icons.search}
                    className='w-5 h-5'
                    resizeMode='contain'
                />
            </TouchableOpacity>
        </View>

  )
}

export default SearchInput


