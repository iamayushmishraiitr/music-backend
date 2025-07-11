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
const upvoteStreams = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = request_1.upvoteRequestDto.parse(req.body);
        yield db_1.db.upvotes.create({
            data: {
                user: {
                    connect: { id: data.userId },
                },
                stream: {
                    connect: { id: data.streamId },
                },
            },
        });
        return res.status(201).json({ message: "upvoted Successfully" });
    }
    catch (e) {
        console.error("Unexpected error:", e);
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.default = upvoteStreams;
