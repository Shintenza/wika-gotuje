import { query } from '@utils/database';
import { getToken } from 'next-auth/jwt';
import { existsSync, mkdirSync } from 'fs';
import handleImageSaving from '@utils/handleImageSaving';

export const PUT = async (req, { params }) => {
  const token = await getToken({ req });
  const recipeId = params.id;

  if (!token) {
    return new Response('You have to be logged in to modify the recipe', {
      status: 401,
    });
  }

  try {
    const data = await req.formData();
    const imageFile = data.get('image');

    const newFileName = imageFile == 'null' ? '' : handleImageSaving(imageFile);

    const result = await query(
      `UPDATE recipes 
        SET
         name = $1,
         prep_time = $2,
         difficulty = $3,
         category = $4,
         availability = $5,
         diet = $6,
         region = $7,
         portions = $8,
         ingredients = $9,
         steps = $10,
         image = $11,
         author_id = $12
       WHERE id = $13 AND author_id = $14
       RETURNING id;
      `,
      [
        data.get('name'),
        data.get('prepTime'),
        data.get('difficulty'),
        data.get('category'),
        data.get('availability'),
        JSON.parse(data.get('diet')),
        JSON.parse(data.get('region')),
        data.get('portions'),
        JSON.parse(data.get('ingredients')),
        JSON.parse(data.get('steps')),
        newFileName,
        token.id,
        recipeId,
        token.id,
      ],
    );
    return new Response(JSON.stringify(result.rows[0]), { status: 201 });
  } catch (error) {
    return new Response(error, { status: 500 });
  }
};
