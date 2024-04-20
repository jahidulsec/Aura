import { View, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchInput from "../../components/SearchInput";
import EmptyState from "../../components/EmptyState";
import { searchPosts } from "../../lib/appwrite";
import useAppwrite from "../../hooks/useAppwrite";
import VideoCard from "../../components/VideoCard";
import { useState } from "react";

const Bookmark = () => {
  const [query, setQuery] = useState("");
  const { data: posts } = useAppwrite(() => searchPosts(query));

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className="px-4 mt-6 mb-8">
            <Text className="text-2xl text-white font-psemibold mb-6">
              Saved Videos
            </Text>

            <SearchInput
              placeholder="Search your saved videos"
              bookmarkSearch={true}
              handleChangeText={(e) => {setQuery(e)}}
            />
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No video found from your bookmark!"
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Bookmark;
