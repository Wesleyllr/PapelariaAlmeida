import { View, Text, FlatList, Image, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import EmptyState from "@/components/EmptyState";
import SearchInput from "@/components/SearchInput";
import Trending from "@/components/Trending";

import { StatusBar } from "expo-status-bar";
import { RefreshControl } from "react-native";
import { images } from "@/constants";
import { getAllPosts, getLatestPosts, searchPosts } from "@/lib/appwrite";
import useAppwrite from "@/lib/useAppwrite";
import VideoCard from "@/components/VideoCard";
import { useLocalSearchParams } from "expo-router";

type posts = {
  $id: string;
  title: string;
  thumbnail: string;
  video: string;
  creator: {
    username: string;
    avatar: string;
  };
};

const Search = () => {
  const { query } = useLocalSearchParams();
  const { data: posts, refetch } = useAppwrite(() => searchPosts(query));
  const [searchValue, setSearchValue] = useState(""); // Estado para o campo de busca
  // const [refreshing, setRefreshing] = useState(false);

  // const onRefresh = async () => {
  //   setRefreshing(true);
  //   await refetch();
  //   setRefreshing(false);
  // };

  useEffect(() => {
    refetch();
  }, [query]);

  return (
    <SafeAreaView className="bg-primary h-full ">
      <FlatList
        //data={[{id: 1},{id: 2},{id: 3}]}
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className="py-6 px-6">
            <Text className="font-pmedium text-sm text-gray-100">
              Vídeos encontrados
            </Text>
            <Text className="text-2xl font-psemibold text-white">{query}</Text>

            <View className="mt-6 mb-8">
              <SearchInput initialQuery={query} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="Vídeo não encontrado"
            subtitle="Nenhum vídeo encontrato com esse título"
          />
        )}
      />

      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};

export default Search;
