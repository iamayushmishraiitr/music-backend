"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSpaceDto = exports.downvoteRequestDto = exports.playNextDTO = exports.upvoteRequestDto = exports.streamRequestDto = void 0;
const zod_1 = require("zod");
exports.streamRequestDto = zod_1.z.object({
    userId: zod_1.z.string(),
    url: zod_1.z.string(),
    spaceId: zod_1.z.string(),
    extractedId: zod_1.z.string(),
});
exports.upvoteRequestDto = zod_1.z.object({
    streamId: zod_1.z.number(),
    userId: zod_1.z.number(),
});
exports.playNextDTO = zod_1.z.object({
    userId: zod_1.z.number(),
    spaceId: zod_1.z.number(),
});
exports.downvoteRequestDto = zod_1.z.object({
    streamId: zod_1.z.number(),
    userId: zod_1.z.number(),
});
exports.createSpaceDto = zod_1.z.object({
    userId: zod_1.z.number(),
    name: zod_1.z.string(),
    description: zod_1.z.string()
});
