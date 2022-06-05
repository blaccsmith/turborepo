import * as Tooltip from '@radix-ui/react-tooltip';
import { useSession } from 'next-auth/react';
import * as React from 'react';
import { useState } from 'react';
import { classNames } from 'utils';
import { Button } from './Button';
import { HeartFilledIcon, HeartIcon } from './Icons';

export const MAX_LIKED_BY_SHOWN = 50;

type LikeButtonProps = {
  likedBy: {
    user: {
      id: string;
      name: string | null;
    };
  }[];
  responsive?: boolean;
  onLike: () => void;
  onUnlike: () => void;
};

const LikeButton = ({ likedBy, responsive, onLike, onUnlike }: LikeButtonProps) => {
  const [isLikingAnimation, setIsLikingAnimation] = useState(false);
  const { data: session } = useSession();

  const isLikedByCurrentUser = Boolean(likedBy.find(item => item.user.id === session?.user.id));
  const likeCount = likedBy.length;

  function handleClick() {
    if (isLikingAnimation) {
      return;
    }

    if (isLikedByCurrentUser) {
      onUnlike();
    } else {
      setIsLikingAnimation(!isLikingAnimation);
      onLike();
      setTimeout(() => {
        setIsLikingAnimation(false);
      }, 1000);
    }
  }

  return (
    <Tooltip.Root delayDuration={300}>
      <Tooltip.Trigger
        asChild
        onClick={event => {
          event.preventDefault();
        }}
        onMouseDown={event => {
          event.preventDefault();
        }}
      >
        <Button
          variant="secondary"
          responsive={responsive}
          className={classNames(
            'space-x-1.5 overflow-hidden border-[#424242] transition-colors [transform:translateZ(0)]',
            isLikedByCurrentUser ? 'border-red-400 !bg-red-600' : '',
            isLikingAnimation ? '!border-red-600 !bg-red-600' : '',
          )}
          onClick={handleClick}
        >
          <span className="relative block h-4 w-4 shrink-0 border-[#424242]">
            {isLikedByCurrentUser && !isLikingAnimation ? (
              <HeartFilledIcon className="scale-1 absolute inset-0 text-white" />
            ) : (
              <>
                <HeartIcon
                  className={classNames(
                    'text-red absolute inset-0 transform-gpu fill-transparent transition-all',
                    isLikingAnimation ? '!scale-[12] !fill-red-600' : 'text-[#9E9E9E]',
                  )}
                />
                <span
                  className={classNames(
                    'ring-6 absolute top-0 left-[-.5px] z-10 h-4 w-4 transform-gpu rounded-full ring-inset ring-gray-50 transition-all duration-300',
                    isLikingAnimation ? 'scale-150 !ring-0' : 'scale-0',
                  )}
                />
                <HeartFilledIcon
                  className={classNames(
                    'ease-spring absolute inset-0 z-10 transform-gpu text-gray-50 transition-transform delay-200 duration-300',
                    isLikingAnimation ? 'scale-1' : 'scale-0',
                  )}
                />
              </>
            )}
          </span>

          <span
            className={classNames(
              'relative z-10 tabular-nums text-white',
              isLikingAnimation ? 'text-gray-50 transition-colors duration-100' : '',
            )}
          >
            {likeCount}
          </span>
        </Button>
      </Tooltip.Trigger>
      <Tooltip.Content
        side="bottom"
        sideOffset={4}
        className={classNames(
          'bg-secondary-inverse text-secondary-inverse max-w-[260px] rounded px-3 py-1.5 shadow-lg sm:max-w-sm',
          likeCount === 0 ? 'hidden' : '',
        )}
      >
        <p className="text-sm text-white">
          {likedBy
            .slice(0, MAX_LIKED_BY_SHOWN)
            .map(item => (item.user.id === session?.user.id ? 'You' : item.user.name))
            .join(', ')}
          {likeCount > MAX_LIKED_BY_SHOWN && ` and ${likeCount - MAX_LIKED_BY_SHOWN} more`}
        </p>
        <Tooltip.Arrow offset={22} className="fill-gray-800 dark:fill-gray-50" />
      </Tooltip.Content>
    </Tooltip.Root>
  );
};

export default LikeButton;
