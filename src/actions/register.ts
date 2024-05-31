"use server"

import * as z from "zod"
import { RegisterSchema } from "@/src/schemas";
import bcrypt from "bcryptjs";
import db from "@/src/lib/db";
import { getCompanyByEmail } from "@/src/app/data/company";

export const companyRegister = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password, name} = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);
  const existingCompany = await getCompanyByEmail(email);

  if (existingCompany) {
    return { error: "Email already in use"};
  }

  await db.company.create({
    data: {
      email,
      password: hashedPassword,
      name
    }
  });

  return { success: "Company created!" };
};