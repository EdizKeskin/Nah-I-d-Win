import Link from "next/link";
import React from "react";
import { HiPlus } from "react-icons/hi";
import { BiHome, BiImages, BiLogoGithub } from "react-icons/bi";

export default function Footer() {
  return (
    <div className="fixed bottom-0 right-0 flex flex-row-reverse items-end gap-5 mx-5">
      <div className="tooltip-container ">
        <span className="tooltip">Home</span>
        <Link
          className="inline-block p-3 text-white bg-indigo-600 border border-indigo-600 rounded-full hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
          href="/"
        >
          <BiHome size={24} />
        </Link>
      </div>
      <div className="tooltip-container">
        <span className="tooltip">Upload</span>
        <Link
          className="inline-block p-3 text-white bg-indigo-600 border border-indigo-600 rounded-full hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
          href="/upload"
        >
          <HiPlus size={24} />
        </Link>
      </div>

      <div className="tooltip-container">
        <span className="tooltip">Gallery</span>
        <Link
          className="inline-block p-3 text-white bg-indigo-600 border border-indigo-600 rounded-full hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
          href="/gallery"
        >
          <BiImages size={24} />
        </Link>
      </div>

      <div className="tooltip-container">
        <span className="tooltip">Github</span>
        <Link
          className="inline-block p-3 text-white bg-indigo-600 border border-indigo-600 rounded-full hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
          href="https://github.com/EdizKeskin/Nah-I-d-Win"
        >
          <BiLogoGithub size={24} />
        </Link>
      </div>
    </div>
  );
}
