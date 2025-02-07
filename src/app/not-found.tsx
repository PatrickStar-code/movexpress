"use client";
import Link from "next/link";
import React, { useEffect } from "react";

export default function NotFound() {
  useEffect(() => {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    document.documentElement.classList.add(prefersDark ? "dark" : "light");
  });

  return (
    <main className="h-screen w-full flex flex-col justify-center items-center bg-background">
      <h1 className="text-9xl font-extrabold text-black dark:text-white tracking-widest">
        404
      </h1>
      <div className="bg-[#FF6A3D] px-2 text-sm rounded rotate-12 absolute">
        Page Not Found
      </div>
      <Link href="/">
        <button className="mt-5">
          <p className="relative inline-block text-sm font-medium text-[#FF6A3D] group active:text-orange-500 focus:outline-none focus:ring">
            <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#FF6A3D] group-hover:translate-y-0 group-hover:translate-x-0"></span>

            <span className="relative block px-8 py-3 bg-[#1A2238] border border-current">
              Go
            </span>
          </p>
        </button>
        Home
      </Link>
    </main>
  );
}
