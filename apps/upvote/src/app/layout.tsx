import './globals.css';
import Navigation from './ui/navigation';

const getEvents = async () => {
  return ['event1', 'event2'];
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const events = await getEvents();

  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <Navigation events={events} />
        {children}
      </body>
    </html>
  );
}
