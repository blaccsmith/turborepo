import RSS from 'rss';
import { NextApiRequest, NextApiResponse } from 'next';
import { writeFile } from 'fs/promises';
import { InferQueryOutput } from '@/lib/trpc';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { headers } = req;

  const {
    result: {
      data: { json },
    },
  } = await fetch(`${headers.origin}/api/trpc/post.feed`).then(resp => resp.json());

  const { posts }: InferQueryOutput<'post.feed'> = json;

  const feed = new RSS({
    title: 'BLACC',
    site_url: 'https://blog.blacc.xyz/',
    feed_url: 'https://blog.blacc.xyz/feed.xml',
    description: 'BLACC Posts',
  });

  posts?.forEach(({ title, author, createdAt, slug }) => {
    feed.item({
      title,
      description: `${title} by ${author}`,
      url: `https://blog.blacc.xyz/${slug}`,
      author: author.name as string,
      date: createdAt,
    });
  });

  await writeFile('./public/feed.xml', feed.xml({ indent: true }), { flag: 'a+' });

  res.status(200).json({ status: 200, message: 'success' });
}
