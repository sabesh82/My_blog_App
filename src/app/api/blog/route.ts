import { NextRequest, NextResponse } from "next/server";
import { BlogSchema } from "./blog.Schema";
import { blogCreate } from "./blog.controller";
import handleError from "../helpers/handleError";
import getPaginationParams from "../helpers/getPaginationParams";
import getSearchParams from "../helpers/getSearchParams";
import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";
import privateRoute from "../helpers/privateRoute";

export async function POST(request: NextRequest) {
  return privateRoute(request, async (user, token) => {
    try {
      console.log({ user, token });
      const body = await request.json();
      const validatedData = BlogSchema.parse(body);
      const userId = user?.id;

      const newBlog = await blogCreate({
        data: {
          Author: {
            connect: { id: userId },
          },
          ...validatedData,
        },
      });

      return NextResponse.json({ newBlog }, { status: 201 });
    } catch (error) {
      return handleError(error, "failed to create blog");
    }
  });
}

export async function GET(request: NextRequest) {
  try {
    const { page, size } = getPaginationParams({ request });
    const { search: searchText } = getSearchParams({ request });

    const searchFilter: Prisma.BlogWhereInput = searchText
      ? {
          OR: [
            {
              title: { contains: searchText, mode: "insensitive" as const },
            },
            {
              content: { contains: searchText, mode: "insensitive" as const },
            },
          ],
        }
      : {};

    const [blogs, count] = await prisma.$transaction([
      prisma.blog.findMany({
        where: { ...searchFilter },
        include: {
          Author: {
            omit: {
              password: true,
              createdAt: true,
              updatedAt: true,
            },
          },
        },
        skip: (page - 1) * size,
        take: size,
      }),
      prisma.blog.count({ where: { ...searchFilter } }),
    ]);

    return NextResponse.json({ items: blogs, total: count }, { status: 200 });
  } catch (error) {
    return handleError(error, "failed to create blog");
  }
}
