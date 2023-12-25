import { Schema, models, model } from 'mongoose';

const userSchema = new Schema({
  email: {
    type: String,
    unique: [true, 'Email already exists'],
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  role: {
    type: String,
    required: true,
  },
  likedRecipies: [
    {
      recipeId: { type: Schema.Types.ObjectId, ref: 'Recipe', required: true },
    },
  ],
  subscribes: [
    {
      authorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    },
  ],
});

const User = models.User || model('User', userSchema);
export default User;
