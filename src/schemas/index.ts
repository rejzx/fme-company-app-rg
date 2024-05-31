import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(1, { message: "Minimum 6 characters required" }),
  name: z.string().min(1, { message: "Company name is required" }),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"], // This makes sure the error message appears under the confirmPassword field
});

// Define a schema for the student details
const StudentSchema = z.object({
  id: z.string(),
  firstname: z.string(),
  surname: z.string(),
  email: z.string().email(),
  image: z.string().nullable(),
});

export const EducationSchema = z.object({
  id: z.string().optional(),
  degree: z.string(),
  institution: z.string(),
  yearOfGraduation: z.number()
});

export const WorkExperienceSchema = z.object({
  id: z.string().optional(),
  company: z.string(),
  position: z.string(),
  location: z.string(),
  startDate: z.string(),
  endDate: z.string(),
});

export const SkillSchema = z.object({
  id: z.string().optional(),
  skillName: z.string(),
  level: z.string()
});

export const MessageSchema = z.object({
  id: z.string(),
  content: z.string(),
  fromCompanyId: z.string(),
  toStudentId: z.string(),
  postId: z.string(),
  createdAt: z.date(),
  viewed: z.boolean(),
  company: z.object({
    id: z.string(),
    name: z.string().optional(),
    email: z.string(),
    image: z.string().optional(),
  }).optional(), // Include the company field and make it optional
});

// Define the schema for the post
export const PostSchema = z.object({
  id: z.string(),
  content: z.string(),
  isActive: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
  studentId: z.string(),
  student: StudentSchema, // Embedding the Student schema
  messages: z.array(MessageSchema).optional(), // Make the messages field optional
  education: z.array(EducationSchema).optional(),
  workExperiences: z.array(WorkExperienceSchema).optional(),
  skills: z.array(SkillSchema).optional(),
});
