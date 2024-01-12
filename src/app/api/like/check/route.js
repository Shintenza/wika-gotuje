import { query } from '@utils/database';

export const GET = async (req) => {
  const userId = req.nextUrl.searchParams.get('userId');
  const recipeId = req.nextUrl.searchParams.get('recipeId');

  if (!userId || !recipeId)
    return new Response('missing userId or recipeId query params', {
      status: 400,
    });

  try {
    const result = await query(
      'SELECT EXISTS (SELECT 1 FROM likes WHERE user_id = $1 and recipe_id = $2) as liked;',
      [userId, recipeId],
    );

    return new Response(JSON.stringify(result.rows[0]), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response('server error while fetching isLiked', { status: 500 });
  }
};
