import { query } from '@utils/database';
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
    await query(
      `INSERT INTO stars (author_id, recipe_id, amount) VALUES ($1, $2, $3)
       ON CONFLICT ON CONSTRAINT stars_pkey DO UPDATE
       SET amount = EXCLUDED.amount;`,
      [token.id, data.get('recipeId'), data.get('stars')],
    );
    const result = await query(
      `SELECT
       COALESCE(AVG(stars.amount), 0) AS avg_rating,
       COUNT(stars.author_id) AS review_count
       FROM stars WHERE recipe_id = $1;
       `,
      [data.get('recipeId')],
    );
    return new Response(JSON.stringify(result.rows[0]), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(error, { status: 500 });
  }
};
