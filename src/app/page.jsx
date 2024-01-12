import Pagination from '@components/Pagination';
import RecipeGrid from '@components/RecipeGrid';
import { getRecipes } from '@utils/getRecipes';

const Page = async ({ searchParams }) => {
  const currentPage = Number(searchParams.page) || 1;

  const [recipes, totalPages] = await getRecipes(currentPage);

  return (
    <main>
      <h1 className='page_padding mb-8 font-secondary text-2xl font-bold'>
        Ostatnio dodane
      </h1>
      <RecipeGrid recipes={recipes} />
      <Pagination totalPages={totalPages} />
    </main>
  );
};

export default Page;
