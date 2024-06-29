"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const mongoose_1 = __importDefault(require("mongoose"));
const users_1 = __importDefault(require("./routes/users"));
const auth_1 = __importDefault(require("./routes/auth"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const path_1 = __importDefault(require("path"));
mongoose_1.default.connect("mongodb+srv://anushkasingh202525:8f8yEET5Zap0zNyQ@e2e-db-test.ty2kn5c.mongodb.net/?retryWrites=true&w=majority&appName=e2e-db-test/users");
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json()); //body of API req is converted to json so that we don't have to convert it
app.use(express_1.default.urlencoded({ extended: true })); //helps to parse URLs
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    credentials: true,
})); //it is for security purpose that prevents some URLs from reaching our server
//this will go to the compiled frontend dist folder which has our compiled static frontend assets
//and server those static assets on the route of url that the backend runs on
app.use(express_1.default.static(path_1.default.join(__dirname, "../../frontend/dist")));
app.use("/api/users", users_1.default);
app.use("/api/auth", auth_1.default);
app.listen(7000, () => {
    console.log("the server is running on port 7000");
});
