import React, { useEffect, useState } from "react";
import { Image, ImageProps, ImageSourcePropType } from "react-native";
import defaultImage from "../../assets/img/movie_default.png"; // The PNG image
import defaultAvatar from "../../assets/img/user_default.png"; // The PNG image

interface ImageCustomProps extends Omit<ImageProps, 'source'> {
  source: ImageSourcePropType;
  type?: 'avatar' | 'movie' | 'poster'
}

export const ImageCustom: React.FC<ImageCustomProps> = (props) => {
  const [imageSource, setImageSource] = useState<ImageSourcePropType>(props.source);

  useEffect(() => {
    // console.log('URI image: ', imageSource)
  }, []);

  const onError = () => {
    setImageSource(getDefaultImage());
  };

  const getDefaultImage = () => {
    switch (props.type) {
      case 'avatar': return defaultAvatar
      default: return defaultImage
    }
  }

  return (
    <Image
      {...props}
      source={imageSource}
      onError={onError}
    />
  );
};
