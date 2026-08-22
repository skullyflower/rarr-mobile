import { useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { Image, type ImageLoadEventData } from 'expo-image';

import theComics from '@/lib/comics';

interface GetImageProps {
  imgPath: string;
  altText: string;
  wide?: boolean;
  maxWidth?: number;
}

export default function GetImage({ imgPath, altText, wide, maxWidth }: GetImageProps) {
  const { width: windowWidth } = useWindowDimensions();
  const [aspectRatio, setAspectRatio] = useState(1.5);
  const source = theComics[imgPath] ?? theComics.Fallback;

  const naturalWidth = wide ? 1000 : 500;
  const width = Math.min(naturalWidth, maxWidth ?? windowWidth - 32, windowWidth - 32);

  return (
    <Image
      source={source}
      accessibilityLabel={altText}
      style={{ width, aspectRatio }}
      contentFit="contain"
      onLoad={(event: ImageLoadEventData) => {
        const { width: w, height: h } = event.source;
        if (w && h) setAspectRatio(w / h);
      }}
    />
  );
}
