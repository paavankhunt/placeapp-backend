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
exports.logout = exports.login = exports.signUp = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userModel_1 = __importDefault(require("../models/userModel"));
const generateToken = (userId) => {
    const secretKey = 'paavan';
    return jsonwebtoken_1.default.sign({ userId }, secretKey, { expiresIn: '1h' });
};
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const saltRounds = 10;
        const hashedPassword = yield bcryptjs_1.default.hash(password, saltRounds);
        const newUser = new userModel_1.default({ username, password: hashedPassword });
        yield newUser.save();
        const token = generateToken(newUser._id);
        res.json({ message: 'User signed up successfully', token });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.signUp = signUp;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const user = yield userModel_1.default.findOne({ username });
        if (user) {
            const trimmedEnteredPassword = password.trim();
            const passwordMatch = yield bcryptjs_1.default.compare(trimmedEnteredPassword, user.password);
            if (passwordMatch) {
                const token = generateToken(user._id);
                res.json({ message: 'Login successful', token });
            }
            else {
                res.status(401).json({ error: 'Invalid credentials' });
            }
        }
        else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.login = login;
const logout = (req, res) => {
    res.json({ message: 'Logout successful' });
};
exports.logout = logout;
//# sourceMappingURL=userController.js.map