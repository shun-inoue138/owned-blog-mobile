import React, { useEffect, useMemo, useState } from "react";
import { FlatList, Text } from "react-native";
import { Box, Heading } from "native-base";
import PostCard from "../components/PostCard";
import PrivateBadge from "../components/elements/PrivateBadge";
import { Post, PostAPI } from "../api/PostAPI";
import { User, UserAPI } from "../api/UserAPI";
import Header from "../components/elements/Header";
import { useRoute } from "@react-navigation/native";
import { UserSettingScreenRouteProp } from "../App";

const UserSettingScreen = ({
  route,
}: {
  route: UserSettingScreenRouteProp;
}) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const userId = useMemo(() => route.params?.userId, [route.params?.userId]);

  useEffect(() => {
    const fetchUserAndPosts = async () => {
      setIsLoading(true);
      try {
        const fetchedPosts = await PostAPI.findAllByUser(userId);
        setPosts(fetchedPosts);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserAndPosts();
  }, [userId]);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }
  if (isError) {
    return <Text>Errorが発生しました</Text>;
  }
  if (posts.length === 0) {
    return <Text>記事がありません</Text>;
  }

  return (
    <Box flex={1}>
      <Header footerText={`${route.params?.userName ?? ""} 記事一覧`} />
      <FlatList
        data={posts}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <Box position="relative" mb={4}>
            <PrivateBadge hidden={!item.isPrivate} />
            <PostCard {...item} />
          </Box>
        )}
      />
    </Box>
  );
};

export default UserSettingScreen;
