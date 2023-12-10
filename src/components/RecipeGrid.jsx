import RecipeCard from '@components/RecipeCard';

const RecipeGrid = ({ sectionTitle, recipes }) => {
  return (
    <div className='page_padding'>
      <h1 className="text-2xl font-secondary font-bold mb-8">{sectionTitle}</h1>
      <div className='grid w-full  grid-cols-1 gap-1  sm:grid-cols-2 lg:grid-cols-3'>
        {recipes.map((recipe, key) => (
          <RecipeCard recipe={recipe} key={key} />
        ))}
      </div>
    </div>
  );
};

export default RecipeGrid;
