import mongoose, { Document, Schema } from 'mongoose';

interface IPlace extends Document {
  name: string;
  description: string;
  lat: number;
  long: number;
  userId: string;
}

const placeSchema = new Schema<IPlace>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  lat: {
    type: Number,
    required: true,
  },
  long: {
    type: Number,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
});

const Place = mongoose.model<IPlace>('Place', placeSchema);

export default Place;
