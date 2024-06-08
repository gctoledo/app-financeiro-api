import { z } from "zod";
import { User } from "@prisma/client";

export const createUserSchema = z
  .object({
    first_name: z
      .string({ required_error: "First name is required." })
      .trim()
      .min(1, { message: "First name is required." }),
    last_name: z
      .string({ required_error: "Last name is required." })
      .trim()
      .min(1, { message: "Last name is required." }),
    email: z
      .string({ required_error: "E-mail is required." })
      .email({ message: "Please provide a valid e-mail." })
      .trim()
      .min(1, { message: "Email is required." }),
    password: z
      .string({ required_error: "Password is required." })
      .trim()
      .min(6, {
        message: "Password must have at least 6 characters.",
      }),
  })
  .strict({ message: "Some provided field is not allowed." });

export const updateUserSchema = createUserSchema.partial();

export const authLoginSchema = createUserSchema.omit({
  first_name: true,
  last_name: true,
});

export type RequestUser = z.infer<typeof createUserSchema>;
export type ResponseUser = Omit<User, "password">;
export type UpdateUser = z.infer<typeof updateUserSchema>;
