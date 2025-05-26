"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Cookie from "js-cookie";
import { cookieKeys } from "@/config/cookies.config";

const HomePage = () => {
  const router = useRouter();

  const [text, setText] = useState("");
  const fullText = "Let your voice echo through writing...";
  const [showButtons, setShowButtons] = useState(false);
  const [showIntro, setShowIntro] = useState(false);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setText(fullText.substring(0, index));
      index++;

      if (index > fullText.length) {
        clearInterval(interval);
        setTimeout(() => {
          setShowButtons(true), setShowIntro(true);
        }, 1000);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <nav className="w-full bg-white shadow-md border-b border-gray-300">
        <div className="max-w-7xl mx-auto px-6 md:px-16 py-4 flex items-center justify-between">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-black/95  text-transparent bg-clip-text tracking-tight">
            EchoWrite
          </h1>

          <div className="space-x-4">
            <button
              onClick={() => {
                const token = Cookie.get(cookieKeys.USER_TOKEN);
                if (token) {
                  alert("You're already logged in!");
                } else {
                  router.push("/login");
                }
              }}
              className="px-6 py-2 rounded-2xl bg-gradient-to-r from-purple-700 to-gray-800 text-white font-semibold shadow-md hover:from-purple-600 hover:to-gray-700 transition-all duration-300 cursor-pointer"
            >
              Login
            </button>

            <button
              onClick={() => {
                const token = Cookie.get(cookieKeys.USER_TOKEN);
                if (token) {
                  alert("You're already registered!");
                } else {
                  router.push("/register");
                }
              }}
              className="px-6 py-2 rounded-2xl bg-gradient-to-r from-purple-700 to-gray-800 text-white font-semibold shadow-md hover:from-purple-600 hover:to-gray-700 transition-all duration-300 cursor-pointer"
            >
              Register
            </button>
          </div>
        </div>
      </nav>

      <div className="flex flex-col items-center justify-start bg-gray-100 px-4 pt-20 pb-16 min-h-[calc(100vh-80px)]">
        <h1
          className="text-center text-4xl md:text-5xl font-extrabold  bg-gradient-to-r from-purple-600 via-gray-500 to-purple-700 
            text-transparent  bg-clip-text  drop-shadow-lg tracking-wide mb-8 font-mono"
        >
          {text}
        </h1>

        {showIntro && (
          <p className="text-lg md:text-xl text-gray-700 text-center max-w-xl mx-auto italic font-light leading-relaxed drop-shadow-sm mb-10">
            "Discover, Share, and Inspire. Dive into a world of ideas,
            experiences, and creativity. Whether you're here to write your story
            or explore others’, 'EchoWrite' is your space to connect through
            words."
          </p>
        )}

        {showButtons && (
          <div className="flex gap-4">
            <button
              onClick={() => router.push("/blog")}
              className="px-6 py-3 rounded-lg bg-gray-600 text-white hover:bg-gray-700 transition hover:-translate-y-0.5"
            >
              View Blogs
            </button>
            <button
              onClick={() => {
                const token = Cookie.get(cookieKeys.USER_TOKEN);
                if (!token) {
                  alert("Please log in to create a blog.");
                  return;
                }
                router.push("/blog/create");
              }}
              className="px-6 py-3 rounded-lg bg-gray-600 text-white hover:bg-gray-700 transition hover:-translate-y-0.5"
            >
              Create Blog
            </button>
          </div>
        )}

        <div>
          <button
            onClick={() => {
              const confirmLogout = window.confirm(
                "Are you sure you want to logout?"
              );
              if (confirmLogout) {
                Cookie.remove(cookieKeys.USER_TOKEN);
                alert("You have been logged out.");
                router.push("/login");
              }
            }}
            className="fixed bottom-6 left-1/2 transform -translate-x-1/2 text-red-500 hover:text-red-700 transition px-1.5 py-0.5 bg-white border border-red-500 hover:bg-red-300 hover:-translate-y-0.5 rounded-full z-50"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
