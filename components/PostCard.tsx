import React, { FC, memo } from "react";
import { Box, Text, VStack, HStack, Divider, Button } from "native-base";
import dayjs from "dayjs";
import { Post } from "../api/PostAPI";
import Base64Image from "./elements/Base64Image";
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Navigation } from "../App";

const PostCard: FC<Post> = (post) => {
  const navigation = useNavigation<Navigation>();

  return (
    <Pressable
      onPress={() => {
        navigation.navigate("PostDetail", { postId: post._id });
      }}
    >
      <Box
        borderColor="base"
        borderWidth={1}
        shadow={1}
        borderRadius="lg"
        p={4}
      >
        <VStack space={4} mx={2}>
          <Text fontSize="lg" bold>
            {post.title}
          </Text>
          <Divider my={2} />
          <Box h={200}>
            <Base64Image base64Image={post.image} />
          </Box>
          <Divider my={2} />
          <Text fontSize="md" noOfLines={3}>
            {post.content}
          </Text>
          <Divider my={2} />
          <HStack justifyContent="space-between" alignItems="flex-end">
            <VStack>
              <HStack alignItems="center" space={2}>
                <Text fontSize="sm">投稿日:</Text>
                <Text fontSize="sm">
                  {dayjs(post.createdAt).format("YYYY/MM/DD HH:mm")}
                </Text>
              </HStack>
              <HStack alignItems="center" space={2} mt={1}>
                <Text fontSize="sm">更新日:</Text>
                <Text fontSize="sm">
                  {dayjs(post.updatedAt).format("YYYY/MM/DD HH:mm")}
                </Text>
              </HStack>
            </VStack>
            <Text fontSize="md">by {post.user.name}</Text>
          </HStack>
        </VStack>
      </Box>
    </Pressable>
  );
};

export default memo(PostCard);
