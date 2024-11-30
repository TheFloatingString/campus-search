import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env["CEREBRAS_API_KEY"],
  baseURL: "https://cerebras.helicone.ai/v1",
  defaultHeaders: {
    "Helicone-Auth": process.env["HELICONE_API_BEARER"],
  },
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
      messages: [
        {
          role: "system",
          content:
            'These are events happening at McGill. { "event": "Animal Therapy", "date": "2024-12-03", "time": "13:00 to 14:30", "location": "Student Services, McGill University" }, { "event": "Skills for Strategic Procrastination", "date": "2024-12-03", "time": "14:00 to 15:30", "location": "Student Services, McGill University" }, { "event": "McGill Noon-Hour Organ Series", "date": "2024-12-04", "time": "12:30 to 13:30", "location": "Redpath Hall, McGill University" }, {"event": "CréaCinq by Douze à Deux", "date": "2024-11-30", "time": "17:00 to 19:00", "location": "Building 21, McGill University"} { "event": "McGill Percussion Ensemble", "date": "2024-12-04", "time": }. Please be sure to return these events in a nice format: **Name of event** - **Date** - 5-word description.',
        },
        { role: "user", content: req.body.content },
      ],
      model: "llama3.1-8b",
    });
    const tmp: any = chatCompletion as modelResp;
    const resp = tmp?.choices[0].message.content;
    return res.json({ content: resp });
  }
  return res.json({ content: null });
}
