'use client';

import { classNames } from '@/lib/classnames';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';

interface Props {
  events: {
    name: string;
    alias: string;
  }[];
}

export default function Navigation({ events }: Props) {
  const segment = useSelectedLayoutSegment();

  return (
    <ul className={`mx-auto flex max-w-fit gap-1 rounded-lg border border-gray-100 p-1 shadow-sm`}>
      {events.map(event => {
        const isActive = segment === event.alias;
        return (
          <Link
            as={event.alias === 'code-and-tell' ? '/' : undefined}
            href={`/${event.alias}`}
            key={event.alias}
            className={classNames(
              isActive ? 'bg-gray-100' : '',
              'w-fit rounded-md px-2  text-center text-gray-500 transition-all',
            )}
          >
            {event.name}
          </Link>
        );
      })}
    </ul>
  );
}
