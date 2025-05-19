import { z } from "zod";
import { UserLoginSchema, UserRegistrationSchema } from "./user.schema";

export type UserRegisterInput = z.infer<typeof UserRegistrationSchema>;
export type UserLoginInput = z.infer<typeof UserLoginSchema>;
