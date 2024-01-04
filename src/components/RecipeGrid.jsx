import RecipeCard from '@components/RecipeCard';

const RecipeGrid = async ({ recipes, clickHandle }) => {

  return (
    <div className='page_padding'>
      <div className='grid w-full  grid-cols-1 gap-1  sm:grid-cols-2 lg:grid-cols-3'>
        {recipes.map((recipe, index)=>(
          <RecipeCard recipeDetails={recipe} clickHandle={clickHandle} key={index}/>
        ))}
      </div>
    </div>
  );
};

export default RecipeGrid;
