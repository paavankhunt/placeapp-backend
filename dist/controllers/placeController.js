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
exports.deletePlace = exports.updatePlace = exports.findPlaceById = exports.fetchPlaces = exports.createPlace = void 0;
const placeModel_1 = __importDefault(require("../models/placeModel"));
const createPlace = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, lat, lng } = req.body;
        const userId = req.userId;
        const newPlace = new placeModel_1.default({ name, description, lat, lng, userId });
        yield newPlace.save();
        res.json({ message: 'Place created successfully', place: newPlace });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.createPlace = createPlace;
const fetchPlaces = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        const places = yield placeModel_1.default.find({ userId });
        res.json({ places });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.fetchPlaces = fetchPlaces;
const findPlaceById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { placeId } = req.params;
        const userId = req.userId;
        const place = yield placeModel_1.default.findOne({ _id: placeId, userId });
        if (!place) {
            return res
                .status(404)
                .json({ error: 'Place not found or does not belong to the user' });
        }
        res.json({ place });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.findPlaceById = findPlaceById;
const updatePlace = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { placeId, name, description, lat, lng } = req.body;
        const userId = req.userId;
        const existingPlace = yield placeModel_1.default.findOne({ _id: placeId, userId });
        if (!existingPlace) {
            return res
                .status(404)
                .json({ error: 'Place not found or does not belong to the user' });
        }
        existingPlace.name = name;
        existingPlace.description = description;
        existingPlace.lat = lat;
        existingPlace.lng = lng;
        yield existingPlace.save();
        res.json({ message: 'Place updated successfully', place: existingPlace });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.updatePlace = updatePlace;
const deletePlace = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { placeId } = req.params;
        const userId = req.userId;
        const existingPlace = yield placeModel_1.default.findOne({ _id: placeId, userId });
        if (!existingPlace) {
            return res
                .status(404)
                .json({ error: 'Place not found or does not belong to the user' });
        }
        yield placeModel_1.default.deleteOne({ _id: placeId, userId });
        res.json({ message: 'Place deleted successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.deletePlace = deletePlace;
//# sourceMappingURL=placeController.js.map