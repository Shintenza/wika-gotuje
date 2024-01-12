import { getToken } from 'next-auth/jwt';
import { query } from '@utils/database';

export const POST = async (req) => {
  const token = await getToken({ req });

  if (!token) {
    return new Response('You have to be logged in to review a recipe', {
      status: 401,
    });
  }

  const { recipeId } = await req.json();

  await query('INSERT INTO likes (user_id, recipe_id) VALUES ($1, $2)', [
    token.id,
    recipeId,
  ]);

  return new Response(JSON.stringify({ message: 'ok', recipeId }), {
    status: 200,
  });
};
