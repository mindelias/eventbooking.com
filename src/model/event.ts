import mongoose from 'mongoose';

// link to url cloudinary  https://api.cloudinary.com/v1_1/dcjqhpkdr

export type EventType = {
  _id: string;
  title: string;
  description: string;
  price: number;
  date: string | Date;
};

export type EventTypePartial = Omit<EventType, "id" | "date">
type EventDoc = Event & mongoose.Document;

const eventsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  date: { type: Date, default: Date.now(), required: true },
  image: { type: String },
  user_id: {
    type: mongoose.Types.ObjectId,
    ref:'User'
  }
});

export default mongoose.model<EventDoc>('Event', eventsSchema);
