import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const username = req.query.username;

    const response = await fetch(
      `https://discord.com/api/v9/guilds/${DISCORD_GUILD_ID}/members/search?query=${username}&limit=1000`,
      {
        headers: {
          Authorization: `Bot ${DISCORD_TOKEN}`,
        },
      }
    );

    const searchResults = await response.json();

    const isMember = searchResults.some(
      (result) => result.user.username === username
    );

    res.status(200).json(isMember);
  }
}
