import { Box, Center, Text } from "native-base";
import React from "react";
import Header from "../components/Header";

const PostsScreen = () => {
  return (
    <Box flex={1} bgColor="base" alignItems={"stretch"}>
      <Header />
    </Box>
  );
};

export default PostsScreen;
