import User from '@models/User';
import { getToken } from 'next-auth/jwt';
import mongoose from 'mongoose';
import { connectDb } from '@utils/connectDb';

export const POST = async (req) => {
  const token = await getToken({ req });

  if (!token) {
    return new Response('You have to be logged in to like/dislike recipies', {
      status: 200,
    });
  }

  const { recipeId } = await req.json();
  const id = new mongoose.Types.ObjectId(recipeId);
  await connectDb();

  const result = await User.findByIdAndUpdate(token.id, {
    $pull: {
      likedRecipes: id,
    },
  });

  return new Response(JSON.stringify({ message: 'ok', recipeId }), {
    status: 200,
  });
};
