import { getEvents } from '@/lib/get-events';

export async function generateStaticParams() {
  const events = await getEvents();

  return events.map(e => ({
    alias: e.alias,
  }));
}

export default function EventPage() {
  return <div>Chill topics</div>;
}
