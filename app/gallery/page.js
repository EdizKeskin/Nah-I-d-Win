import React from "react";
import GallerySection from "@/components/GallerySection";
import { getPaginatedDocs } from "@/lib/actions";

export default async function Gallery() {
  const {
    docs,
    error,
    lastDocId,
    status: initialBatchStatus,
    loadNoMore,
  } = await getPaginatedDocs({ lastDocId: null });

  return (
    <>
      <GallerySection
        docs={docs}
        error={error}
        lastDocId={lastDocId}
        initialBatchStatus={initialBatchStatus}
        loadNoMore={loadNoMore}
      />
    </>
  );
}
