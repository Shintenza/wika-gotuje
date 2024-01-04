'use client';
import '@styles/liked.css';
import RecipeGrid from '@components/RecipeGrid';
import { useEffect, useState } from 'react';
import Pagination from '@components/Pagination';

const Page = ({ searchParams }) => {
  const [recipes, setRecipes] = useState([]);
  const [viewMode, setViewMode] = useState('liked');
  const [totalNumberOfPages, setTotalNumberOfPages] = useState(0);

  const currentPage = Number(searchParams.page) || 1;

  const handleDeleteRecipe = (recipeId) => {
    setRecipes((current) => current.filter((recipe) => recipe._id != recipeId));
  };

  useEffect(() => {
    const fetchLikedRecipes = async () => {
      try {
        const response = await fetch(`/api/like?page=${currentPage}`);
        if (response.status == 200) {
          const fetchedRecipes = await response.json();
          if (fetchedRecipes.recipes.length == 0) return;
          setRecipes(fetchedRecipes.recipes);
          setTotalNumberOfPages(fetchedRecipes.totalNumber);
        } else {
          return [];
        }
      } catch (error) { }
    };
    if (viewMode == 'liked') {
      fetchLikedRecipes();
    } else {
      setRecipes([]);
    }
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
