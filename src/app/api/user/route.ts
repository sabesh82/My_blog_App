import { NextRequest, NextResponse } from "next/server";
import { UserRegistrationSchema } from "./user.schema";
import { findUser, userCreate } from "./user.controller";
import { hash } from "argon2";
import handleError from "../helpers/handleError";
import getPaginationParams from "../helpers/getPaginationParams";
import getSearchParams from "../helpers/getSearchParams";
import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";
import generateToken from "../helpers/generateToken";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = UserRegistrationSchema.parse(body);

    const isUserExist = await findUser({
      where: {
        email: validatedData.email,
      },
    });

    if (isUserExist) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "USER_ALREADY_EXISTS",
            message: "user already exist",
          },
        },
        { status: 409 }
      );
    }

    const hasedPassword = await hash(validatedData.password);

    const newUser = await userCreate({
      data: {
        ...validatedData,
        password: hasedPassword,
      },
    });

    const token = generateToken(newUser.id);

    return NextResponse.json({ ...newUser, token }, { status: 201 });
  } catch (error) {
    return handleError(error, "failed to create user");
  }
}

export async function GET(request: NextRequest) {
  try {
    const { page, size } = getPaginationParams({ request });
    const { search: searchText } = getSearchParams({ request });

    const searchFilter: Prisma.UserWhereInput = searchText
      ? {
          OR: [
            {
              firstName: { contains: searchText, mode: "insensitive" as const },
            },
            {
              lastName: { contains: searchText, mode: "insensitive" as const },
            },
          ],
        }
      : {};

    const [users, count] = await prisma.$transaction([
      prisma.user.findMany({
        where: { ...searchFilter },
        omit: {
          password: true,
        },
        skip: (page - 1) * size,
        take: size,
      }),
      prisma.user.count({ where: { ...searchFilter } }),
    ]);

    return NextResponse.json({ items: users, total: count }, { status: 200 });
  } catch (error) {
    return handleError(error, "failed to get users");
  }
}
