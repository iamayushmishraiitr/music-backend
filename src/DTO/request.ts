import { z } from "zod";
export const streamRequestDto = z.object({
  userId: z.number(),
  url: z.string(),
});

export const upvoteRequestDto = z.object({
  streamId: z. number(),
  userId: z.number()
});
