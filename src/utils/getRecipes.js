import { connectDb } from '@utils/connectDb';
import Recipe from '@models/Recipe';

const PAGE_SIZE = 6;

export const getRecipes = async () => {
  await connectDb();
  const recipes = (await Recipe.find({}).select('id')).map((recipe) => {
    return recipe.id;
  });
  return recipes;
};

export const getTotalPages = async () => {
  await connectDb();
  try {
    const numberOfRecipies = await Recipe.countDocuments();
    return Math.ceil(numberOfRecipies / PAGE_SIZE);
  } catch (error) {
    throw new Error('Failed to fetch total number of pages');
  }
};

export const getPaginatedRecipes = async (page) => {
  try {
    const skip = (page - 1) * PAGE_SIZE;
    const recipies = await Recipe.find()
      .select('-diet -region -steps -ingredients -portionsNumber')
      .skip(skip)
      .limit(PAGE_SIZE)
      .populate({
        path: 'authorId',
        select: 'name image'
      })
      .lean();
    return recipies;
  } catch (error) {
    throw new Error('failed to fetch paginated recipies');
  }
};
