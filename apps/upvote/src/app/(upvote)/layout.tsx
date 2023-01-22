import { getEvents } from '@/lib/get-events';
import React from 'react';
import Navigation from '../ui/navigation';

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const events = await getEvents();

  return (
    <div className="h-full min-h-screen w-full space-y-6 bg-white p-16">
      <Navigation events={events} />
      {children}
    </div>
  );
}
