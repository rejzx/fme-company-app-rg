'use server';

import * as z from "zod";
import db from "@/src/lib/db";
import { auth } from "@/src/auth";

// Define a Zod schema for the message
const MessageSchema = z.object({
  content: z.string(),
  postId: z.string(),
  toStudentId: z.string(),
  fromCompanyId: z.string(),
});

// Function to send a message
export const sendMessage = async (values: z.infer<typeof MessageSchema>) => {
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    return { error: "Unauthorized: No valid session found" };
  }

  const validatedFields = MessageSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid message data!" };
  }

  const { content, postId, toStudentId, fromCompanyId } = validatedFields.data;

  try {
    const message = await db.message.create({
      data: {
        content,
        postId,
        toStudentId,
        fromCompanyId,
        viewed: false,
      },
    });

    return { success: "Message sent successfully!", message };
  } catch (error) {
    console.error("Failed to send message:", error);
    return { error: "Failed to send the message due to a server error." };
  }
};
