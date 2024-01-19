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

const handleImageSaving = async (imageFile) => {
  const bytes = await imageFile.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const savePath = `./public/recipe_images/`;
  if (!existsSync(savePath)) {
    mkdirSync(savePath);
  }

  const newFileName = "/recipe_images/" + generateUniqueImageName(imageFile.name);
  await writeFile(savePath + newFileName, buffer);

  return newFileName;
};

export default handleImageSaving;
