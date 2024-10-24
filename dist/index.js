"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const register_1 = __importDefault(require("./api/v0.1/controllers/register"));
const product_control_1 = __importDefault(require("./api/v0.1/controllers/product.control"));
dotenv_1.default.config();
require("./api/v0.1/config/mongodb");
const body_parser_1 = __importDefault(require("body-parser"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8001;
// Middleware
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)({ origin: true }));
app.use((0, express_fileupload_1.default)());
// API Routes
app.use("/", register_1.default);
app.use('/api/v0.1', product_control_1.default);
if (process.env.NODE_ENV === 'production') {
    const buildPath = path_1.default.join(__dirname, "../build");
    app.use(express_1.default.static(buildPath));
    app.get('*', (req, res) => {
        res.sendFile(path_1.default.resolve(buildPath, 'index.html'));
    });
}
else {
    app.get('/', (req, res) => res.send('Please set to production'));
}
app.get("/hello", (req, res) => {
    res.status(200).json("Hello World !");
});
app.listen(PORT, () => {
    console.log(`Connected to PORT ${PORT}`);
});
