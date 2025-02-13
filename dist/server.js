"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const _utils_1 = require("@utils");
const _router_1 = require("@router");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const PORT = (0, _utils_1.getEnvVariable)("SERVER_PORT") || "8000";
app.use(express_1.default.json({ limit: "125Mb" }));
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)((0, _utils_1.getEnvVariable)("COOKIE_SECRET") || ""));
// base routes
app
    .use("/api/v1/category", _router_1.categoryRouter)
    .use("/api/v1/video", _router_1.videoRouter)
    .use("/api/v1/user", _router_1.userRouter)
    .use("/api/v1/auth", _router_1.authRouter);
console.log("Base URi's");
console.log(`http://localhost:${PORT}/api/v1/category/  -- Category Router`);
console.log(`http://localhost:${PORT}/api/v1/video/  -- Video Router`);
console.log(`http://localhost:${PORT}/api/v1/auth/  -- Auth Router`);
// core settings
app.use((0, cors_1.default)());
app.use("/*", (req, res) => {
    res.status(404).send("Page Not Found");
});
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
