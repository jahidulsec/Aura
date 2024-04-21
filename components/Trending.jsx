import { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
import * as Animatable from "react-native-animatable";
import icons from "../constants/icons";
import { ResizeMode, Video } from "expo-av";

const zoomIn = {
  0: {
    scale: 0.875,
  },
  1: {
    scale: 1,
  },
};

const zoomOut = {
  0: {
    scale: 1,
  },
  1: {
    scale: 0.875,
  },
};

const widthInc = {
  0: {
    width: `2px`,
  },
  1: {
    width: `5px`,
  },
};

const widthOut = {
  0: {
    width: `5px`,
  },
  1: {
    width: `2px`,
  },
};

const TrendingItem = ({ activeItem, item }) => {
  const [play, setPlay] = useState(false);

  return (
    <>
      <Animatable.View
        className="mr-5"
        animation={activeItem === item.$id ? zoomIn : zoomOut}
        duration={500}
      >
        {play ? (
          <Video
            source={{ uri: item.video }}
            className="w-52 h-72 rounded-[35px] mt-3 bg-white/10"
            resizeMode={ResizeMode.CONTAIN}
            useNativeControls
            shouldPlay
            onPlaybackStatusUpdate={(status) => {
              if (status.didJustFinish) {
                setPlay(false);
              }
            }}
          />
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
              className="w-12 h-12 absolute"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </Animatable.View>
    </>
  );
};

const Trending = ({ posts }) => {
  const [activeItem, setActiveItem] = useState(posts[1]);

  const viewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  };

  return (
    <>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <TrendingItem activeItem={activeItem} item={item} />
        )}
        horizontal
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={{ itemVisiblePercentThreshold: 70 }}
        contentOffset={{ x: 170 }}
        showsHorizontalScrollIndicator={false}
      />
      <Animatable.View className="justify-center items-center flex-row gap-2">
        {posts.map((item) => (
          <View
            className={`h-2 ${
              activeItem === item.$id ? `w-5` : `w-2`
            } rounded-full bg-secondary-100`}
            key={item.$id}
          ></View>
        ))}
      </Animatable.View>
    </>
  );
};

export default Trending;
