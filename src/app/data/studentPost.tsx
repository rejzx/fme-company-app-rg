import * as z from "zod";
import db from "@/src/lib/db";
import { PostSchema, MessageSchema } from "@/src/schemas";

export const getStudentPost = async (postId: string) => {
  try {
    // Fetch the post by ID
    const post = await db.post.findUnique({
      where: { id: postId },
      include: {
        student: true, // Include student data in the response
        messages: {
          include: {
            company: true, // Include company data in the messages
          },
        },
        education: true,
        workExperiences: true,
        skills: true
      },
    });

    if (!post) {
      return null;
    }

    // Validate and transform the post data using PostSchema
    const validatedPost = PostSchema.extend({
      messages: z.array(MessageSchema)
    }).safeParse(post);

    if (!validatedPost.success) {
      console.error('Invalid post data:', validatedPost.error);
      return null;
    }

    return {
      ...validatedPost.data,
      student: {
        ...validatedPost.data.student,
        image: validatedPost.data.student.image ?? null, // Ensure nullability is handled
      },
    };
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
};
