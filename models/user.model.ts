import mongoose from 'mongoose';

interface UserType {
  username: string;
  imageUrl: string;
  externalUserId: string;
  bio?: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema<UserType>({
  username: {
    type: String,
    unique: true,
    required: true,
    minlength: [3, 'Username should at least be 3 characters long']
  },
  imageUrl: String,
  externalUserId: {
    type: String,
    unique: true,
    required: true,
    minlength: [3, 'External User Id should at least be 3 characters long']
  },
  bio: String,
}, { timestamps: true });

export const User = mongoose.models.User ||  mongoose.model('User', userSchema);