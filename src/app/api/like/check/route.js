import User from '@models/User';
import { connectDb } from '@utils/connectDb';
import mongoose from 'mongoose';

export const GET = async (req) => {
  const userId = req.nextUrl.searchParams.get('userId');
  const recipeId = req.nextUrl.searchParams.get('recipeId');

  console.log(userId, recipeId);

  if (!userId || !recipeId)
    return new Response('missing userId or recipeId query params', {
      status: 400,
    });

  await connectDb();
  try {
    const userObjId = new mongoose.Types.ObjectId(userId);
    const recipeObjId = new mongoose.Types.ObjectId(recipeId);

    const results = await User.findOne({
      _id: userObjId,
      likedRecipes: { $in: [recipeObjId] },
    });
    if (results) {
      return new Response(JSON.stringify({ liked: true }), { status: 200 });
    } else {
      return new Response(JSON.stringify({ liked: false }), { status: 200 });
    }
  } catch (error) {
    console.log(error);
    return new Response('server error while fetching isLiked', { status: 500 });
  }
};
