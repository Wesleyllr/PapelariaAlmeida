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
import { Video, ResizeMode } from "expo-av";
import { useVideoPlayer, VideoView } from "expo-video"; // Importando expo-video

const zoomIn = {
  from: { transform: [{ scale: 0.9 }] },
  to: { transform: [{ scale: 1.1 }] },
};

const zoomOut = {
  from: { transform: [{ scale: 1 }] },
  to: { transform: [{ scale: 0.9 }] },
};

const viewabilityConfig = {
  itemVisiblePercentThreshold: 80, // Define o percentual de visibilidade
};

type TrendingItemProps = {
  activeItem: any;
  item: any;
};

const TrendingItem: React.FC<TrendingItemProps> = ({ activeItem, item }) => {
  const [play, setPlay] = useState(false);
  const player = useVideoPlayer(item.video, (player) => {
    player.loop = true;
    if (play) {
      player.play();
    } else {
      player.pause();
    }
  });

  return (
    <Animatable.View
      className="mr-5"
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      duration={300}
    >
      {play ? (
        <View className="w-52 h-72 rounded-[35px] mt-6 bg-white/10 items-center justify-center">
          <VideoView
            style={{ width: 208, height: 288 }}
            player={player}
            allowsFullscreen
            allowsPictureInPicture
            className="w-52 h-72 contain"
          />
        </View>
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

  type ViewableItemsProps = {
    viewableItems: Array<{ key: any }>; // Supondo que viewableItems é um array de objetos com `key`
  };

  const viewableItemsChanged = ({
    viewableItems,
  }: ViewableItemsProps): void => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  };

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem} item={item} />
      )}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={viewabilityConfig}
      contentOffset={{ x: 170, y: 0 }}
      horizontal
    />
  );
};

export default Trending;
