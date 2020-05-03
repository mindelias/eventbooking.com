import mongoose from 'mongoose';
import {UserType} from '../validation/auth'


type User = UserType & mongoose.Document;

const usersSchema = new mongoose.Schema({
    fullname: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    createdAt: { type: Date, default: Date.now(), required: true },
    updatedAt: Date,
    deletedAt: Date,
    createdEvent: [{
        type: mongoose.Types.ObjectId,
        ref:'Event'
    }]
    
});

export default mongoose.model<User>('User', usersSchema);
