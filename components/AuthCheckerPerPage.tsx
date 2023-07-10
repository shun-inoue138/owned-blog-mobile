import React, { FC, ReactNode, useEffect, useMemo } from "react";
import { useNavigation } from "@react-navigation/native";
import { Text } from "react-native";
import { UserContainer } from "../store/UserContainer";
import { Navigation } from "../App";

const AuthCheckerPerPage: FC<{ children: ReactNode }> = ({ children }) => {
  const { signInUser } = UserContainer.useContainer();
  const navigation = useNavigation();
  const isPostableUser = useMemo(() => {
    return signInUser?.role === "admin" || signInUser?.role === "contributor";
  }, [signInUser?.role]);

  useEffect(() => {
    if (!isPostableUser) {
      setTimeout(() => {
        navigation.navigate<Navigation>("Posts");
      }, 2000);
    }
  }, [signInUser, navigation]);

  if (!isPostableUser) {
    return <Text>権限がありません</Text>;
  }

  return <>{children}</>;
};

export default AuthCheckerPerPage;
