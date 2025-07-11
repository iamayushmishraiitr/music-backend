"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const request_1 = require("../DTO/request");
const db_1 = require("../lib/db");
const playNext = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = request_1.playNextDTO.parse(req.body);
        const space = yield db_1.db.space.findUnique({
            where: { id: data.spaceId },
        });
        if ((space === null || space === void 0 ? void 0 : space.hostId) !== data.userId) {
            return res
                .status(403)
                .json({ message: "Only host can change current stream." });
        }
        const mostUpvotedStream = yield db_1.db.stream.findFirst({
            where: {
                userId: data.userId,
                spaceId: data.spaceId,
                active: true,
            },
            orderBy: {
                upvotes: {
                    _count: "desc",
                },
            },
        });
        if (!mostUpvotedStream) {
            return res
                .status(404)
                .json({ message: "No upvoted streams found to play next." });
        }
        yield Promise.all([
            db_1.db.currentStream.upsert({
                where: {
                    userId_spaceId: {
                        userId: data.userId,
                        spaceId: data.spaceId,
                    },
                },
                update: {
                    streamId: mostUpvotedStream.id,
                },
                create: {
                    userId: data.userId,
                    spaceId: data.spaceId,
                    streamId: mostUpvotedStream.id,
                },
            }),
            db_1.db.stream.update({
                where: {
                    id: mostUpvotedStream.id,
                },
                data: {
                    active: false,
                },
            }),
        ]);
        return res.status(200).json({
            message: "Updated the current stream of the space",
            streamId: mostUpvotedStream.id,
        });
    }
    catch (error) {
        console.error("playNext error:", error);
        return res.status(500).json({ message: "Something went wrong" });
    }
});
exports.default = playNext;
