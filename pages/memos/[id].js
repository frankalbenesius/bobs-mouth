import Link from "next/link";
import { useRouter } from "next/router";
import usePreviewOverride from "../../hooks/usePreviewOverride";
import { getMemos, getSingleMemo } from "../../lib/content";

export async function getStaticPaths() {
  const memos = await getMemos();
  return {
    paths: memos.map((memo) => ({ params: { id: memo.sys.id } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { id } = params;
  const memoEntry = await getSingleMemo({ id });
  return {
    props: {
      memoEntry,
    },
  };
}
const Memo = ({ memoEntry }) => {
  const router = useRouter();
  const { id } = router.query;

  const memo = usePreviewOverride(memoEntry, () =>
    getSingleMemo({ id, preview: true })
  );

  return (
    <div>
      <div className="back">
        <Link href="/">Back</Link>
      </div>
      <main>
        <h1>MEMO</h1>
        <h2>{memo.fields.title}</h2>
        <sub>{memo.fields.timestamp}</sub>
        <div>{memo.fields.body}</div>
      </main>
    </div>
  );
};

export default Memo;
