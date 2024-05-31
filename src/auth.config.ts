import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs";

import { LoginSchema } from "@/src/schemas";
import { getCompanyByEmail } from "@/src/app/data/company";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;
          
          const company = await getCompanyByEmail(email);

          if (!company || !company.password) return null;

          const passwordsMatch = await bcrypt.compare(
            password,
            company.password,
          );

          if (passwordsMatch) return company;
        }

        return null;
      }
    })
  ],
} satisfies NextAuthConfig