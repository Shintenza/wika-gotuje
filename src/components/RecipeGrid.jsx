import RecipeCard from '@components/RecipeCard';
import { getPaginatedRecipes } from '@utils/getRecipes';

const RecipeGrid = async ({ sectionTitle, recipes, pageNumber }) => {
  const fetchedRecipies = await getPaginatedRecipes(pageNumber);

  return (
    <div className='page_padding'>
      <div className='grid w-full  grid-cols-1 gap-1  sm:grid-cols-2 lg:grid-cols-3'>
        {fetchedRecipies.map((recipe, index)=>(
          <RecipeCard recipeDetails={recipe} key={index}/>
        ))}
      </div>
    </div>
  );
};

export default RecipeGrid;
