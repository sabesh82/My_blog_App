"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import useGetBlogs from "@/api-clients/blog/useGetBlogs";
import { useDeleteBlog } from "@/api-clients/blog/useDeleteBlog";

export default function BlogPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentSearch = searchParams.get("search") || "";
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const currentSize = parseInt(searchParams.get("size") || "5", 10);

  const [searchInput, setSearchInput] = useState(currentSearch);
  const { mutate: deleteBlog } = useDeleteBlog();
  // Debounce input and update URL
  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("search", searchInput);
      params.set("page", "1"); // Reset to first page on new search
      router.replace(`/blog?${params.toString()}`);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchInput]);

  const options = useMemo(() => {
    return {
      page: currentPage,
      size: currentSize,
      search: currentSearch,
    };
  }, [currentPage, currentSize, currentSearch]);

  const { data: blogs, isPending: isBlogsLoading } = useGetBlogs(options);

  const numberOfPages = useMemo(() => {
    const count = blogs?.count || 0;
    return Math.ceil(count / options.size);
  }, [blogs, options.size]);

  return (
    <section className="w-full h-dvh overflow-hidden flex flex-col bg-gray-100 p-5">
      <div className="w-full max-w-4xl mx-auto border border-gray-300 rounded-3xl p-6 bg-white shadow-lg flex-1 overflow-y-auto space-y-6">
        <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-purple-600 to-black/95  text-transparent bg-clip-text">
          Blog Posts
        </h1>

        <input
          type="search"
          placeholder="Search blogs..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300"
        />

        {isBlogsLoading && (
          <p className="text-center text-gray-500 animate-pulse">
            Loading blogs...
          </p>
        )}

        {!isBlogsLoading && blogs?.items.length === 0 && (
          <p className="text-center text-gray-500">No blogs found.</p>
        )}

        <div className="w-full flex flex-col gap-6">
          {!isBlogsLoading &&
            blogs?.items.map((blog) => (
              <div
                key={blog.id}
                className="relative p-6 rounded-2xl bg-white shadow-md border border-gray-200 hover:shadow-xl transition-all duration-300"
              >
                <button
                  onClick={() => deleteBlog(blog.id)}
                  className="absolute bottom-4 right-4 text-sm text-red-600 hover:underline"
                >
                  Delete
                </button>

                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {blog.title}
                </h3>
                <p className="text-base leading-relaxed text-gray-600 mb-3">
                  {blog.content}
                </p>

                <p className="text-sm text-purple-900 mt-2">
                  Author: {blog.Author?.firstName} {blog.Author?.lastName}
                  <br />
                  Published on: {new Date(blog.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
        </div>

        {/* Pagination and size controls */}
        <div className="flex w-full items-center gap-4 justify-between mt-6">
          <select
            value={options.size.toString()}
            onChange={(e) => {
              const params = new URLSearchParams(searchParams.toString());
              params.set("size", e.target.value);
              params.set("page", "1");
              router.push(`/blog?${params.toString()}`);
            }}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="25">25</option>
          </select>

          <div className="flex items-center gap-2">
            {Array.from({ length: numberOfPages }, (_, i) => (
              <a
                key={i}
                className={`rounded-xl px-4 py-2 font-medium ${
                  options.page === i + 1
                    ? "bg-blue-600 text-white"
                    : "bg-gray-300 text-black"
                }`}
                href={`/blog?page=${i + 1}&size=${options.size}&search=${
                  options.search
                }`}
              >
                {i + 1}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
