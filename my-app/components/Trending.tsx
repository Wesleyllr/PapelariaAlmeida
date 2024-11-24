import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
import React, { useState } from "react";
import * as Animatable from "react-native-animatable";
import { icons } from "@/constants";

const zoomIn = {
  from: { transform: [{ scale: 0.9 }] },
  to: { transform: [{ scale: 1 }] },
};

const zoomOut = {
  from: { transform: [{ scale: 1 }] },
  to: { transform: [{ scale: 0.9 }] },
};

const TrendingItem = ({ activeItem, item }) => {
  const [play, setPlay] = useState(false);

  return (
    <Animatable.View
      className="mr-5"
      animation={activeItem.$id === item.$id ? zoomIn : zoomOut}
      duration={500}
    >
      {play ? (
        <Text className="text=white">Playing</Text>
      ) : (
        <TouchableOpacity
          className="relative justify-center items-center"
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <ImageBackground
            source={{ uri: item.thumbnail }}
            className="w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40"
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            className="w-10 h-10 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

const Trending = ({ posts }: { posts: Array<{ id: number }> }) => {
  const [activeItem, setActiveItem] = useState(posts[1]);

  const viewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  };

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.$id} // Usar item.id como chave única
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem} item={item} />
      )}
      onViewableItemsChanged={viewableItemsChanged}
      //viewabilityConfig={{ itemVisiblePercentThreshold: 70 }}
      contentOffset={{ x: 170 }}
      horizontal
    />
  );
};

export default Trending;
