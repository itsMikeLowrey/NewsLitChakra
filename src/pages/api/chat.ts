import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

type Message = {
  role: "system" | "user" | "assistant";
  content: string;
};

type ChatGPTRequest = {
  messages: Message[];
  password: string;
};

type ChatGPTResponse = {
  data: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { messages, password }: ChatGPTRequest = req.body;

  if (password !== process.env.API_PASSWORD) {
    return res.status(403).json({ error: "Invalid password" });
  }

  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: "Invalid or missing messages array" });
  }

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4",
        messages,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      },
    );

    const responseData: ChatGPTResponse = response.data;

    return res.status(200).json({ responseData, messages} ) ;
  } catch (error: any) {
    console.error("Error accessing OpenAI API:", error.response?.data || error);

    return res.status(500).json({
      error: "Error accessing OpenAI API",
      details: error.response?.data || error.message,
    });
  }
}
