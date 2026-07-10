import { XMLParser } from "fast-xml-parser";

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "",
});

function normalizeItems(items = []) {
  return items.slice(0, 8).map((item) => ({
    title: item.title || "",
    link: item.link || "",
    snippet: item.description || "",
    source: item.source?.["#text"] || item.source || "Google News",
    pubDate: item.pubDate || "",
  }));
}

export async function fetchGoogleNews() {
  const query =
    "M&A OR acquisition OR cession OR fusion OR buyout Sud-Ouest France";
  const url = `https://news.google.com/rss/search?q=${encodeURIComponent(
    query
  )}&hl=fr&gl=FR&ceid=FR:fr`;

  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0",
    },
    next: { revalidate: 1800 },
  });

  if (!res.ok) return [];

  const xml = await res.text();
  const parsed = parser.parse(xml);
  const channel = parsed?.rss?.channel;
  const items = Array.isArray(channel?.item)
    ? channel.item
    : channel?.item
    ? [channel.item]
    : [];

  return normalizeItems(items);
}
