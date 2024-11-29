import type { NextApiRequest, NextApiResponse } from "next";
import Cerebras from "@cerebras/cerebras_cloud_sdk";

const client = new Cerebras({
  apiKey: process.env["CEREBRAS_API_KEY"],
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "POST") {
    const chatCompletion = await client.chat.completions.create({
      messages: [
        { role: "user", content: "What is happening on McGill today?" },
      ],
      model: "llama3.1-8b",
    });
    const resp = chatCompletion?.choices[0]?.message.content;
    return res.json({ data: resp });
  }
  return res.json({ data: null });
}
