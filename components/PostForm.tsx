import React, { useEffect } from "react";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Post, PostAPI } from "../api/PostAPI";
import { User } from "../api/UserAPI";
import { useNavigation } from "@react-navigation/native";
import {
  Box,
  Input,
  Pressable,
  TextArea,
  Checkbox,
  VStack,
  HStack,
  Text,
  ScrollView,
} from "native-base";
import { Navigation } from "../App";
import clsx from "clsx";
import SimpleButton from "./elements/SimpleButton";

const schema = z.object({
  title: z
    .string()
    .min(1, { message: "入力必須です" })
    .max(100, { message: "100文字以内で入力してください" }),
  content: z
    .string()
    .min(1, { message: "入力必須です" })
    .max(1200, { message: "1200文字以内で入力してください" }),
  image: z.string().optional(),
  isPrivate: z.boolean(),
});

type FormData = z.infer<typeof schema>;

export default function PostForm({
  userId,
  postToEdit,
  postType,
}: {
  userId: User["_id"];
  postToEdit?: Post;
  postType: "create" | "edit";
}) {
  const navigation = useNavigation<Navigation>();
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: postToEdit?.title,
      content: postToEdit?.content,
      isPrivate: postToEdit?.isPrivate ?? false,
    },
  });

  const image = watch("image");
  const contentLength = watch("content")?.length;

  const onSubmit = async (data: FormData) => {
    try {
      if (postType === "create") {
        console.log("create");
        await PostAPI.create({ ...data, user: userId });
      } else if (postType === "edit") {
        await PostAPI.edit(postToEdit?._id as string, {
          ...data,
          user: userId,
        });
      }
      alert(postType === "create" ? "Created" : "Edited");
      navigation.navigate("Posts", { afterPostingOrInitialVisit: true });
    } catch (err) {
      console.log(err);
      alert("エラーが発生しました。再度お試し下さい。");
    }
  };

  return (
    <ScrollView>
      <Box safeArea flex={1} p={2} w="90%" mx="auto">
        <Text mb={5} fontSize="3xl" textAlign="center" bold>
          {postType === "create" ? "記事新規作成" : "記事編集"}
        </Text>
        <VStack space={1} mb={2}>
          <Text>タイトル</Text>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input value={value} onChangeText={onChange} />
            )}
            name="title"
          />
          {errors.title && (
            <Text fontSize="sm" color="red.500">
              {errors.title?.message}
            </Text>
          )}
        </VStack>
        <VStack space={1} mb={2}>
          <Text>本文</Text>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextArea
                mb={5}
                h={40}
                value={value}
                onChangeText={onChange}
                autoCompleteType="off"
              />
            )}
            name="content"
          />
          {errors.content && (
            <Text fontSize="sm" color="alert">
              {errors.content.message}
            </Text>
          )}
          <HStack justifyContent="flex-end">
            <Text>{contentLength ? contentLength : 0}</Text>
            <Text>/</Text>
            <Text>1200</Text>
          </HStack>
        </VStack>
        <VStack space={1} mb={2}>
          <Text>画像</Text>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                mb={5}
                placeholder="Image URL"
                value={value}
                onChangeText={onChange}
              />
            )}
            name="image"
          />
          {errors.image && (
            <Text fontSize="sm" color="alert">
              {errors.image.message}
            </Text>
          )}
        </VStack>
        <HStack space={1} mb={2}>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <Checkbox
                value=""
                colorScheme="green"
                name="isPrivate"
                onChange={onChange}
              >
                公開しない
              </Checkbox>
            )}
            name="isPrivate"
          />
        </HStack>
        <SimpleButton onPress={handleSubmit(onSubmit)}>
          <Text color="base">作成</Text>
        </SimpleButton>
      </Box>
    </ScrollView>
  );
}
