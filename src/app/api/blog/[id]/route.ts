import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import privateRoute from "@/app/api/helpers/privateRoute";

// for deleting blog
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: blogId } = await params;

  return privateRoute(request, async (decodedToken) => {
    const blog = await prisma.blog.findUnique({ where: { id: blogId } });

    if (!blog) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "BLOG_NOT_FOUND",
            message: "blog not found",
          },
        },
        { status: 404 }
      );
    }

    if (blog.AuthorId !== decodedToken.id) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "NOT_AUTHORIZED",
            message: "not authorized",
          },
        },
        { status: 403 }
      );
    }

    await prisma.blog.delete({ where: { id: blogId } });

    return NextResponse.json({ success: true, message: "Blog deleted" });
  });
}

// for edit blog
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: blogId } = await params;

  return privateRoute(request, async (user) => {
    const body = await request.json();

    const blog = await prisma.blog.findUnique({ where: { id: blogId } });

    if (!blog || blog.AuthorId !== user.id) {
      return NextResponse.json(
        { error: "Unauthorized or Not Found" },
        { status: 403 }
      );
    }

    const updatedBlog = await prisma.blog.update({
      where: { id: blogId },
      data: {
        title: body.title,
        content: body.content,
      },
    });

    return NextResponse.json(updatedBlog);
  });
}
