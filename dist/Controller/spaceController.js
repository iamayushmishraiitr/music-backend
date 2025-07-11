"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const catchasync_1 = require("../lib/catchasync");
const createSpace_1 = __importDefault(require("../Service/Space/createSpace"));
const getSpace_1 = __importDefault(require("../Service/Space/getSpace"));
const router = express_1.default.Router();
router.post("/createSpace", (0, catchasync_1.catchAsync)(createSpace_1.default));
router.get("/getSpaces", (0, catchasync_1.catchAsync)(getSpace_1.default));
exports.default = router;
