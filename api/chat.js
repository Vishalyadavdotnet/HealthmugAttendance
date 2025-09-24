import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { message } = req.body; // req.body not req.json() in Vercel Node
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
    });
    res.status(200).json({ reply: response.choices[0].message.content });
  } else {
    res.status(405).send("Method Not Allowed");
  }
}
