// /src/app/data/posts.ts
import db from "@/src/lib/db";
import { PostSchema, MessageSchema } from "@/src/schemas";
import * as z from "zod";

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

// Define a Zod schema for the filter
const PostFilterSchema = z.object({
  isActive: z.boolean().optional(),
  studentId: z.string().optional(),
  createdAtBefore: z.date().optional(),
  createdAtAfter: z.date().optional(),
  companyId: z.string().optional(),
  education: z.array(EducationSchema).optional(),
  workExperiences: z.array(WorkExperienceSchema).optional(),
  skills: z.array(SkillSchema).optional(),
});

export const getAllPosts = async (query: {
  isActive?: boolean;
  studentId?: string;
  createdAtBefore?: Date;
  createdAtAfter?: Date;
  companyId?: string;
}) => {
  try {
    // Validate query parameters with Zod
    const validatedQuery = PostFilterSchema.safeParse(query);
    if (!validatedQuery.success) {
      console.error('Invalid query parameters:', validatedQuery.error);
      return null;
    }

    const queryFilters: any = {};
    if (validatedQuery.data.isActive !== undefined) {
      queryFilters.isActive = validatedQuery.data.isActive;
    }
    if (validatedQuery.data.studentId) {
      queryFilters.studentId = validatedQuery.data.studentId;
    }
    if (validatedQuery.data.createdAtBefore) {
      queryFilters.createdAt = { lt: validatedQuery.data.createdAtBefore };
    }
    if (validatedQuery.data.createdAtAfter) {
      queryFilters.createdAt = { gt: validatedQuery.data.createdAtAfter };
    }

    // Query the Post table with optional filters
    const posts = await db.post.findMany({
      where: queryFilters,
      include: {
        student: true,
        messages: {
          where: {
            fromCompanyId: query.companyId,
          },
          select: {
            id: true,
            content: true,
            fromCompanyId: true,
            toStudentId: true,
            postId: true,
            createdAt: true,
            viewed: true,
          },
        },
        education: true,
        workExperiences: true,
        skills: true
      },
    });

    // Validate and transform the posts data using PostSchema
    const validatedPosts = z.array(PostSchema).safeParse(posts);

    if (!validatedPosts.success) {
      console.error('Invalid post data:', validatedPosts.error);
      return null;
    }

    // Include whether the company has sent a message
    const postsWithMessageStatus = validatedPosts.data.map(post => ({
      ...post,
      hasSentMessage: (post.messages ?? []).length > 0,
    }));

    return postsWithMessageStatus.map(post => ({
      ...post,
      student: {
        ...post.student,
        image: post.student.image ?? null,
      },
    }));
  } catch (error) {
    console.error('Error fetching posts:', error);
    return null;
  }
};
