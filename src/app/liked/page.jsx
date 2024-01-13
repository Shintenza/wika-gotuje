import '@styles/liked.css';
import RecipeGrid from '@components/RecipeGrid';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@app/api/auth/[...nextauth]/route';
import Pagination from '@components/Pagination';
import { redirect } from 'next/navigation';
import { getFollowedRecipes, getLikedRecipes } from '@utils/getRecipes';
import SwitchButton from '@components/SwitchButton';

const Page = async ({ searchParams }) => {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/api/auth/signin?callbackUrl=/liked');
  const userId = session.user.id;

  const currentPage = Number(searchParams.page) || 1;
  const viewMode = searchParams.mode || 'liked';

  let recipes = [];
  let totalPages = 1;
  if (viewMode === 'liked') {
    [recipes, totalPages] = await getLikedRecipes(currentPage, userId);
  } else if (viewMode === 'followed') {
    [recipes, totalPages] = await getFollowedRecipes(currentPage, userId);
  }

  return (
    <>
      <div className='page_padding relative mb-5'>
        <SwitchButton active={viewMode === 'liked'} option='liked'>
          Polubione
        </SwitchButton>
        <SwitchButton active={viewMode === 'followed'} option='followed'>
          Obserwowane
        </SwitchButton>
      </div>
      <RecipeGrid recipes={recipes} refreshOnUnlike={viewMode === 'liked'} />
      <Pagination totalPages={totalPages} />
    </>
  );
};
export default Page;
