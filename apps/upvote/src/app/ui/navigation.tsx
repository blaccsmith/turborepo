import React from 'react';

interface Props {
  events: string[];
}

export default function Navigation({ events }: Props) {
  return (
    <ul>
      {events.map(event => (
        <li key={event}>{event}</li>
      ))}
    </ul>
  );
}
