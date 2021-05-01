import mongoose from 'mongoose';

const { Schema } = mongoose;

const authSchema = new Schema({
  token: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('authToken', authSchema);
