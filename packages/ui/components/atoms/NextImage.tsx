import { classNames } from 'utils';
import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

export default function NextImage(props: ImageProps) {
  const [loading, setLoading] = useState(true);

  return (
    <Image
      {...props}
      alt={props.alt || 'Image'}
      className={classNames(
        'duration-300 ease-in-out',
        loading ? 'scale-110 blur-2xl' : 'scale-100 blur-0',
        props.className || '',
      )}
      objectFit="cover"
      onLoadingComplete={() => setLoading(false)}
    />
  );
}
