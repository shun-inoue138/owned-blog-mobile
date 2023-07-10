import React, {
  ComponentType,
  FC,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { FlatList, View, Text } from "react-native";
import { Post, PostAPI } from "../api/PostAPI";
import PostCard from "../components/PostCard";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Box, Checkbox, HStack } from "native-base";
import Header from "../components/elements/Header";
import { UserContainer } from "../store/UserContainer";
import { Navigation, PostsScreenRouteProp } from "../App";

type PostsScreenProps = {
  route: PostsScreenRouteProp;
  navigation: Navigation;
};

const PostsScreen: ComponentType<PostsScreenProps> = ({
  route,
  navigation,
}) => {
  const { signInUser } = UserContainer.useContainer();
  const [fetchedPosts, setFetchedPosts] = useState<Post[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  //stateで定義する必要はないかも↓
  const [postsToDisplay, setPostsToDisplay] = useState<Post[]>(fetchedPosts);
  const [shouldDisplayOnlyMyPosts, setShouldDisplayOnlyMyPosts] =
    useState<boolean>(false);

  const isPostableUser = useMemo(() => {
    return signInUser?.role === "admin" || signInUser?.role === "contributor";
  }, [signInUser?.role]);

  useFocusEffect(
    useCallback(() => {
      if (route.params?.afterPostingOrInitialVisit ?? true) {
        const fetchPosts = async () => {
          setIsFetching(true);
          // TODO:エラーハンドリング
          const posts = await PostAPI.findAllExceptPrivate();
          setFetchedPosts(posts);
          setPostsToDisplay(posts);
          setIsFetching(false);
        };
        fetchPosts();
        navigation.setParams({ afterPostingOrInitialVisit: false });
      }
      return () => {};
    }, [route.params?.afterPostingOrInitialVisit, navigation])
  );
  useEffect(() => {
    if (shouldDisplayOnlyMyPosts) {
      setPostsToDisplay(
        postsToDisplay.filter((post) => post.user._id === signInUser?._id)
      );
    } else {
      setPostsToDisplay(fetchedPosts);
    }
  }, [shouldDisplayOnlyMyPosts]);

  if (isFetching) {
    return <Text>Loading...</Text>;
  }

  return (
    <>
      <Header />
      {isPostableUser && (
        <HStack mt={2} ml={2} alignItems="center">
          <Checkbox
            value=""
            isChecked={shouldDisplayOnlyMyPosts}
            onChange={() => {
              setShouldDisplayOnlyMyPosts((prev) => !prev);
            }}
          />
          <Text>自分の投稿のみ表示</Text>
        </HStack>
      )}

      <FlatList
        data={postsToDisplay}
        renderItem={({ item }) => <PostCard {...item} />}
        keyExtractor={(item) => item._id}
        contentContainerStyle={{ padding: 20 }}
      />
    </>
  );
};

export default PostsScreen;
