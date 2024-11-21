import { View, Text, FlatList, Image } from 'react-native'
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '@/constants'
import SearchInput from '@/components/searchinput'


const Home = () => {
  const [searchValue, setSearchValue] = useState(''); // Estado para o campo de busca



  return (
    <SafeAreaView className='bg-primary'>
      <FlatList 
      data={[{id: 1},{id: 2},{id: 3}]}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({item}) => (
        <Text className='text-3xl text-white'> {item.id}</Text>
      )}
      ListHeaderComponent={() => (
        <View className='my-6 px-6 space-y-6'>
          <View className='justify-between items-start flex-row mb-6'>
            <View>
              <Text className='font-pmedium text-sm text-gray-100'>
                Bem vindo
              </Text>
              <Text className='text-2xl font-psemibold text-white'>
                Wesleyllr
              </Text>
            </View>
            <View className='mt-1.5'>
              <Image source={images.logoSmall}
              className='w-9 h-10'
              resizeMode='contain'
              />
            </View>
          </View>

          <SearchInput
              title="Search" // Título do campo (apenas semântica, se usado no futuro)
              value={searchValue} // Valor do campo (controlado pelo estado)
              handleChangeText={setSearchValue} // Função para atualizar o valor
              placeholder="Buscar algo..." // Placeholder para exibição
            />
        </View>
      )}
      />
    </SafeAreaView>
  )
}

export default Home