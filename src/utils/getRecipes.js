import { connectDb } from '@utils/connectDb';
import Recipe from '@models/Recipe';
import User from '@models/User'
import { unstable_noStore as noStore } from 'next/cache';

const PAGE_SIZE = 6;

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
  noStore();
  try {
    const skip = (page - 1) * PAGE_SIZE;
    const recipies = await Recipe.find()
      .sort({ dateAdded: -1 })
      .select('-diet -region -steps -ingredients -portionsNumber')
      .skip(skip)
      .limit(PAGE_SIZE)
      .populate({
        path: 'authorId',
        select: 'name image',
        model: User
      })
      .lean();
    return recipies;
  } catch (error) {
    throw new Error('failed to fetch paginated recipies');
  }
};

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
