import { createSupabaseClient } from '@/lib/supabaseUtils';
import { getEvents } from '@/lib/get-events';
import { Topic as TopicType } from '@/lib/types';
import Topic from './ui/topic';

export async function getTopics(alias: string): Promise<TopicType[]> {
  const supabaseClient = createSupabaseClient();
  return supabaseClient
    .from('topics')
    .select(`id, likes, text`)
    .eq('event_alias', alias)
    .order('likes', { ascending: false })
    .then(({ error, data }) => {
      if (error) throw error;
      return data;
    });
}

export async function generateStaticParams() {
  const events = await getEvents();
  return events.map(e => ({
    alias: e.alias,
  }));
}

export default async function EventPage({ params: { alias } }: { params: { alias: string } }) {
  const topics = await getTopics(alias);
  
  return (
    <ul className="mx-auto flex max-w-lg flex-col gap-3">
      {topics.map(topic => (
        <Topic key={topic.id} {...topic} />
      ))}
    </ul>
  );
}
