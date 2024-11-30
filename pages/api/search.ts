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
          content: `You are a general purpose expert on McGill. 
            
            This is a recent description of McGill:


            McGill University is bustling with innovative activities in student life, especially in technology and culture:

            1. Entrepreneurship and Innovation: The McGill Engine Centre has become a hub for technological entrepreneurship. Its TechAccel program showcases interdisciplinary projects, such as orthotic devices designed to alleviate chronic lower back pain and software for tracking medical device sterilization. These initiatives emphasize mentorship and funding to empower students from various faculties to bring innovative solutions to real-world problems.
            
            2. Cultural and Scientific Events: The Healthy Brains, Healthy Lives (HBHL) initiative recently hosted events like the Amazing Brain Science Talks, focusing on neuroscience innovation. These programs spotlight advanced research in brain health while engaging the student community with lectures and collaborative projects.
            
            3. Student-Led Talks and Conferences: TEDxMcGill 2024 highlighted student and alumni speakers discussing a range of topics, from health and technology to gender dynamics in professional spaces. This event underlines the university’s commitment to fostering dialogue on impactful societal issues while giving students a platform to share their insights.
            
            4. Sustainability and Smart Cities: Entrepreneurial efforts include ventures like TRAM Global, co-founded by McGill alumni, focusing on reducing carbon emissions through sustainable mobility solutions. These projects align with McGill's broader mission to integrate sustainability into urban and technological innovation.
            
            These highlights demonstrate McGill’s vibrant student life, where culture, innovation, and technology converge to create a dynamic learning environment.
            
            
            These are events happening at McGill. { "event": "Animal Therapy", "date": "2024-12-03", "time": "13:00 to 14:30", "location": "Student Services, McGill University" }, { "event": "Skills for Strategic Procrastination", "date": "2024-12-03", "time": "14:00 to 15:30", "location": "Student Services, McGill University" }, { "event": "McGill Noon-Hour Organ Series", "date": "2024-12-04", "time": "12:30 to 13:30", "location": "Redpath Hall, McGill University" }, {"event": "CréaCinq by Douze à Deux", "date": "2024-11-30", "time": "17:00 to 19:00", "location": "Building 21, McGill University"} { "event": "McGill Percussion Ensemble", "date": "2024-12-04", "time": }. Please be sure to return these events in a nice format: **Name of event** - **Date** - 5-word description.`,
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
