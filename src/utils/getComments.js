import { unstable_noStore as noStore } from 'next/cache';
import { query } from './database';

export const getComments = async (recipeId) => {
  //TODO: pagination
  noStore();
  try {
    const comments = (
      await query(
        `SELECT * FROM comments c
         JOIN (SELECT
         id AS author_id,
         name AS author_name,
         image AS author_image FROM users) u
         ON c.author_id = u.author_id
         WHERE c.recipe_id = $1;`,
        [recipeId],
      )
    ).rows;
    return comments;
  } catch (error) {
    console.error(error);
    throw new Error('failed to fetch comments');
  }
};
