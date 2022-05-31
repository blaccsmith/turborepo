import { bool, envsafe } from 'envsafe';

const browserEnv = envsafe({
  NEXT_PUBLIC_ENABLE_IMAGE_UPLOAD: bool({
    input: process.env.NEXT_PUBLIC_ENABLE_IMAGE_UPLOAD,
    default: false,
  }),
});

export default browserEnv;
