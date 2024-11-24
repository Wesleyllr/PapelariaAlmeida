import { View, Text, FlatList, Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import EmptyState from '@/components/EmptyState'
import SearchInput from '@/components/SearchInput'
import Trending from '@/components/Trending';

import { StatusBar } from 'expo-status-bar';
import { RefreshControl } from 'react-native';
import { images } from '@/constants';
import { getAllPosts } from '@/lib/appwrite';
import useAppwrite from '@/lib/useAppwrite'

const Home = () => {

  const { data: posts, refetch} = useAppwrite(getAllPosts)
  const [searchValue, setSearchValue] = useState(''); // Estado para o campo de busca

  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = async () => {
    setRefreshing(true);
      await refetch();
    setRefreshing(false); 

  }

  return (
    <SafeAreaView className='bg-primary h-full '>
      <FlatList 
      //data={[{id: 1},{id: 2},{id: 3}]}
      data={posts}
      keyExtractor={(item) => item.$id}
      renderItem={({item}) => (
        <Text className='text-3xl text-white'> {item.title}</Text>
      )}
      ListHeaderComponent={() => (
        <View className='py-6 px-6'>
          <View className='justify-between items-start flex-row'>
            <View>
              <Text className='font-pmedium text-sm text-gray-100'>
                Bem vindo
              </Text>
              <Text className='text-2xl font-psemibold text-white'>
                Wesleyllr
              </Text>
            </View>
            <View className='mt-1.5'>
              <Image source={images.moovcolumbluesmall}
              className='w-11 h-10'
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
          <View className='w-full flex-1 pt-6 pb-8'>
            <Text className='text-gray-100 text-lg font-pregular mb-3'>
              Últimos Vídeos  
            </Text>
            <Trending posts={[{id : 4}, {id : 5},{id : 6}] ?? []} />

          </View> 
        </View>
      )}
      ListEmptyComponent={() => (
        <EmptyState
        title='Vídeo não encontrado'
        subtitle='Nenhum vídeo criado ainda'
        />
      )}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}
      
      />}

      />

      <StatusBar backgroundColor= '#161622'
      style='light'/>
    
    </SafeAreaView>

  )
}

export default Home