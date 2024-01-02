import Recipe from '@models/Recipe';
import { getToken } from 'next-auth/jwt';
import { writeFile } from 'fs/promises';
import { existsSync, mkdirSync } from 'fs';
import { extname } from 'path';

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

    const newRecipe = new Recipe({
      name: data.get('name'),
      prepTime: parseInt(data.get('prepTime')),
      ingredientsAvailability: data.get('ingredientsAvailability'),
      difficulty: data.get('difficulty'),
      portionsNumber: data.get('portionsNumber'),
      ingredients: JSON.parse(data.get('ingredients')),
      steps: JSON.parse(data.get('steps')),
      diet: JSON.parse(data.get('diet')),
      region: JSON.parse(data.get('region')),
      image: savePath.substring(8) + newFileName,
      authorId: token.id,
    });
    const savedRecipe = await newRecipe.save();
    return new Response(JSON.stringify({message: "ok", id: savedRecipe.id}), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(error, { status: 500 });
  }
};
