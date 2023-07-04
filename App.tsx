import { NavigationContainer, NavigationProp } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeBaseProvider, extendTheme } from "native-base";
import PostsScreen from "./screens/PostsScreen";
import SignInScreen from "./screens/SignInScreen";
import SignUpScreen from "./screens/SignUpScreen";
import { UserContainer } from "./store/UserContainer";

const Stack = createNativeStackNavigator();

const theme = extendTheme({
  colors: {
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
  Posts: undefined;
  CreatePost: undefined;
  SignIn: undefined;
  SignUp: undefined;
  UserProfile: { userId: string };
};
export type Navigation = NavigationProp<StackNavigatorParamList>;

export default function App() {
  return (
    <UserContainer.Provider>
      <NativeBaseProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Posts">
            <Stack.Screen
              name="Posts"
              component={PostsScreen}
              options={{
                title: "記事一覧画面",
                //  headerShown: false
              }}
            />
            <Stack.Screen
              name="SignIn"
              component={SignInScreen}
              options={{
                title: "ログイン画面",
                // headerShown: false
              }}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUpScreen}
              options={{
                title: "新規登録画面",
                //  headerShown: false
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </UserContainer.Provider>
  );
}
