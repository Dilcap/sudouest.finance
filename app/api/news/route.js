import { fetchGoogleNews } from "../../../lib/news";

export async function GET() {
  try {
    return Response.json({ items: await fetchGoogleNews() });
  } catch {
    return Response.json({ items: [] }, { status: 200 });
  }
}
