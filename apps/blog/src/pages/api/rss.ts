import RSS from 'rss';
import { writeFileSync } from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';

interface FeedData {
  title: string;
  author: string;
  description: string;
  slug: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { body, method } = req;

  if (method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ status: 405, message: 'Method not allowed' });
    return;
  }

  const { title, author, description, slug }: FeedData = body;

  console.log({ title, author, description, slug });

  const feed = new RSS({
    title: 'BLACC',
    site_url: 'https://blog.blacc.xyz/',
    feed_url: 'https://blog.blacc.xyz/feed.xml',
  });

  feed.item({
    title,
    author,
    url: `https://blog.blacc.xyz/blog/${slug}`,
    date: new Date(),
    description,
  });

  console.log({ feed });

  writeFileSync('./public/feed.xml', feed.xml({ indent: true }));

  res.status(200).json({ status: 200, message: 'success' });
}
