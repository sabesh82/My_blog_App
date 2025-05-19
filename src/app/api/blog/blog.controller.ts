import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";

export async function blogCreate(data: Prisma.BlogCreateArgs) {
  return prisma.blog.create(data);
}

export async function blogUpdate(data: Prisma.BlogUpdateArgs) {
  return prisma.blog.update(data);
}

export async function blogDelete(data: Prisma.BlogDeleteArgs) {
  return prisma.blog.delete(data);
}

export async function findBlog(data: Prisma.BlogFindUniqueArgs) {
  return prisma.blog.findUnique(data);
}

export async function userBlogs(data: Prisma.BlogFindManyArgs) {
  return prisma.blog.findMany(data);
}

export async function blogCount(data: Prisma.BlogCountArgs) {
  return prisma.blog.count(data);
}
