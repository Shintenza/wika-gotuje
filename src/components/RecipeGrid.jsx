import RecipeCard from '@components/RecipeCard';

const RecipeGrid = ({ recipes, refreshOnUnlike = false }) => {
  return (
    <div className='page_padding'>
      {recipes.length == 0 ? (
        <p className='mt-12 text-center text-2xl text-gray-500 '>
          Trochę tu pusto
        </p>
      ) : (
        <div className='grid w-full  grid-cols-1 gap-1  sm:grid-cols-2 lg:grid-cols-3'>
          {recipes.map((recipe, index) => (
            <RecipeCard
              recipeDetails={recipe}
              refreshOnUnlike={refreshOnUnlike}
              key={index}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipeGrid;
