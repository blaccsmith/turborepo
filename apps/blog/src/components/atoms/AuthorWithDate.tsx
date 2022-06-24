/* eslint-disable jsx-a11y/anchor-is-valid */
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import Link from 'next/link';
import BlogAvatar from '@/components/atoms/BlogAvatar';
import type { Author } from '@/lib/types';

type AuthorWithDateProps = {
  author: Author;
  date: Date;
};

const AuthorWithDate = ({ author, date }: AuthorWithDateProps) => (
  <div className="flex items-center gap-2 sm:gap-4">
    <Link href={`/profile/${author.id}`}>
      <a className="relative inline-flex">
        <span className="hidden sm:flex">
          <BlogAvatar name={author.name!} src={author.image} />
        </span>
        <span className="flex sm:hidden">
          <BlogAvatar name={author.name!} src={author.image} size="sm" />
        </span>
      </a>
    </Link>
    <div className="flex-1 text-sm sm:text-base">
      <div>
        <Link href={`/profile/${author.id}`}>
          <a className="hover:text-brand-purple-400 font-medium tracking-tight text-white transition-colors">
            {author.name}
          </a>
        </Link>
      </div>

      <p className="tracking-tight text-[#bdbdbd]">
        <time dateTime={date.toString()}>{formatDistanceToNow(new Date(date))}</time> ago
      </p>
    </div>
  </div>
);

export default AuthorWithDate;
