import type { NextApiRequest, NextApiResponse } from "next";

interface APIResponse {
  data: object;
}

interface ErrorResponse {
  error: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<APIResponse | ErrorResponse>,
) {
  try {
    const { urls } = req.body;

    const response = await fetch("https://api.2markdown.com/v1/url2md", {
      method: "POST",
      headers: {
        "X-Api-Key": process.env.MARKDOWNPASSWORD || "",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: urls,
      }),
    });

    const result = await response.json();

    return res.status(200).json({ data: result });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";

    console.error("Error fetching data:", errorMessage);

    return res.status(500).json({
      error: `Failed to fetch data from the provided link. ${errorMessage}`,
    });
  }
}
