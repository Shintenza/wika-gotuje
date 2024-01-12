import { query } from '@utils/database';
import { getToken } from 'next-auth/jwt';

export const POST = async (req) => {
  const token = await getToken({ req });

  if (!token) {
    return new Response('You have to be logged in to follow', {
      status: 401,
    });
  }

  try {
    const { userId } = await req.json();

    if (userId == token.id) {
      return new Response({ status: 400 });
    }

    await query(
      `INSERT INTO follows (follower_id, followee_id) VALUES ($1, $2)`,
      [token.id, userId],
    );

    return new Response({ status: 200 });
  } catch (e) {
    console.error(e);
    return new Response('Server Error', { status: 500 });
  }
};

export const DELETE = async (req) => {
  const token = await getToken({ req });

  if (!token) {
    return new Response('You have to be logged in to unfollow', {
      status: 401,
    });
  }

  try {
    const { userId } = await req.json();

    await query(
      `DELETE FROM follows WHERE (follower_id = $1 and followee_id = $2);`,
      [token.id, userId],
    );

    return new Response({ status: 200 });
  } catch (e) {
    console.error(e);
    return new Response('Server Error', { status: 500 });
  }
};

export const GET = async (req) => {
  const token = await getToken({ req });

  if (!token) {
    return new Response('You have to be logged in to check your follows', {
      status: 401,
    });
  }

  try {
    const result = await query(
      `SELECT EXISTS (SELECT 1 FROM follows WHERE follower_id = $1 and followee_id = $2) as follows`,
      [token.id, req.nextUrl.searchParams.get('userId')],
    );
    return new Response(JSON.stringify(result.rows[0]), {
      status: 200,
    });
  } catch (e) {
    console.error(e);
    return new Response('Server Error', { status: 500 });
  }
};
