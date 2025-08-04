import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { messages } = req.body;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are a helpful AI that gives budgeting and finance advice to Gen Z users. Be friendly and clear." },
        ...messages,
      ],
    }),
  });

  const data = await response.json();
  const message = data.choices[0].message.content;
  res.status(200).json({ message });
}
