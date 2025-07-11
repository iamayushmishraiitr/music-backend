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
const youtube_search_api_1 = require("youtube-search-api");
const postStreams = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const data = request_1.streamRequestDto.parse(req.body);
        const streamData = yield (0, youtube_search_api_1.GetVideoDetails)(data.extractedId);
        const { thumbnails } = streamData.thumbnail;
        thumbnails.sort((a, b) => a.width - b.width);
        const response = yield db_1.db.stream.create({
            data: {
                userId: Number(data.userId),
                type: "youtube",
                extractedId: data.extractedId,
                url: data.url,
                bigImage: (_a = thumbnails[thumbnails.length - 1]) === null || _a === void 0 ? void 0 : _a.url,
                spaceId: Number(data.spaceId),
                smallImage: thumbnails.length > 1
                    ? (_b = thumbnails[thumbnails.length - 2]) === null || _b === void 0 ? void 0 : _b.url
                    : (_c = thumbnails[thumbnails.length - 1]) === null || _c === void 0 ? void 0 : _c.url,
            },
        });
        return res.status(201).json({ message: "Stream created successfully", body: response });
    }
    catch (e) {
        console.error("Unexpected error:", e);
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.default = postStreams;
