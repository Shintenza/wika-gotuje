import { getToken } from 'next-auth/jwt';
import { query } from '@utils/database';

export const POST = async (req) => {
  const token = await getToken({ req });

  if (!token) {
    return new Response('You have to be logged in to like/dislike recipies', {
      status: 200,
    });
  }

  const { recipeId } = await req.json();

  await query('DELETE FROM likes WHERE user_id = $1 and recipe_id = $2;', [
    token.id,
    recipeId,
  ]);

  return new Response(JSON.stringify({ message: 'ok', recipeId }), {
    status: 200,
  });
};
