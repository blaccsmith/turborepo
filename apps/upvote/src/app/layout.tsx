import './globals.css';
import Navigation from './ui/navigation';
import { SupabaseClient } from '@supabase/supabase-js';

const getEvents = async () => {
  const supabaseClient = new SupabaseClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
  );
  return supabaseClient
    .from('events')
    .select(`id, name, alias`)
    .then(({ data, error }) => {
      if (error) throw error;
      return data;
    });
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
      <body className="flex h-full flex-col bg-black">
        <div className="h-full min-h-screen w-full space-y-6 bg-white p-16">
          <Navigation events={events} />
          {children}
        </div>
      </body>
    </html>
  );
}
