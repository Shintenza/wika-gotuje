import Pagination from '@components/Pagination';
import RecipeGrid from '@components/RecipeGrid';
import FindFilters from '@components/FindFilters';
import '@styles/add-recipe.css';
import { getFilteredRecipes } from '@utils/getRecipes';

const Page = async ({ searchParams }) => {
  const currentPage = Number(searchParams.page) || 1;

  const [recipes, totalPages] = await getFilteredRecipes(
    currentPage,
    searchParams,
  );

  return (
    <>
      <div className='page_padding'>
        <FindFilters />

        <h1 className='py-16 font-secondary text-4xl'>Dopasowane przepisy</h1>
      </div>
      <RecipeGrid recipes={recipes} />
      <Pagination totalPages={totalPages} />
    </>
  );
};

export default Page;
