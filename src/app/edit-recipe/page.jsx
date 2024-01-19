import RecipeForm from '@components/RecipeForm';
import { getRecipe } from '@utils/getRecipes';

const Page = async ({ searchParams }) => {
  const recipeId = searchParams.id;
  const recipe = await getRecipe(recipeId);

  if (!recipe) {
    return (
      <h1 className='w-full text-center'>
        Recipe with given ID does not exist :(
      </h1>
    );
  }
  return (
    <div className='page_padding'>
      <h1 className='section_header'>Edytuj przepis</h1>
      <RecipeForm existingRecipe={recipe} />
    </div>
  );
};

export default Page;
