import { authOptions } from '@app/api/auth/[...nextauth]/route';
import RecipeForm from '@components/RecipeForm';
import '@styles/add-recipe.css';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

const Page = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/api/auth/signin?callbackUrl=/add-recipe');
  }

  return (
    <div className='page_padding'>
      <h1 className='section_header'>Dodaj przepis</h1>
      <RecipeForm />
    </div>
  );
};

export default Page;
