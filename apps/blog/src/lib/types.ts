import { User } from '@prisma/client';

export type Author = Pick<User, 'id' | 'name' | 'image'>;
