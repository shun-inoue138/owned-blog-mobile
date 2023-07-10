import { Text } from "native-base";
import React, { FC, ReactNode } from "react";

const ErrorMessage: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Text color="alert" fontWeight="semibold" pt={1} fontSize="xs">
      {children}
    </Text>
  );
};

export default ErrorMessage;
