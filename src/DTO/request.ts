import { z } from "zod";
export const streamRequestDto = z.object({
  userId: z.string(),
  url: z.string(),
  spaceId: z.string(),
  extractedId : z.string() ,
});

export const upvoteRequestDto = z.object({
  streamId: z.number(),
  userId: z.number(),
});

export const playNextDTO = z.object({
  userId: z.number(),
  spaceId: z.number(),

});

export const downvoteRequestDto = z.object({
  streamId: z.number(),
  userId: z.number(),
});

export const createSpaceDto = z.object({
  userId: z.number(),
  name: z.string(),
  description:z.string()
});
