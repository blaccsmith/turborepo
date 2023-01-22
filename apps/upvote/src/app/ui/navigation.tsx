import Link from 'next/link';
import React from 'react';

interface Props {
  events: {
    id: string;
    name: string;
    alias: string;
  }[];
}

export default function Navigation({ events }: Props) {
  return (
    <ul className={`mx-auto flex max-w-fit gap-1 rounded-lg border border-gray-100 p-1 shadow-sm`}>
      {events.map(event => (
        <Link
          href={`/${event.alias}`}
          key={event.id}
          className=" w-fit rounded-md bg-gray-100 px-2 text-center text-gray-500"
        >
          {event.name}
        </Link>
      ))}
    </ul>
  );
}
