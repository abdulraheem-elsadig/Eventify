/**
 * @api {GET} /api/revalidate Revalidate a static page
 * @description Triggers on-demand static regeneration for a given path.
 *
 * @queryparam {string} path - The path of the page to revalidate (e.g., /event/1).
 *
 * @example
 * GET /api/revalidate?path=/event/1
 *
 * @response
 * 200: { revalidated: true }
 * 400: { message: "Missing path" }
 * 500: { error: "Error revalidating" }
 */
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const path = req.query.path as string;

  if (!path) {
    return res.status(400).json({ message: "Missing path" });
  }

  try {
    await res.revalidate(path); // e.g., /event/1
    return res.status(200).json({ revalidated: true });
  } catch (err) {
    return res.status(500).json({ error: "Error revalidating" });
  }
}
