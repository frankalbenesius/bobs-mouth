import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Head from "next/head";
import Link from "next/link";

import usePreviewOverride from "../hooks/usePreviewOverride";
import { getFeelingList, getHomePage, getMemos } from "../lib/content";

export async function getStaticProps() {
  const homePageEntry = await getHomePage();
  const feelingListEntry = await getFeelingList();
  const memoEntries = await getMemos();
  return {
    props: {
      homePageEntry,
      memoEntries,
      feelingListEntry,
    },
  };
}

export default function Home({ homePageEntry, memoEntries, feelingListEntry }) {
  const homePage = usePreviewOverride(homePageEntry, getHomePage);
  const memos = usePreviewOverride(memoEntries, getMemos);
  const feelingList = usePreviewOverride(feelingListEntry, getFeelingList);

  return (
    <div className="container">
      <Head>
        <title>BOB'S MOUTH</title>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>👄</text></svg>"
        />
      </Head>

      <main>
        <h1>{homePage.fields.header}</h1>
        <div>{documentToReactComponents(homePage.fields.body)}</div>

        <div className="feelings">
          <h3>FEELINGS:</h3>
          <div>
            {feelingList.fields.feelings.map((feeling) => (
              <div key={feeling.sys.id}>
                <div>{feeling.fields.label}</div>
                <img src={feeling.fields.image.fields.file.url} />
              </div>
            ))}
          </div>
        </div>
      </main>

      <aside>
        <header>memos</header>
        <ul>
          {memos.map((memo) => (
            <li key={memo.sys.id}>
              <Link href={`/memos/${memo.sys.id}`}>{memo.fields.title}</Link>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
