import type { NextApiRequest, NextApiResponse } from "next";
import Cerebras from "@cerebras/cerebras_cloud_sdk";

const client = new Cerebras({
  apiKey: process.env["CEREBRAS_API_KEY"],
});

type modelResp = {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "POST") {
    console.log(req.body);
    const chatCompletion = await client.chat.completions.create({
      messages: [{ role: "user", content: req.body.content }],
      model: "llama3.1-8b",
    });
    const tmp: any = chatCompletion as modelResp;
    const resp = tmp?.choices[0].message.content;
    return res.json({ content: resp });
  }
  return res.json({ content: null });
}
