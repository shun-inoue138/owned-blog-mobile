import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Box, Input, VStack, Text, Center } from "native-base";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import { UserAPI } from "../api/UserAPI";
import { UserContainer } from "../store/UserContainer";
import ErrorMessage from "../components/elements/ErrorMessage";
import { Navigation } from "../App";
import SimpleButton from "../components/elements/SimpleButton";

const schema = z
  .object({
    name: z.string().min(1, "入力必須です"),
    email: z.string().email("メールアドレスの形式で入力してください"),
    password: z.string().min(8, "8文字以上で入力してください"),
    passwordConfirmation: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "パスワードが一致しません",
    path: ["passwordConfirmation"],
  });

type FormData = z.infer<typeof schema>;

const SignUp = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const navigation = useNavigation<Navigation>();
  const { setSignInUser } = UserContainer.useContainer();

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<FormData>({
    mode: "onChange",
    resolver: zodResolver(schema),
  });

  const onSubmitHandler = async (data: FormData) => {
    setIsLoading(true);
    try {
      console.log("a");

      const { user, token } = await UserAPI.signUp(data);
      console.log("b");
      await SecureStore.setItemAsync("token", token);
      console.log("c");
      setSignInUser(user);
      setIsLoading(false);
      alert("ユーザー登録しました");
      navigation.navigate("Posts", { afterPostingOrInitialVisit: true });
    } catch (error) {
      console.log(error);

      alert("ユーザー登録に失敗しました");
      setIsLoading(false);
    }
  };

  return (
    <Box flex={1} justifyContent="center" bgColor="base">
      <Center mb={8}>
        <Text fontSize="5xl" fontWeight="bold">
          My Blog
        </Text>
      </Center>
      <VStack space={4} w="80%" alignSelf="center">
        <VStack space={1}>
          <Text>名前</Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input onBlur={onBlur} onChangeText={onChange} value={value} />
            )}
            name="name"
            rules={{ required: true }}
            defaultValue=""
          />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        </VStack>
        <VStack space={1}>
          <Text>Eメール</Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input onBlur={onBlur} onChangeText={onChange} value={value} />
            )}
            name="email"
            rules={{ required: true }}
            defaultValue=""
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </VStack>
        <VStack space={1}>
          <Text>パスワード</Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                secureTextEntry
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="password"
            rules={{ required: true }}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </VStack>
        <VStack space={1}>
          <Text>パスワード確認</Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                secureTextEntry
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="passwordConfirmation"
            rules={{ required: true }}
          />
          {errors.passwordConfirmation && (
            <ErrorMessage>{errors.passwordConfirmation.message}</ErrorMessage>
          )}
        </VStack>
        <SimpleButton
          onPress={handleSubmit(onSubmitHandler)}
          disabled={!isValid}
        >
          {isLoading ? "Loading..." : "登録"}
        </SimpleButton>
        <SimpleButton
          Btype="text"
          onPress={() => navigation.navigate("SignIn")}
        >
          ログインページへ移動する
        </SimpleButton>
      </VStack>
    </Box>
  );
};

export default SignUp;
