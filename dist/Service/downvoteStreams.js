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
const db_1 = require("../lib/db");
const request_1 = require("../DTO/request");
const downvoteStreams = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = request_1.downvoteRequestDto.parse(req.body);
        yield db_1.db.upvotes.delete({
            where: {
                userId_streamId: {
                    userId: data.userId,
                    streamId: data.streamId,
                },
            },
        });
        return res.status(201).json({ message: "downvoted Successfully" });
    }
    catch (e) {
        console.error("Unexpected error:", e);
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.default = downvoteStreams;
