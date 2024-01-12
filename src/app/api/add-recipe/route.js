import { getToken } from 'next-auth/jwt';
import { writeFile } from 'fs/promises';
import { existsSync, mkdirSync } from 'fs';
import { extname } from 'path';
import { query } from '@utils/database';

const generateUniqueImageName = (imgName) => {
  const extension = extname(imgName);
  const currentTime = new Date().toISOString();
  const combinedString = `${imgName}-${currentTime}`;

  const base64String = Buffer.from(combinedString).toString('base64');
  return `${base64String}${extension}`;
};

export const POST = async (req) => {
  const token = await getToken({ req });

  if (!token) {
    return new Response('You have to be logged in to add a recipe', {
      status: 401,
    });
  }

  const data = await req.formData();

  try {
    const imageFile = data.get('image');
    if (!imageFile) return new Response('Missing image', { status: 400 });

    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const savePath = `./public/recipe_images/`;
    if (!existsSync(savePath)) {
      mkdirSync(savePath);
    }

    const newFileName = generateUniqueImageName(imageFile.name);
    await writeFile(savePath + newFileName, buffer);

    const result = await query(
      `INSERT INTO recipes (
        name,
        prep_time,
        difficulty,
        category,
        availability,
        diet,
        region,
        portions,
        ingredients,
        steps,
        image,
        author_id
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
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
        savePath.substring(8) + newFileName,
        token.id,
      ],
    );
    return new Response(JSON.stringify(result.rows[0]), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(error, { status: 500 });
  }
};
