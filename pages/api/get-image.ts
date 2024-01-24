/*

A fix for firefox browser and it's derivatives where "Enhanced Tracking Protection" is turned on.
As those browsers block every requests to Twitter, even if it's just an image, I am sending an
extra request to Twitter from my API to get the image and send it to the front-end.

*/

import type { NextApiRequest as ApiReq, NextApiResponse as ApiRes } from "next";

export default async function handler(req: ApiReq, res: ApiRes) {
  try {
    const url = JSON.parse(req.body).imageUrl;
    const response = await fetch(url, { method: "get" });
    const contentType = response.headers.get("Content-Type");
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    res.status(200).json({
      imageData: "data:" + contentType + ";base64," + buffer.toString("base64"),
    });
  } catch (e: any) {
    res.status(404).json({ message: e.message });
  }
}
