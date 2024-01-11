import { unstable_noStore as noStore } from 'next/cache';
import { query } from './database';

const PAGE_SIZE = 6;

export const getTotalPages = async (filter = {}) => {
  await connectDb();
  try {
    const numberOfRecipies = await Recipe.countDocuments(filter);
    return Math.ceil(numberOfRecipies / PAGE_SIZE);
  } catch (error) {
    throw new Error('Failed to fetch total number of pages');
  }
};

export const getPaginatedRecipes = async (page, filter = {}) => {
  noStore();
  try {
    const recipes = (
      await query(
        `SELECT
          r.*,
          u.*,
          COUNT(comments.id) AS comment_count,
          COUNT(DISTINCT stars.author_id) AS review_count,
          COALESCE(AVG(stars.amount), 0) AS avg_rating
         FROM recipes r
         LEFT JOIN stars ON (r.id = stars.recipe_id)
         LEFT JOIN comments ON (r.id = comments.recipe_id)
         JOIN (SELECT
         id AS author_id,
         name AS author_name,
         image AS author_image FROM users) u
         ON r.author_id = u.author_id
         GROUP BY r.id, u.author_id, u.author_name, u.author_image;`,
      )
    ).rows;
    return recipes;
  } catch (error) {
    console.error(error);
    throw new Error('failed to fetch paginated recipes');
  }
};

export const getRecipe = async (id) => {
  try {
    const recipe = (
      await query(
        `SELECT
          r.*,
          u.*,
          COUNT(comments.id) AS comment_count,
          COUNT(DISTINCT stars.author_id) AS review_count,
          COALESCE(AVG(stars.amount), 0) AS avg_rating
         FROM recipes r
         LEFT JOIN comments ON (r.id = comments.recipe_id)
         LEFT JOIN stars ON (r.id = stars.recipe_id)
         JOIN (SELECT
         id AS author_id,
         name AS author_name,
         image AS author_image FROM users) u
         ON r.author_id = u.author_id
         WHERE r.id = $1
         GROUP BY r.id, u.author_id, u.author_name, u.author_image;`,
        [id],
      )
    ).rows;
    return recipe[0];
  } catch (error) {
    console.error(error);
    return null;
  }
};
