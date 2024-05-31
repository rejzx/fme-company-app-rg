"use server"

import * as z from "zod";
import { signIn } from "@/src/auth";
import { LoginSchema } from "@/src/schemas";
import { DEFAULT_LOGIN_REDIRECT } from "@/src/routesHelper";
import { AuthError } from "next-auth";

export const companyLogin = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password } = validatedFields.data;

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" }
        default:
          return { error: "Something went wrong!"}
      }
    }

    throw error;
  }

  return { success: "Email sent!" }
};