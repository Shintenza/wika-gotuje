'use client';

import getStars from '@utils/getStars';

export default function RatingStars({ reviews, recipeId }) {
  const [avgRating, stars] = getStars(reviews);
  return (
    <>
      <h2 className='pb-4 pt-12 font-secondary text-3xl'>Oceń przepis</h2>
      <div className='flex flex-wrap items-center'>
        <div className='pr-10 text-xl'>
          Średnia {avgRating}/5 ({reviews.length} głosów)
        </div>
        <div className='flex gap-3 text-6xl'>{stars}</div>
      </div>
    </>
  );
}
