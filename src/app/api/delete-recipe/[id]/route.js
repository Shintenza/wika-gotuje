import { getToken } from 'next-auth/jwt';
import { query } from '@utils/database';

export const DELETE = async (req, { params }) => {
  const token = await getToken({ req });
  const recipeId = params.id;

  if (!token) {
    return new Response('You have to be logged in to delete a recipe', {
      status: 401,
    });
  }

  await query('DELETE FROM recipes WHERE author_id = $1 and id = $2;', [
    token.id,
    recipeId,
  ]);

  return new Response(JSON.stringify({ message: 'ok', recipeId }), {
    status: 200,
  });
};
