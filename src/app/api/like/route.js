import { getLikedRecipes } from '@utils/getRecipes';
import { getToken } from 'next-auth/jwt';

export const GET = async (req) => {
  const token = await getToken({ req });

  if (!token) {
    return new Response('you have to be logged in to get liked recipes', {
      status: 401,
    });
  }

  const page = Number(req.nextUrl.searchParams.get('page')) || 1;

  const [recipes, totalPages] = await getLikedRecipes(page, token.id);

  return new Response(JSON.stringify({ totalPages, recipes }), { status: 200 });
};
