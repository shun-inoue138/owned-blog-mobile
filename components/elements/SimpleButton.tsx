import React, { FC, ReactNode } from "react";
import { Button, useTheme, IButtonProps } from "native-base";

type SimpleButtonProps = Omit<IButtonProps, "startIcon" | "endIcon"> & {
  children: ReactNode;
  Btype?: "success" | "info" | "alert" | "text" | "main";
  disabled?: boolean;
};

const SimpleButton: FC<SimpleButtonProps> = ({
  children,
  Btype = "main",
  disabled = false,
  onPress,
  ...restProps
}) => {
  console.log(onPress);

  const theme = useTheme();
  const getBTypeStyle = () => {
    switch (Btype) {
      case "success":
        return {
          bg: theme.colors.success,
          _pressed: {
            bg: theme.colors.success,
          },
          _text: {
            color: theme.colors.base_text,
            fontWeight: "bold",
          },
        };
      case "info":
        return {
          bg: theme.colors.info,
          _pressed: {
            bg: theme.colors.info,
          },

          _text: {
            color: theme.colors.base_text,
            fontWeight: "bold",
          },
        };
      case "alert":
        return {
          bg: theme.colors.alert,
          _pressed: {
            bg: theme.colors.alert,
          },
          _text: {
            color: theme.colors.base_text,
            fontWeight: "bold",
          },
        };
      case "text":
        return {
          bg: theme.colors.base,
          _pressed: {
            bg: theme.colors.base,
          },
          _text: {
            color: theme.colors.main_text,
            fontWeight: "bold",
          },
        };
      case "main":
      default:
        return {
          bg: theme.colors.main,
          _pressed: {
            bg: theme.colors.main,
          },
          _text: {
            color: theme.colors.base_text,
            fontWeight: "bold",
          },
        };
    }
  };

  const _disabledStyle = disabled ? { opacity: 0.4 } : {};

  return (
    <Button
      py={2}
      px={6}
      borderRadius="md"
      {...getBTypeStyle()}
      isDisabled={disabled}
      _disabled={_disabledStyle}
      onPress={onPress}
      {...restProps}
    >
      {children}
    </Button>
  );
};

export default SimpleButton;
