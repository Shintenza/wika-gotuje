"use server";

const { revalidatePath } = require("next/cache");

const revalidateRecipe = (articleId) => {
  revalidatePath(`/recipe/${articleId}`);
};

export { revalidateRecipe };
