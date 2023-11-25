import express from 'express';
import {
  createPlace,
  deletePlace,
  fetchPlaces,
  findPlaceById,
  updatePlace,
} from '../controllers/placeController';
import verifyToken, { CustomRequest } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/create', verifyToken, (req: CustomRequest, res) =>
  createPlace(req, res)
);
router.get('/fetch', verifyToken, (req: CustomRequest, res) =>
  fetchPlaces(req, res)
);
router.get('/:placeId', verifyToken, (req: CustomRequest, res) =>
  findPlaceById(req, res)
);
router.put('/update', verifyToken, (req: CustomRequest, res) =>
  updatePlace(req, res)
);
router.delete('/:placeId', verifyToken, (req: CustomRequest, res) =>
  deletePlace(req, res)
);

export default router;
