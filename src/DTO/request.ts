import { z } from "zod";
export const streamRequestDto = z.object({
  userId: z.number(),
  url: z.string(),
  spaceId: z.number() 
});

export const upvoteRequestDto = z.object({
  streamId: z. number(),
  userId: z.number()
});

export const createSpaceDto = z.object({
  userId: z. number(),
  name: z.string() ,

});
