import React, { useMemo } from "react";
import { Alert } from "react-native";
import { Button, Text, HStack, Box, Pressable, useTheme } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { UserContainer } from "../store/UserContainer";
import { Navigation } from "../App";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Header = () => {
  const { signInUser, setSignInUser } = UserContainer.useContainer();
  const navigation = useNavigation<Navigation>();
  const theme = useTheme();

  const isPostableUser = useMemo(() => {
    return signInUser?.role === "admin" || signInUser?.role === "contributor";
  }, [signInUser?.role]);

  const handleLogout = () => {
    Alert.alert("Logout", "ログアウトしますか？", [
      { text: "Cancel" },
      {
        text: "OK",
        onPress: async () => {
          setSignInUser(undefined);
          await AsyncStorage.removeItem("token");
          navigation.navigate("Home");
        },
      },
    ]);
  };

  return (
    <Box
      px={2}
      w="100%"
      h={16}
      bg="main"
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
    >
      <Pressable onPress={() => navigation.navigate("Posts")}>
        <Text color={"white"}>MY BLOG</Text>
      </Pressable>
      <HStack space={4}>
        {isPostableUser && (
          <Button onPress={() => navigation.navigate("CreatePost")}>
            <Ionicons name="pencil-outline" size={30} color="#000" />
          </Button>
        )}

        {signInUser ? (
          <HStack space={1}>
            <Pressable onPress={handleLogout}>
              <Ionicons name="log-out" size={30} color="" />
            </Pressable>
            <Pressable
              onPress={() =>
                navigation.navigate("UserProfile", { userId: signInUser._id })
              }
            >
              <Text>{signInUser?.name && signInUser.name + "さん"}</Text>
            </Pressable>
          </HStack>
        ) : (
          <Pressable onPress={() => navigation.navigate("SignIn")}>
            {/* // TODO:useThemeにおそらく型を渡す */}
            <Ionicons name="log-in" size={30} color={theme.colors.base} />
          </Pressable>
        )}
      </HStack>
    </Box>
  );
};

export default Header;
