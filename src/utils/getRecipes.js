import { connectDb } from '@utils/connectDb';
import Recipe from '@models/Recipe';

export const getRecipes = async () => {
  await connectDb();
  const recipes = (await Recipe.find({}).select('id')).map((recipe) => {
    return recipe.id;
  });
  return recipes;
};
