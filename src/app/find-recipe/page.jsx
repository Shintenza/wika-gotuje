import Pagination from '@components/Pagination';
import RecipeGrid from '@components/RecipeGrid';
import FindFilters from '@components/FindFilters';
import { getTotalPages } from '@utils/getRecipes';
import { getPaginatedRecipes } from '@utils/getRecipes';
import '@styles/add-recipe.css';

const Page = async ({ searchParams }) => {
  const {
    name,
    recipe_category,
    ingredients_availability,
    diet_type,
    region,
    advancement_level,
    minPrepTime,
    maxPrepTime,
  } = searchParams;

  const filter = {};

  if (name) filter['$text'] = { $search: name };
  if (advancement_level)
    filter['difficulty'] = { $in: advancement_level.split(',') };
  if (ingredients_availability)
    filter['ingredientsAvailability'] = {
      $in: ingredients_availability.split(','),
    };
  if (diet_type) filter['diet'] = { $in: diet_type.split(',') };
  if (region) filter['region'] = { $in: region.split(',') };
  if (minPrepTime && maxPrepTime)
    filter['prepTime'] = {
      $gte: parseInt(minPrepTime),
      $lte: parseInt(maxPrepTime),
    };
  if (minPrepTime)
    filter['prepTime'] = {
      $gte: parseInt(minPrepTime),
    };
  if (maxPrepTime)
    filter['prepTime'] = {
      $lte: parseInt(maxPrepTime),
    };

  const totalNumberOfPages = await getTotalPages(filter);
  const currentPage = Number(searchParams.page) || 1;

  const fetchedRecipes = await getPaginatedRecipes(currentPage, filter);

  return (
    <>
      <div className='page_padding'>
        <FindFilters />

        <h1 className='py-16 font-secondary text-4xl'>Dopasowane przepisy</h1>
      </div>
      <RecipeGrid recipes={fetchedRecipes} />
      <Pagination totalPages={totalNumberOfPages} />
    </>
  );
};

export default Page;
