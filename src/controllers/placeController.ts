import { Response } from 'express';
import Place from '../models/placeModel';
import { CustomRequest } from '../middleware/authMiddleware';

export const createPlace = async (req: CustomRequest, res: Response) => {
  try {
    const { name, description, lat, long } = req.body;
    const userId = req.userId;
    const newPlace = new Place({ name, description, lat, long, userId });
    await newPlace.save();
    res.json({ message: 'Place created successfully', place: newPlace });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const fetchPlaces = async (req: CustomRequest, res: Response) => {
  try {
    const userId = req.userId;
    const places = await Place.find({ userId });
    res.json({ places });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const findPlaceById = async (req: CustomRequest, res: Response) => {
  try {
    const { placeId } = req.params;
    const userId = req.userId;

    const place = await Place.findOne({ _id: placeId, userId });
    if (!place) {
      return res
        .status(404)
        .json({ error: 'Place not found or does not belong to the user' });
    }

    res.json({ place });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updatePlace = async (req: CustomRequest, res: Response) => {
  try {
    const { placeId, name, description, lat, long } = req.body;
    const userId = req.userId;

    const existingPlace = await Place.findOne({ _id: placeId, userId });
    if (!existingPlace) {
      return res
        .status(404)
        .json({ error: 'Place not found or does not belong to the user' });
    }

    existingPlace.name = name;
    existingPlace.description = description;
    existingPlace.lat = lat;
    existingPlace.long = long;

    await existingPlace.save();

    res.json({ message: 'Place updated successfully', place: existingPlace });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const deletePlace = async (req: CustomRequest, res: Response) => {
  try {
    const { placeId } = req.params;
    const userId = req.userId;

    const existingPlace = await Place.findOne({ _id: placeId, userId });
    if (!existingPlace) {
      return res
        .status(404)
        .json({ error: 'Place not found or does not belong to the user' });
    }

    await Place.deleteOne({ _id: placeId, userId });

    res.json({ message: 'Place deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
