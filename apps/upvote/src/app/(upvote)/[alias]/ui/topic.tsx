import { Topic as TopicType } from '@/lib/types';
import VoteButton from './vote-button';

export default function Topic({ id, likes, text }: TopicType) {
  return (
    <div className="flex items-center justify-between rounded-lg py-2 pl-6 pr-3 shadow">
      <span>{text}</span>
      <div className="flex items-center gap-4">
        <span>{likes}</span>
        <div className="flex flex-col justify-center gap-1">
          <VoteButton upvote topicId={id} />
          <VoteButton topicId={id} />
        </div>
      </div>
    </div>
  );
}
