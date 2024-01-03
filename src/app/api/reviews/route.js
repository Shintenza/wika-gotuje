import Recipe from '@models/Recipe';
import { calcAvgRating } from '@utils/getStars';
import { getToken } from 'next-auth/jwt';

export const POST = async (req) => {
  const token = await getToken({ req });

  if (!token) {
    return new Response('You have to be logged in to review a recipe', {
      status: 401,
    });
  }

  const data = await req.formData();
  try {
    const newReview = {
      authorId: token.id,
      stars: data.get('stars'),
    };
    await Recipe.updateOne(
      { _id: data.get('recipeId') },
      {
        $pull: {
          starReviews: { authorId: token.id },
        },
      },
    );
    const result = await Recipe.findOneAndUpdate(
      { _id: data.get('recipeId') },
      {
        $push: {
          starReviews: newReview,
        },
      },
      { new: true, fields: 'starReviews', upsert: true },
    );
    return new Response(
      JSON.stringify({
        reviewCount: result.starReviews.length,
        avgRating: calcAvgRating(result.starReviews),
      }),
      {
        status: 200,
      },
    );
  } catch (error) {
    console.log(error);
    return new Response(error, { status: 500 });
  }
};
