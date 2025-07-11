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
const getStreams = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const spaceIdString = req.query.spaceId;
        if (!spaceIdString) {
            return res.status(400).json({ message: "Invalid SpaceId Created" });
        }
        const spaceId = parseInt(spaceIdString);
        const current = yield db_1.db.currentStream.findUnique({
            where: {
                spaceId: spaceId,
            },
        });
        const response = yield db_1.db.space.findUnique({
            where: {
                id: spaceId,
            },
            include: {
                streams: {
                    where: {
                        active: true
                    },
                    orderBy: {
                        upvotes: {
                            _count: "desc",
                        },
                    },
                    include: {
                        upvotes: true,
                    },
                },
            },
        });
        return res.status(200).json({
            message: "fetced The stream in the space ",
            data: response === null || response === void 0 ? void 0 : response.streams,
            hostId: response === null || response === void 0 ? void 0 : response.hostId
        });
    }
    catch (e) {
        console.error("Unexpected error:", e);
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.default = getStreams;
