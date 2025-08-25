import * as z from "zod";
export const contentSchema = z
  .object({
    type: z.enum(["Tweet", "Document", "Video"]),
    link: z.string().optional(),
    title: z.string().min(1, { message: "Title cannot be empty" }),
    tags: z.array(z.string()).optional(),
    body: z
      .object({
        title: z.string().optional(),
        paragraph: z.string().optional(),
        points: z.array(z.string()).optional(),
      })
      .optional(),
  })
  .strict();
