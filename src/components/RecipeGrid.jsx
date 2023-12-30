import RecipeCard from '@components/RecipeCard';
import { getRecipe } from '@utils/getRecipe';

const RecipeGrid = async ({ sectionTitle, recipes }) => {
  return (
    <div className='page_padding'>
      <h1 className='mb-8 font-secondary text-2xl font-bold'>{sectionTitle}</h1>
      <div className='grid w-full  grid-cols-1 gap-1  sm:grid-cols-2 lg:grid-cols-3'>
        {recipes.map((recipe, index) => (
          <RecipeCard recipeId={recipe} key={index} />
        ))}
      </div>
    </div>
  );
};

export default RecipeGrid;
