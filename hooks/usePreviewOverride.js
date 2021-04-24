import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function usePreviewOverride(originalEntry, entryFetcher) {
  const router = useRouter();
  const { preview } = router.query;

  const [previewEntry, setPreviewEntry] = useState(null);
  useEffect(() => {
    if (preview) {
      entryFetcher({ preview: true }).then(setPreviewEntry);
    } else {
      setPreviewEntry(null);
    }
  }, [preview]);

  return previewEntry || originalEntry;
}

export default usePreviewOverride;
