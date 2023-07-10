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

const schema = z.object({
  email: z
    .string()
    .min(1, { message: "入力必須です" })
    .email({ message: "メールアドレスの形式で入力してください" }),
  password: z.string().min(1, { message: "入力必須です" }),
});

type FormData = z.infer<typeof schema>;

const SignIn = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const navigation = useNavigation<Navigation>();
  const { setSignInUser } = UserContainer.useContainer();

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    console.log({ isValid });
    console.log({ errors });
  }, [isValid, errors]);

  const onSubmitHandler = async (data: FormData) => {
    setIsLoading(true);
    try {
      const { user, token } = await UserAPI.signIn(data);
      await SecureStore.setItemAsync("token", token);
      setSignInUser(user);
      setIsLoading(false);
      alert("ログインしました");
      navigation.navigate("Posts", { afterPostingOrInitialVisit: true });
    } catch (error) {
      alert("ログインに失敗しました");
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
            defaultValue=""
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </VStack>
        <SimpleButton
          onPress={handleSubmit(onSubmitHandler)}
          disabled={!isValid}
        >
          {isLoading ? "Loading..." : "ログイン"}
        </SimpleButton>
        <SimpleButton
          Btype="text"
          onPress={() => navigation.navigate("SignUp")}
        >
          登録ページへ移動する
        </SimpleButton>
      </VStack>
    </Box>
  );
};

export default SignIn;
