import { connectDb } from '@utils/connectDb';
import Recipe from '@models/Recipe';
import User from '@models/User';

export const getRecipe = async (id) => {
  await connectDb();
  const recipes = await Recipe.findById(id).populate({
    path: 'authorId',
    select: 'name image',
  });
  return recipes;
};
