import { query } from '@utils/database';
import { getToken } from 'next-auth/jwt';

export const POST = async (req) => {
  const token = await getToken({ req });

  if (!token) {
    return new Response('You have to be logged in to add a comment', {
      status: 401,
    });
  }

  const data = await req.formData();

  try {
    const result = await query(
      `WITH inserted_comment AS (
         INSERT INTO comments (author_id, recipe_id, content)
         VALUES ($1, $2, $3)
         RETURNING *
       )
       SELECT * FROM inserted_comment c
       JOIN (
         SELECT
           id AS author_id,
           name AS author_name,
           image AS author_image FROM USERS
       ) u
       ON c.author_id = u.author_id;`,
      [token.id, data.get('recipeId'), data.get('comment')],
    );
    return new Response(JSON.stringify(result.rows[0]), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(error, { status: 500 });
  }
};
