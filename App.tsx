import {
  NavigationContainer,
  NavigationProp,
  RouteProp,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  NativeBaseProvider,
  extendTheme,
  theme as baseTheme,
} from "native-base";
import PostsScreen from "./screens/PostsScreen";
import SignInScreen from "./screens/SignInScreen";
import SignUpScreen from "./screens/SignUpScreen";
import { UserContainer } from "./store/UserContainer";
import React, { FC, ReactNode, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { UserAPI } from "./api/UserAPI";
import EditPostScreen from "./screens/EditPostScreen";
import CreatePostScreen from "./screens/CreatePostScreen";
import axios from "axios";
import UserSettingScreen from "./screens/UserSettingScreen";
import PostDetailScreen from "./screens/PostDetailScreen";

const Stack = createNativeStackNavigator();

const theme = extendTheme({
  colors: {
    ...baseTheme.colors,
    main: "#303030",
    base: "#DCDCDC",
    accent: "#DC143C",
    main_text: "#303030",
    sub_text: "#708090",
    base_text: "#DCDCDC",
    success: "#0000FF",
    info: "#008000",
    alert: "#FF0000",
  },
});

type StackNavigatorParamList = {
  Home: undefined;
  Posts: { afterPostingOrInitialVisit: boolean };
  PostDetail: { postId: string };
  CreatePost: undefined;
  EditPost: { postId: string };
  SignIn: { email?: string; password?: string } | undefined;
  SignUp: { email?: string; password?: string } | undefined;
  UserSetting: { userId: string; userName: string };
};
export type Navigation = NavigationProp<StackNavigatorParamList>;
export type PostsScreenRouteProp = RouteProp<StackNavigatorParamList, "Posts">;
export type PostDetailScreenRouteProp = RouteProp<
  StackNavigatorParamList,
  "PostDetail"
>;
export type CreatePostScreenRouteProp = RouteProp<
  StackNavigatorParamList,
  "CreatePost"
>;
export type EditPostScreenRouteProp = RouteProp<
  StackNavigatorParamList,
  "EditPost"
>;
export type SignInScreenRouteProp = RouteProp<
  StackNavigatorParamList,
  "SignIn"
>;
export type SignUpScreenRouteProp = RouteProp<
  StackNavigatorParamList,
  "SignUp"
>;
export type UserSettingScreenRouteProp = RouteProp<
  StackNavigatorParamList,
  "UserSetting"
>;

//開発中はheaderShonwをtrueにしておく
export default function App() {
  return (
    <UserContainer.Provider>
      <TokenChecker>
        <NativeBaseProvider theme={theme}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Posts">
              <Stack.Screen
                name="Posts"
                component={PostsScreen}
                options={{
                  title: "記事一覧",
                  //  headerShown: false
                }}
              />
              <Stack.Screen
                name="PostDetail"
                component={PostDetailScreen}
                options={{
                  title: "記事詳細",
                  //  headerShown: false
                }}
              />

              <Stack.Screen
                name="SignIn"
                component={SignInScreen}
                options={{
                  title: "ログイン",
                  // headerShown: false
                }}
              />
              <Stack.Screen
                name="SignUp"
                component={SignUpScreen}
                options={{
                  title: "新規登録",
                  //  headerShown: false
                }}
              />
              <Stack.Screen
                name="CreatePost"
                component={CreatePostScreen}
                options={{
                  title: "記事作成",
                  //  headerShown: false
                }}
              />

              <Stack.Screen
                name="EditPost"
                component={EditPostScreen}
                options={{
                  title: "記事編集",
                  //  headerShown: false
                }}
              />
              <Stack.Screen
                name="UserSetting"
                component={UserSettingScreen}
                options={{
                  title: "ユーザー設定",
                  //  headerShown: false
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </NativeBaseProvider>
      </TokenChecker>
    </UserContainer.Provider>
  );
}

//下記はUserContainerに混ぜたほうがいいかも
const TokenChecker: FC<{ children: ReactNode }> = ({ children }) => {
  const { setSignInUser } = UserContainer.useContainer();

  useEffect(() => {
    const verifyToken = async () => {
      const token = await SecureStore.getItemAsync("token");
      if (!token) return;

      const signInUser = await UserAPI.verifyToken();
      if (!signInUser) return;
      setSignInUser(signInUser);
    };

    verifyToken();
  }, []);

  return <>{children}</>;
};
