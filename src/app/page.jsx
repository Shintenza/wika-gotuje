import Pagination from '@components/Pagination';
import RecipeGrid from '@components/RecipeGrid';
import { getRecipes, getTotalPages } from '@utils/getRecipes';
const Page = async ({searchParams}) => {
  const totalNumberOfPages = await getTotalPages()
  const currentPage = Number(searchParams.page) || 1;

  return (
    <main>
      <h1 className='page_padding mb-8 font-secondary text-2xl font-bold'>Ostatnio dodane</h1>
      <RecipeGrid pageNumber={currentPage}/>
      <Pagination totalPages={totalNumberOfPages}/>
    </main>
  );
};

export default Page
