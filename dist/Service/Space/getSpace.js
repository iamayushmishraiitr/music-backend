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
const db_1 = require("../../lib/db");
const getSpaces = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userIdString = req.query.userId;
    const userId = userIdString ? parseInt(userIdString) : null;
    if (!userId) {
        return res.status(400).json({ error: 'userId is required and should be a number' });
    }
    const res1 = yield db_1.db.space.findMany({
        where: {
            hostId: userId
        },
        include: {
            streams: true
        }
    });
    return res.json({ message: `Fetched spaces for user ${userId}`, data: res1 });
});
exports.default = getSpaces;
