import { createClient } from "contentful";

const publishedClient = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});

const previewClient = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW_ACCESS_TOKEN,
  host: "preview.contentful.com",
});

export async function getHomePage({ preview = false } = {}) {
  const client = preview ? previewClient : publishedClient;
  const entries = await client.getEntries({
    content_type: "homePage",
  });
  const homePage = entries.items.find((e) => e.fields.title === "Home Page");
  return homePage;
}

export async function getMemos({ preview = false } = {}) {
  const client = preview ? previewClient : publishedClient;
  const entries = await client.getEntries({
    content_type: "memos",
  });
  return entries.items;
}

export async function getSingleMemo({ preview = false, id } = {}) {
  const client = preview ? previewClient : publishedClient;
  const entry = await client.getEntry(id);
  return entry;
}

export async function getFeelingList({ preview = false } = {}) {
  const client = preview ? previewClient : publishedClient;
  const entries = await client.getEntries({
    content_type: "feelingList",
  });
  const feelingList = entries.items.find(
    (e) => e.fields.title === "Feeling List"
  );
  return feelingList;
}
