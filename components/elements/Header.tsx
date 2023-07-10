import React, { useMemo } from "react";
import { Alert } from "react-native";
import {
  Button,
  Text,
  HStack,
  Box,
  Pressable,
  useTheme,
  VStack,
  Heading,
} from "native-base";
import { useNavigation } from "@react-navigation/native";
import { UserContainer } from "../../store/UserContainer";
import { Navigation } from "../../App";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as SecureStore from "expo-secure-store";

const Header = ({ footerText }: { footerText?: string }) => {
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
          await SecureStore.deleteItemAsync("token");
          navigation.navigate("Posts", { afterPostingOrInitialVisit: false });
        },
      },
    ]);
  };

  return (
    <Box bg="main" pb={2}>
      <HStack
        px={2}
        w="100%"
        h={16}
        alignItems="center"
        justifyContent="space-between"
      >
        <Pressable
          onPress={() =>
            navigation.navigate("Posts", { afterPostingOrInitialVisit: false })
          }
        >
          <Text color={theme.colors.base_text}>MY BLOG</Text>
        </Pressable>
        <HStack space={2}>
          {isPostableUser && (
            <Pressable onPress={() => navigation.navigate("CreatePost")}>
              <Ionicons
                name="pencil-outline"
                size={20}
                color={theme.colors.base_text}
              />
            </Pressable>
          )}

          {signInUser ? (
            <HStack space={2} alignItems="center">
              <Pressable onPress={handleLogout}>
                <Ionicons
                  name="log-out"
                  size={20}
                  color={theme.colors.base_text}
                />
              </Pressable>
              <Pressable
                onPress={() =>
                  navigation.navigate("UserSetting", {
                    userId: signInUser._id,
                    userName: signInUser.name,
                  })
                }
              >
                <Text color={theme.colors.base_text}>
                  {signInUser?.name && signInUser.name + "さん"}
                </Text>
              </Pressable>
            </HStack>
          ) : (
            <Pressable onPress={() => navigation.navigate("SignIn")}>
              {/* // TODO:useThemeにおそらく型を渡す */}
              <Ionicons
                name="log-in"
                size={20}
                color={theme.colors.base_text}
              />
            </Pressable>
          )}
        </HStack>
      </HStack>
      <Heading
        textAlign="center"
        color="base"
        {...(footerText ? {} : { h: 0 })}
      >
        {footerText}
      </Heading>
    </Box>
  );
};

export default Header;
