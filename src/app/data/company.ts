import db from "@/src/lib/db"

export const getCompanyByEmail = async (email: string) => {
  try {
    const company = await db.company.findUnique({ where: { email } });

    return company;
  } catch {
    return null;
  }
};

export const getCompanyById = async (id: string) => {
  try {
    const company = await db.company.findUnique({ where: { id } });

    return company;
  } catch {
    return null;
  }
};