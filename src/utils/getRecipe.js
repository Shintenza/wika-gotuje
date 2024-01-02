import { connectDb } from '@utils/connectDb';
import Recipe from '@models/Recipe';

export const getRecipe = async (id) => {
  await connectDb();
  try {
    const recipe = await Recipe.findById(id)
      .populate({
        path: 'authorId',
        select: 'name image',
      })
      .populate({
        path: 'comments.authorId',
        select: 'name image',
      })
      .lean();
    return recipe;
  } catch (error) {
    return null;
  }
};
