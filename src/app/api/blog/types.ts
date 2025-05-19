import { z } from "zod";
import { BlogSchema } from "./blog.Schema";

export type BlogInput = z.infer<typeof BlogSchema>;

export type getBlogParam = { page?: number; size?: number };
