import { unstable_noStore as noStore } from 'next/cache';
import { query } from './database';

const PAGE_SIZE = 6;

const getTotalPages = (totalRecipeCount) => {
  return Math.ceil(totalRecipeCount / PAGE_SIZE);
};

export const getRecipes = async (page) => {
  noStore();
  try {
    const recipes = (
      await query(
        `SELECT *, COUNT(*) OVER() AS total FROM detailed_recipes
         ORDER BY id DESC
         LIMIT $1 OFFSET $2`,
        [PAGE_SIZE, (page - 1) * PAGE_SIZE],
      )
    ).rows;
    const totalPages =
      recipes.length == 0 ? 1 : getTotalPages(recipes[0].total);
    return [recipes, totalPages];
  } catch (error) {
    console.error(error);
    throw new Error('failed to fetch paginated recipes');
  }
};

export const getFilteredRecipes = async (page, filters) => {
  noStore();
  try {
    const { name, minPrepTime, maxPrepTime } = filters;
    const difficulty = filters.difficulty
      ? filters.difficulty.split(',')
      : null;
    const category = filters.category ? filters.category.split(',') : null;
    const availability = filters.availability
      ? filters.availability.split(',')
      : null;
    const diet = filters.diet ? filters.diet.split(',') : null;
    const region = filters.region ? filters.region.split(',') : null;

    const recipes = (
      await query(
        `SELECT *, COUNT(*) OVER() AS total FROM detailed_recipes
         WHERE
          CASE WHEN $1::difficulty[] IS NOT NULL THEN difficulty = ANY ($1) ELSE true END AND
          CASE WHEN $2::category[] IS NOT NULL THEN category = ANY ($2) ELSE true END AND
          CASE WHEN $3::ingredients_availability[] IS NOT NULL THEN availability = ANY ($3) ELSE true END AND
          CASE WHEN $4::diet[] IS NOT NULL THEN diet && ($4) ELSE true END AND
          CASE WHEN $5::region[] IS NOT NULL THEN region && ($5) ELSE true END AND
          CASE WHEN $6::INTEGER IS NOT NULL THEN prep_time >= $6 ELSE true END AND
          CASE WHEN $7::INTEGER IS NOT NULL THEN prep_time <= $7 ELSE true END AND
          CASE WHEN $8::text IS NOT NULL THEN
            to_tsvector('pl_ispell', name) @@ websearch_to_tsquery($8)
          ELSE true END
         ORDER BY id DESC
         LIMIT $9 OFFSET $10`,
        [
          difficulty,
          category,
          availability,
          diet,
          region,
          minPrepTime,
          maxPrepTime,
          name,
          PAGE_SIZE,
          (page - 1) * PAGE_SIZE,
        ],
      )
    ).rows;

    const totalPages =
      recipes.length == 0 ? 1 : getTotalPages(recipes[0].total);
    return [recipes, totalPages];
  } catch (error) {
    console.error(error);
    throw new Error('failed to fetch paginated recipes');
  }
};

export const getLikedRecipes = async (page, userId) => {
  noStore();
  try {
    const recipes = (
      await query(
        `SELECT r.*, COUNT(*) OVER() AS total FROM likes l
         JOIN detailed_recipes r ON r.id = l.recipe_id
         WHERE l.user_id = $1
         ORDER BY id DESC
         LIMIT $2 OFFSET $3`,
        [userId, PAGE_SIZE, (page - 1) * PAGE_SIZE],
      )
    ).rows;
    const totalPages =
      recipes.length == 0 ? 1 : getTotalPages(recipes[0].total);
    return [recipes, totalPages];
  } catch (error) {
    console.error(error);
    throw new Error('failed to fetch paginated recipes');
  }
};

export const getFollowedRecipes = async (page, userId) => {
  noStore();
  try {
    const recipes = (
      await query(
        `SELECT r.*, COUNT(*) OVER() AS total FROM follows f
         JOIN detailed_recipes r ON r.author_id = f.followee_id
         WHERE f.follower_id = $1
         ORDER BY id DESC
         LIMIT $2 OFFSET $3`,
        [userId, PAGE_SIZE, (page - 1) * PAGE_SIZE],
      )
    ).rows;
    const totalPages =
      recipes.length == 0 ? 1 : getTotalPages(recipes[0].total);
    return [recipes, totalPages];
  } catch (error) {
    console.error(error);
    throw new Error('failed to fetch paginated recipes');
  }
};

export const getMyRecipies = async (page, userId) => {
  noStore();

  try {
    const recipes = (
      await query(
        `
      SELECT *, COUNT(*) OVER() AS total FROM recipes 
      WHERE author_id = $1
      ORDER BY added DESC
      LIMIT $2 OFFSET $3 `,
        [userId, PAGE_SIZE, (page - 1) * PAGE_SIZE],
      )
    ).rows;
    const totalPages = recipes.length == 0 ? 1 : getTotalPages(recipes[0].total);
    return [recipes, totalPages];
  } catch (error) {
    console.error(error);
    throw new Error('failed to fetch paginated recipes');
  }
};

export const getRecipe = async (id) => {
  try {
    const recipe = (
      await query('SELECT * FROM detailed_recipes WHERE id = $1', [id])
    ).rows;
    return recipe[0];
  } catch (error) {
    console.error(error);
    return null;
  }
};
