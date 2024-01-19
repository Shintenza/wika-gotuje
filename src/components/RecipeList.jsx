import RecipeListCard from './RecipeListCard';

const RecipeList = ({ recipes }) => {
  return (
    <div className={`grid grid-cols-1 grid-rows-${recipes.length} mb-8 gap-4`}>
      {recipes.map((recipe, index) => (
        <RecipeListCard recipe={recipe} key={index} />
      ))}
    </div>
  );
};

export default RecipeList;
