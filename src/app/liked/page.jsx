'use client';
import '@styles/liked.css';
import RecipeGrid from '@components/RecipeGrid';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Pagination from '@components/Pagination';

import { redirect } from 'next/navigation';

const Page = ({ searchParams }) => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/api/auth/signin?callbackUrl=/liked');
    },
  });
  const [recipes, setRecipes] = useState([]);
  const [viewMode, setViewMode] = useState('liked');
  const [totalNumberOfPages, setTotalNumberOfPages] = useState(0);

  const currentPage = Number(searchParams.page) || 1;

  const handleDeleteRecipe = (recipeId) => {
    setRecipes((current) => current.filter((recipe) => recipe._id != recipeId));
  };

  useEffect(() => {
    async function fetchRecipes() {
      try {
        const response = await fetch(
          `/api/${viewMode === 'liked' ? 'like' : 'follows'
          }?page=${currentPage}`,
        );
        if (response.status == 200) {
          const fetchedRecipes = await response.json();
          setRecipes(fetchedRecipes.recipes);
          setTotalNumberOfPages(fetchedRecipes.totalNumber);
        } else {
          setRecipes([]);
        }
      } catch (error) { }
    }
    fetchRecipes();
  }, [viewMode, currentPage]);

  return (
    <>
      <div className='page_padding relative mb-5'>
        <button
          className={`switch_button ${viewMode == 'liked' ? 'switch_button_active' : ''
            }`}
          onClick={() => setViewMode('liked')}
        >
          Polubione
        </button>
        <button
          className={`switch_button ${viewMode == 'subscribed' ? 'switch_button_active' : ''
            }`}
          onClick={() => setViewMode('subscribed')}
        >
          Obserwowane
        </button>
      </div>
      {recipes.length > 0 ? (
        <RecipeGrid recipes={recipes} clickHandle={handleDeleteRecipe} />
      ) : (
        <p className='mt-12 text-center text-2xl text-gray-500 '>
          Trochę tu pusto
        </p>
      )}

      <Pagination totalPages={totalNumberOfPages} />
    </>
  );
};
export default Page;
