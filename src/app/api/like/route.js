import { query } from '@utils/database';
import { getToken } from 'next-auth/jwt';

const ELEMENTS_TO_FETCH = 6;

export const GET = async (req) => {
  const token = await getToken({ req });

  if (!token) {
    return new Response('you have to be logged in to get liked recipes', {
      status: 401,
    });
  }

  // const page = Number(req.nextUrl.searchParams.get('page')) - 1 || 0;

  const result = await query(
    `SELECT
     r.*,
     u.*,
     COUNT(comments.id) AS comment_count,
     COUNT(DISTINCT stars.author_id) AS review_count,
     COALESCE(AVG(stars.amount), 0) AS avg_rating
     FROM likes l
     JOIN recipes r ON (r.id = l.recipe_id)
     LEFT JOIN comments ON (r.id = comments.recipe_id)
     LEFT JOIN stars ON (r.id = stars.recipe_id)
     JOIN (SELECT
     id AS author_id,
     name AS author_name,
     image AS author_image FROM users) u
     ON r.author_id = u.author_id
     WHERE l.user_id = $1
     GROUP BY r.id, u.author_id, u.author_name, u.author_image;`,
    [token.id],
  );

  return new Response(
    JSON.stringify({
      // totalNumber: Math.ceil(newResponse[0].totalNumber / ELEMENTS_TO_FETCH),
      totalNumber: 1,
      recipes: result.rows,
    }),
    { status: 200 },
  );
};
