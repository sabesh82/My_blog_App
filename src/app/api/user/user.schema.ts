import { z } from "zod";

const UserRegistrationSchema = z.object({
  firstName: z
    .string({ required_error: "firstName is required" })
    .min(2, { message: "the min length should be atleast 2 chars" })
    .max(100, { message: "firstName should not exceed more than 100 chars" })
    .trim()
    .regex(/^[a-zA-Z\s-]+$/, { message: "can have a-z or A-Z or space or -" }),

  lastName: z
    .string({ required_error: "lastName is required" })
    .min(2, { message: "the min length should be atleast 2 chars" })
    .max(100, { message: "the lastName should not exceed more than 100 chars" })
    .trim()
    .regex(/^[a-zA-Z\s-]+$/, { message: "can have a-z or A-Z or space or -" }),

  email: z
    .string({ required_error: "email is required" })
    .email({ message: "invalid email format" })
    .max(100, { message: "email should not exceed more than 100 chars" })
    .trim()
    .toLowerCase(),

  password: z
    .string({ required_error: "password is required" })
    .min(8, { message: "should be atleast 8 characters" })
    .max(100, {
      message: "password should not exceed more than 100 characters",
    })
    .refine((val) => /[A-Z]/.test(val), {
      message: "Password must contain at least one uppercase letter",
    })
    .refine((val) => /[a-z]/.test(val), {
      message: "Password must contain at least one lowercase letter",
    })
    .refine((val) => /\d/.test(val), {
      message: "Password must contain at least one number",
    })
    .refine((val) => /[!@#$%^&*]/.test(val), {
      message:
        "Password must contain at least one special character (!@#$%^&*)",
    })
    .refine((val) => /^[A-Za-z\d!@#$%^&*]+$/.test(val), {
      message:
        "Password can only contain letters, numbers, and special characters (!@#$%^&*)",
    }),
});

const UserLoginSchema = z.object({
  email: z
    .string({ required_error: "email is required" })
    .trim()
    .email({ message: "invalid email format" }),

  password: z
    .string()
    .trim()
    .min(8, { message: "password should be atleast 8 characters" }),
});

const UserPaginationSchema = z.object({
  page: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : 1))
    .refine((val) => !isNaN(val) && val > 0, {
      message: "page should be positive number",
    }),

  size: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : 25))
    .refine((val) => !isNaN(val) && val > 0, {
      message: "size should be positive number",
    }),
  search: z.string().optional(),
});

export { UserRegistrationSchema, UserLoginSchema, UserPaginationSchema };
