import Recipe from '@models/Recipe';
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
    const newComment = {
      authorId: token.id,
      commentDateAdded: Date.now(),
      content: data.get('comment'),
    };
    await Recipe.updateOne(
      { id: data.get('recipeId') },
      { $push: { comments: newComment } },
    );
    return new Response('ok', { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(error, { status: 500 });
  }
};
