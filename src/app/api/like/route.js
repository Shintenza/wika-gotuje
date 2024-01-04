import User from '@models/User';
import mongoose from 'mongoose';
import { getToken } from 'next-auth/jwt';

const ELEMENTS_TO_FETCH = 6;

export const GET = async (req) => {
  const token = await getToken({ req });

  if (!token) {
    return new Response('you have to be logged in to get liked recipes', {
      status: 401,
    });
  }

  const page = Number(req.nextUrl.searchParams.get('page')) - 1 || 0;

  const newResponse = await User.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(token.id),
      },
    },
    {
      $project: {
        totalNumber: {
          $size: '$likedRecipes',
        },
        likedRecipes: {
          $slice: [
            '$likedRecipes',
            page * ELEMENTS_TO_FETCH,
            ELEMENTS_TO_FETCH,
          ],
        },
      },
    },
    {
      $lookup: {
        from: 'recipes',
        localField: 'likedRecipes',
        foreignField: '_id',
        pipeline: [
          {
            $lookup: {
              from: 'users',
              localField: 'authorId',
              foreignField: '_id',
              as: 'authorId',
            },
          },
          { $unwind: '$authorId' },
        ],
        as: 'likedRecipes',
      },
    },
    {
      $project: {
        totalNumber: 1,
        likedRecipes: {
          _id: 1,
          name: 1,
          image: 1,
          prepTime: 1,
          difficulty: 1,
          portionsNumber: 1,
          authorId: {
            name: 1,
            image: 1,
          },
          starReviews: 1,
          comments: 1,
          dateAdded: 1,
        },
      },
    },
  ]);

  return new Response(
    JSON.stringify({
      totalNumber: Math.ceil(newResponse[0].totalNumber / ELEMENTS_TO_FETCH),
      recipes: newResponse[0].likedRecipes,
    }),
    { status: 200 },
  );
};
