"use client";
import { getRandomImage } from "@/lib/actions";
import Image from "next/image";
import React, { useState } from "react";
import Loading from "./Loading";

export default function ImageSection({ initialImage }) {
  const [image, setImage] = useState(initialImage);
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    try {
      setLoading(true);
      setImage(null);
      const newImage = await getRandomImage();
      setImage(newImage);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching new image:", error);
    }
  };

  return (
    <div className="flex flex-col gap-6 pointer-events-auto">
      {loading && (
        <div className="relative w-96 h-96">
          <div className="absolute inset-0 flex items-center justify-center w-full h-full ">
            <Loading />
          </div>
        </div>
      )}
      {image && (
        <div className="relative w-96 h-96">
          <Image
            src={image}
            alt="gojo"
            fill
            className="object-contain"
            sizes="100%"
          />
        </div>
      )}
      <button
        className="relative block w-full px-5 py-3 text-sm font-medium text-white bg-indigo-600 rounded-lg disabled:opacity-50 disabled:pointer-events-none hover:cursor-pointer"
        onClick={handleClick}
        disabled={loading}
      >
        Get another Nah I&apos;d Win
      </button>
    </div>
  );
}
