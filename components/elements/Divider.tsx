import React from "react";
import { Divider as NBDivider, Box } from "native-base";

const getSpacingSize = (spacing: "sm" | "md" | "lg") => {
  switch (spacing) {
    case "sm":
      return 2;
    case "md":
      return 4;
    case "lg":
      return 8;
  }
};

const Divider = ({ spacing = "md" }: { spacing?: "sm" | "md" | "lg" }) => {
  const spacingSize = getSpacingSize(spacing);
  return (
    <Box my={spacingSize}>
      <NBDivider borderColor="main" />
    </Box>
  );
};

export default Divider;
