import { bool, envsafe, invalidEnvError, makeValidator, str, url } from 'envsafe';
import { browserEnv } from './browser';

if (process.browser) {
  throw new Error('This should only be included on the client (but the env vars wont be exposed)');
}

const cloudinaryParser = makeValidator<string>(input => {
  if (browserEnv.NEXT_PUBLIC_ENABLE_IMAGE_UPLOAD && input === '') {
    throw invalidEnvError('cloudinary config', input);
  }
  return input;
});

export const serverEnv = {
  ...browserEnv,
  ...envsafe({
    CLOUDINARY_CLOUD_NAME: cloudinaryParser({ allowEmpty: true, default: '' }),
    CLOUDINARY_API_KEY: cloudinaryParser({ allowEmpty: true, default: '' }),
    CLOUDINARY_API_SECRET: cloudinaryParser({ allowEmpty: true, default: '' }),
  }),
};
