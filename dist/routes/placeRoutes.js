"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const placeController_1 = require("../controllers/placeController");
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const router = express_1.default.Router();
router.post('/create', authMiddleware_1.default, (req, res) => (0, placeController_1.createPlace)(req, res));
router.get('/fetch', authMiddleware_1.default, (req, res) => (0, placeController_1.fetchPlaces)(req, res));
router.get('/:placeId', authMiddleware_1.default, (req, res) => (0, placeController_1.findPlaceById)(req, res));
router.put('/update', authMiddleware_1.default, (req, res) => (0, placeController_1.updatePlace)(req, res));
router.delete('/:placeId', authMiddleware_1.default, (req, res) => (0, placeController_1.deletePlace)(req, res));
exports.default = router;
//# sourceMappingURL=placeRoutes.js.map