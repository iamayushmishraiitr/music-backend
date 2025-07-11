"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const streamsController_1 = __importDefault(require("./Controller/streamsController"));
const signUp_1 = __importDefault(require("./Controller/signUp"));
const signIn_1 = __importDefault(require("./Controller/signIn"));
const spaceController_1 = __importDefault(require("./Controller/spaceController"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: [
        "https://music-frontend-yymr.vercel.app",
        "http://localhost:5173"
    ],
    credentials: true,
    methods: ["GET", "POST"]
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.get("/health", (req, res) => {
    res.status(200).send("The Server is Working");
});
app.use("/signup", signUp_1.default);
app.use("/signin", signIn_1.default);
app.use("/space", spaceController_1.default);
app.use("/stream", streamsController_1.default);
app.listen(process.env.PORT, () => {
    console.log(`Server running  on port ${process.env.PORT} `);
});
