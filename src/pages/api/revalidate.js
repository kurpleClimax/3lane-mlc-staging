import { getPageUri } from "@/utils/helpers";
import axios from "axios";

export default async function handler(req, res) {
  const {
    body: { post },
  } = req;

  // Authorization check
  if (
    req.headers.authorization !== `Bearer ${process.env.REVALIDATE_SECRET_KEY}`
  ) {
    console.warn("Unauthorized revalidation attempt");
    return res.status(401).json({ message: "Invalid token" });
  }

  // Trigger redeploy
  try {
    await axios.get(process.env.REDEPLOY_URL);
  } catch (error) {
    console.error("Error triggering redeploy:", error.message);
    return res.status(500).json({ message: "Failed to trigger redeploy" });
  }

  // Validate post data
  if (!post || !post.uri || !post.slug || !post.type) {
    return res.status(400).json({ message: "Invalid post data" });
  }

  try {
    const { uri, slug, type } = post;

    // Get actual path for revalidation
    const actualPath = await getPageUri(uri, slug, type);

    // Revalidate the specified path
    await res.revalidate(actualPath);
    return res.json({ revalidated: true });
  } catch (err) {
    console.error("Revalidation error:", err.message);
    return res.status(500).send("Error revalidating");
  }
}
