import {createSupabaseClient} from "@/lib/supabaseUtils";
import {getEvents} from "@/lib/get-events";

interface Topic {
    id: number,
    text: string,
    likes: number
}

export async function getTopics(alias: string): Promise<Topic[]> {
    const supabaseClient = createSupabaseClient();
    return supabaseClient
        .from('topics')
        .select(`id, likes, text`)
        .eq("event_alias", alias)
        .order("likes", {ascending: false})
        .then(({error, data}) => {
            if (error) throw error
            return data
        });
}

export async function generateStaticParams() {
    const events = await getEvents();
    return events.map(e => ({
        alias: e.alias,
    }));
}

export default async function EventPage({params: {alias}}: { params: { alias: string } }) {
    const topics = await getTopics(alias)
    return <div>
        {topics.map(topic => (
            <div key={topic.id}>{topic.text}</div>))
        }
    </div>
}