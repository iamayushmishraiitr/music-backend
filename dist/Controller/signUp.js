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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const catchasync_1 = require("../lib/catchasync");
const generateToken_1 = __importDefault(require("../JWT/generateToken"));
const prisma = new client_1.PrismaClient();
const router = express_1.default.Router();
router.post("/", (0, catchasync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        const saltRounds = 6;
        const hashedPassword = yield bcrypt_1.default.hash(password, saltRounds);
        const userData = {
            username,
            email,
            password: hashedPassword,
        };
        const response = yield prisma.user.create({
            data: userData,
        });
        const token = (0, generateToken_1.default)(response.username, response.id);
        console.log(token);
        return res.status(200).json({ message: "Received Data successfully", token: token, username: response.username, userId: response.id });
    }
    catch (error) {
        console.log(error);
        return res.status(404).send({ message: "Error Occurred" });
    }
})));
exports.default = router;
