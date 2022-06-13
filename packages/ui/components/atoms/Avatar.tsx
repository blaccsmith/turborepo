import { Session } from 'next-auth';
import NextImage from './NextImage';

type Props = {
  user: Session['user'];
  size: number;
};

export default function Avatar({ user, size }: Props) {
  return (
    <div className={`relative flex items-center overflow-hidden rounded-full h-${size} w-${size}`}>
      {!user!.image ? (
        <span
          className={`inline-flex h-full w-full items-center justify-center rounded-full bg-gray-500`}
        >
          <span className="text-xs font-medium leading-none text-white">{user?.name![0]}</span>
        </span>
      ) : (
        <NextImage
          width={size * 4}
          height={size * 4}
          className={`inline-block h-${size} w-${size} rounded-full`}
          src={user!.image}
          alt="user avatar"
          
        />
      )}
    </div>
  );
}
