import React, { useEffect } from "react";
import { AspectRatio, Box, Image } from "native-base";

const Base64Image = ({ base64Image }: { base64Image?: string }) => {
  console.log(require("../../assets/images/no_image_yoko.jpg"));
  console.log();

  const src = base64Image
    ? { uri: `data:image/jpeg;base64,${base64Image}` }
    : require("../../assets/images/no_image_yoko.jpg");

  return (
    <AspectRatio ratio={1.6}>
      <Box flex={1}>
        <Image
          source={src}
          alt="画像が表示出来ません"
          resizeMode="cover"
          width="100%"
          height="100%"
        />
      </Box>
    </AspectRatio>
  );
};

export default Base64Image;
