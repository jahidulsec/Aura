import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import icons from "../constants/icons";
import { ResizeMode, Video } from "expo-av";
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from "react-native-popup-menu";
import { usePathname } from "expo-router";
import { useGlobalContext } from "../context/GlobalProvider";
import { addToBookmark, removeBookmark } from "../lib/appwrite";

const VideoCard = ({
  video: {
    $id,
    title,
    thumbnail,
    video,
    users: { username, avatar },
  },
}) => {
  const [play, setPlay] = useState(false);
  const pathname = usePathname();
  const { user } = useGlobalContext();

  const saveVideo = async () => {
    try {
      await addToBookmark(user.$id, { title, thumbnail, video });
      Alert.alert("Success", "Successfully added to bookmark");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const removeVideo = async () => {
    try {
      await removeBookmark($id);
      Alert.alert("Success", "Successfully removed from bookmark");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View className="flex-col items-center px-4 mb-14">
      <View className="flex-row gap-3 items-start">
        <View className="justify-center items-center flex-row flex-1">
          <View
            className="w-[46px] h-[46px] rounded-lg border border-secondary 
                justify-center items-center p-0.5"
          >
            <Image
              source={{ uri: avatar }}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>
          <View className="justify-center flex-1 ml-3 gap-y-1">
            <Text
              className="text-white font-psemibold text-sm"
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text
              className="text-xs text-gray-100 font-pregular"
              numberOfLines={1}
            >
              {username}
            </Text>
          </View>
        </View>
        <Menu>
          <MenuTrigger>
            <View className="pt-2">
              <Image
                source={icons.menu}
                className="w-5 h-5"
                resizeMode="contain"
              />
            </View>
          </MenuTrigger>
          <MenuOptions>
            <MenuOption
              onSelect={() => {
                if (!pathname.includes("bookmark")) {
                  saveVideo();
                } else {
                  removeVideo();
                }
              }}
            >
              {!pathname.includes("bookmark") ? (
                <View className="px-4 py-2 flex-row gap-4 items-center">
                  <Image
                    source={icons.bookmark}
                    className="w-4 h-4"
                    tintColor={`#FF9C01`}
                    resizeMode="contain"
                  />
                  <Text className="text-secondary font-pregular pt-1">
                    Add to bookmark
                  </Text>
                </View>
              ) : (
                <View className="px-4 py-2 flex-row gap-4 items-center">
                  <Image
                    source={icons.remove}
                    className="w-5 h-5"
                    tintColor={`#FF9C01`}
                    resizeMode="contain"
                  />
                  <Text className="text-secondary font-pregular pt-1">
                    Remove
                  </Text>
                </View>
              )}
            </MenuOption>
          </MenuOptions>
        </Menu>
      </View>

      {play ? (
        <Video
          source={{ uri: video }}
          className="w-full h-60 rounded-xl mt-3 relative justify-center items-center bg-white/10"
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
          activeOpacity={0.7}
          className="w-full h-60 rounded-xl mt-3 relative justify-center items-center"
          onPress={() => {
            setPlay(true);
          }}
        >
          <Image
            source={{ uri: thumbnail }}
            className="w-full h-full rounded-xl mt-3"
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;
