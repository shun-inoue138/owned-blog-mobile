import AuthCheckerPerPage from "../components/AuthCheckerPerPage";
import { Box, Text } from "native-base";
import PostForm from "../components/PostForm";
import Header from "../components/elements/Header";
import { useEffect, useState } from "react";
import { Post, PostAPI } from "../api/PostAPI";
import { EditPostScreenRouteProp } from "../App";

function EditPostScreen({ route }: { route: EditPostScreenRouteProp }) {
  const [postToEdit, setPostToEdit] = useState<Post | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  // TODO:このidをkeyにしてpostを取得する。postにuserIdが含まれているので、それをuserIdとしてPostFormに渡す。取得したpostをpostToEditとしてPostFormに渡す。
  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true);
      try {
        const post = await PostAPI.findOne(route.params?.postId);
        setPostToEdit(post);
      } catch (e) {
        setIsError(true);
      } finally {
        setIsLoading(false);
        console.log({ isLoading });
      }
    };
    fetchPost();
  }, []);
  if (isLoading) {
    return <Text>Loading...</Text>;
  }
  if (isError) {
    return <Text>Errorが発生しました</Text>;
  }
  if (!postToEdit) {
    return <Text>記事が見つかりませんでした</Text>;
  }

  return (
    <AuthCheckerPerPage>
      <Header />
      <PostForm
        userId={postToEdit.user._id}
        postType="edit"
        postToEdit={postToEdit}
      />
    </AuthCheckerPerPage>
  );
}

export default EditPostScreen;
