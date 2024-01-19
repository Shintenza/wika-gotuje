import { authOptions } from '@app/api/auth/[...nextauth]/route';
import RecipeList from '@components/RecipeList';
import { getMyRecipies } from '@utils/getRecipes';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

const Page = async ({ searchParams }) => {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/api/auth/signin?callbackUrl=/my-recipes');

  const currentPage = Number(searchParams) || 1;
  const [recipes, total] = await getMyRecipies(currentPage, session.user.id);

  return (
    <div className='page_padding min-h-[20vh]'>
      <h1 className='section_header'>Twoje przepisy</h1>
      {recipes.length > 0 ? (
        <RecipeList recipes={recipes} />
      ) : (
        <h1 className='my-20 block text-center text-xl font-light'>
          Nie dodałeś jeszcze żadnego przepisu :(
        </h1>
      )}
    </div>
  );
};

export default Page;
