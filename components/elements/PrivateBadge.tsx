import React from "react";
import { Text, Box } from "native-base";

const PrivateBadge = ({ hidden = false }: { hidden?: boolean }) => {
  return (
    <Box
      position="absolute"
      top={0}
      right={0}
      zIndex={10}
      bg="alert"
      py={2}
      px={4}
      display={hidden ? "none" : "flex"}
    >
      <Text color="base_text" fontWeight="bold">
        非公開
      </Text>
    </Box>
  );
};

export default PrivateBadge;
