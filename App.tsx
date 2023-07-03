import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeBaseProvider, extendTheme } from "native-base";
import PostsScreen from "./screens/PostsScreen";
import SignInScreen from "./screens/SignInScreen";
import SignUpScreen from "./screens/SignUpScreen";

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

export default function App() {
  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Posts">
          <Stack.Screen name="Posts" component={PostsScreen} />
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
