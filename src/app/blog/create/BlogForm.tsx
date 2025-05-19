"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BlogInput } from "../../api/blog/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { BlogSchema } from "../../api/blog/blog.Schema";
import { useCreateBlog } from "@/api-clients/blog/useCreateBlog";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useApi } from "@/providers/apiProvider";

const BlogForm = () => {
  const {
    register,
    reset,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<BlogInput>({
    mode: "onChange",
    resolver: zodResolver(BlogSchema),
    shouldFocusError: true,
  });

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    mutateAsync: createBlog,
    isPending: isCreateBlogLoading,
    error: createBlogError,
  } = useCreateBlog();

  useEffect(() => {
    if (createBlogError) {
      const err = createBlogError as AxiosError;
      const errData = err?.response?.data as { code: string; message: string };
      console.log({ errData });
    }
  }, [createBlogError]);

  return (
    <form
      onSubmit={handleSubmit(async (values) => {
        const newBlog = await createBlog(values);

        router.push("/blog");
      })}
      className="space-y-6 w-full max-w-xl mx-auto"
    >
      <div className="flex flex-col gap-5 bg-white p-8 rounded-3xl shadow-xl w-full max-w-xl mx-auto">
        <h2 className="text-2xl font-bold text-center  bg-gradient-to-r from-purple-600 to-black/95  text-transparent bg-clip-text mb-2">
          Create Blog
        </h2>

        {/* Title */}
        <div className="flex flex-col">
          <label
            htmlFor="title"
            className={`mb-1 text-sm font-medium ${
              errors.title ? "text-red-600" : "text-gray-700"
            }`}
          >
            Title
          </label>
          <input
            {...register("title")}
            id="title"
            type="text"
            placeholder="Enter the title"
            className={`p-3 rounded-xl border outline-none transition duration-300 ${
              errors.title
                ? "border-red-500 focus:ring-1 focus:ring-red-400"
                : "border-gray-300 focus:ring-2 focus:ring-purple-500"
            }`}
          />
          {errors.title && (
            <p className="text-sm text-red-500 mt-1">{errors.title.message}</p>
          )}
        </div>

        {/*Slug*/}
        <div className="flex flex-col">
          <label
            htmlFor="slug"
            className={`mb-1 text-sm font-medium ${
              errors.slug ? "text-red-600" : "text-gray-700"
            }`}
          >
            Slug
          </label>
          <input
            {...register("slug")}
            id="slug"
            type="text"
            placeholder="Enter the slug"
            className={`p-3 rounded-xl border outline-none transition duration-300 ${
              errors.slug
                ? "border-red-500 focus:ring-1 focus:ring-red-400"
                : "border-gray-300 focus:ring-2 focus:ring-purple-500"
            }`}
          />
          {errors.slug && (
            <p className="text-sm text-red-500 mt-1">{errors.slug.message}</p>
          )}
        </div>

        {/*Content*/}
        <div className="flex flex-col">
          <label
            htmlFor="content"
            className={`mb-1 text-sm font-medium ${
              errors.content ? "text-red-600" : "text-gray-700"
            }`}
          >
            Content
          </label>
          <textarea
            {...register("content")}
            id="content"
            placeholder="Enter the content"
            rows={6}
            className={`resize-none p-4 rounded-xl border outline-none transition duration-300 text-gray-800 leading-6 ${
              errors.content
                ? "border-red-500 focus:ring-1 focus:ring-red-400"
                : "border-gray-300 focus:ring-2 focus:ring-purple-500"
            }`}
          />
          {errors.content && (
            <p className="text-sm text-red-500 mt-1">
              {errors.content.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold text-lg py-3 rounded-xl transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Creating..." : "Create"}
        </button>
      </div>
    </form>
  );
};

export default BlogForm;
