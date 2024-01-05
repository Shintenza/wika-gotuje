import User from '@models/User';
import { getToken } from 'next-auth/jwt';
import { connectDb } from '@utils/connectDb';
import mongoose from 'mongoose';

const ELEMENTS_TO_FETCH = 6;

export const GET = async (req) => {
  const token = await getToken({ req });

  if (!token) {
    return new Response('You have to be logged in to check your follows', {
      status: 401,
    });
  }

  try {
    const page = Number(req.nextUrl.searchParams.get('page') - 1 || 0);
    await connectDb();

    const result = await User.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(token.id),
        },
      },
      {
        $lookup: {
          from: 'recipes',
          localField: 'follows',
          foreignField: 'authorId',
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
          as: 'followedRecipes',
        },
      },
      {
        $project: {
          totalNumber: 1,
          followedRecipes: {
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
      {
        $project: {
          totalNumber: {
            $size: '$followedRecipes',
          },
          followedRecipes: {
            $slice: [
              '$followedRecipes',
              page * ELEMENTS_TO_FETCH,
              ELEMENTS_TO_FETCH,
            ],
          },
        },
      },
    ]);

    return new Response(
      JSON.stringify({
        totalNumber: Math.ceil(result[0].totalNumber / ELEMENTS_TO_FETCH),
        recipes: result[0].followedRecipes,
      }),
      {
        status: 200,
      },
    );
  } catch (e) {
    console.error(e);
    return new Response('Server Error', { status: 500 });
  }
};
