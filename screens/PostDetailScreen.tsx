import React, { useEffect, useState, useMemo } from "react";
import { View, TouchableOpacity, Alert } from "react-native";
import {
  Box,
  Heading,
  Text,
  IconButton,
  VStack,
  Divider,
  ScrollView,
  HStack,
} from "native-base";
import { Post, PostAPI } from "../api/PostAPI";
import { UserContainer } from "../store/UserContainer";
import { getIsMyPost } from "../utils/getIsMyPost";
import { useNavigation, useRoute } from "@react-navigation/native";
import Base64Image from "../components/elements/Base64Image";
import Ionicons from "@expo/vector-icons/Ionicons";
import dayjs from "dayjs";
import { Navigation, PostDetailScreenRouteProp } from "../App";
import { color } from "native-base/lib/typescript/theme/styled-system";
import Header from "../components/elements/Header";

const PostDetailScreen = ({ route }: { route: PostDetailScreenRouteProp }) => {
  console.log({ postId: route.params?.postId });

  const navigation = useNavigation<Navigation>();
  const [post, setPost] = useState<Post | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [showImage, setShowImage] = useState<boolean>(true);
  const { signInUser } = UserContainer.useContainer();

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const fetchedPost = await PostAPI.findOne(route.params?.postId);
        setPost(fetchedPost);
      } catch (e) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [route.params?.postId]);

  const isMyPost = useMemo(() => {
    return getIsMyPost(signInUser, post);
  }, [signInUser, post]);

  const handleDelete = async () => {
    const res = confirm("削除しますか？");
    if (res) {
      try {
        // fetch完了後に表示される画面に設置されるボタンからトリガーされる
        await PostAPI.delete(post?._id as string);
        Alert.alert("削除しました");
        navigation.navigate("Posts", { afterPostingOrInitialVisit: true });
      } catch (error) {
        Alert.alert("削除に失敗しました");
      }
    }
  };

  if (!post) {
    return <Text>Loading...</Text>;
  }

  return (
    <Box position="relative" w="full" h="full">
      <Header footerText={post.title} />
      <ScrollView>
        {showImage && <Base64Image base64Image={post.image} />}
        <IconButton
          icon={
            showImage ? (
              <Ionicons name="chevron-down-outline" />
            ) : (
              <Ionicons name="chevron-up-outline" />
            )
          }
          onPress={() => setShowImage((prev) => !prev)}
        />
        <VStack>
          <Text>{post.content}</Text>
          <Divider />
          <Text>{post.user.name}</Text>
          <Divider />
          <Text>{dayjs(post.createdAt).format("YYYY/MM/DD HH:MM:ss")}</Text>
          <Divider />
          <Text>{dayjs(post.updatedAt).format("YYYY/MM/DD HH:MM:ss")}</Text>
        </VStack>
      </ScrollView>
      {isMyPost && (
        <HStack position="absolute" bottom={2} right={2}>
          <IconButton
            icon={<Ionicons name="create-outline" />}
            onPress={() =>
              navigation.navigate(`EditPost`, { postId: post._id })
            }
          />
          <IconButton
            icon={<Ionicons name="trash-bin-outline" color="alert" />}
            onPress={handleDelete}
          />
        </HStack>
      )}
    </Box>
  );
};

export default PostDetailScreen;
