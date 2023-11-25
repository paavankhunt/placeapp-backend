"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const placeRoutes_1 = __importDefault(require("./routes/placeRoutes"));
require('dotenv').config();
const app = (0, express_1.default)();
const port = process.env.PORT || 8080;
app.use((0, cors_1.default)({ origin: '*' }));
app.use(body_parser_1.default.json());
app.use(express_1.default.static('public'));
app.use(express_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
mongoose_1.default.connect(process.env.MONGO_URL);
mongoose_1.default.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});
mongoose_1.default.connection.on('error', (err) => {
    console.error('MongoDB connection error: ', err);
});
app.get('/ping', (_req, res) => {
    return res.send('pong 🏓');
});
app.use('/auth', userRoutes_1.default);
app.use('/place', placeRoutes_1.default);
app.listen(port, () => {
    return console.log(`Server is listening on ${port}`);
});
//# sourceMappingURL=index.js.map