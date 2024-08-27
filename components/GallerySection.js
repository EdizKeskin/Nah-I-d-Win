"use client";
import Image from "next/image";
import React, { useState, useEffect, useCallback, useRef } from "react";
import Loading from "./Loading";
import { getPaginatedDocs } from "@/lib/actions";
import { useInView } from "framer-motion";

export default function GallerySection({
  docs,
  error,
  lastDocId,
  initialBatchStatus,
  loadNoMore,
}) {
  const [data, setData] = useState({
    initialBatchStatus: initialBatchStatus || "pending",
    nextBatchStatus: "idle",
    error: error || null,
    docs: docs || [],
    lastDocId: lastDocId || null,
    loadNoMore: loadNoMore || false,
  });
  const ref = useRef();
  const isInView = useInView(ref);

  useEffect(() => {
    const getNextData = async () => {
      if (data.nextBatchStatus === "pending" || !data.lastDocId) return;

      setData({ ...data, nextBatchStatus: "pending", error: null });
      const {
        docs,
        error,
        lastDocId,
        status: nextBatchStatus,
        loadNoMore,
      } = await getPaginatedDocs({ lastDocId: data.lastDocId });

      if (error) {
        return setData({ nextBatchStatus, error });
      }

      const newDocs = [...data.docs].concat(docs);
      return setData({
        ...data,
        nextBatchStatus,
        docs: newDocs,
        lastDocId,
        loadNoMore,
      });
    };

    const fetchData = async () => {
      if (isInView) {
        await getNextData();
      }
    };

    fetchData();
  }, [isInView, data]);

  console.log(data);

  return (
    <div className="pointer-events-auto">
      <div className="grid w-full max-w-5xl min-h-screen grid-cols-1 gap-10 mx-auto my-20 md:grid-cols-3 md:px-8 justify-items-center">
        {data.initialBatchStatus === "succeeded" &&
          data.docs.map((data, index) => (
            <div
              key={data.id}
              className="relative w-10/12 overflow-hidden transition-all duration-300 ease-out bg-gray-100 rounded-lg md:w-full dark:bg-neutral-900 h-96"
            >
              <Image
                src={data.imageUrl}
                alt={data.title}
                fill
                className="absolute inset-0 object-cover"
                sizes="100%"
              />
              <p className="absolute bottom-0 left-0 right-0 p-2 text-white bg-black bg-opacity-50">
                {data.title}
              </p>
            </div>
          ))}
        <div>{data.error && <p>{data.error}</p>}</div>
      </div>

      {data.initialBatchStatus === "pending" ||
        (data.nextBatchStatus === "pending" && (
          <div className="flex justify-center w-full mb-16 -mt-12">
            <Loading />
          </div>
        ))}

      <div ref={ref} className="w-full h-1"></div>
    </div>
  );
}
