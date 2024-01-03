'use client';
import { useState } from 'react';

import getStars from '@utils/getStars';

export default function RatingStars({
  avgRating: ratingInitial,
  reviewCount: countInitial,
  recipeId,
}) {
  const [avgRating, setRating] = useState(ratingInitial);
  const [reviewCount, setCount] = useState(countInitial);

  const submitReview = async (e) => {
    const stars = parseInt(e.currentTarget.getAttribute('index')) + 1;
    const formData = new FormData();
    formData.set('recipeId', recipeId);
    formData.set('stars', stars);

    const res = await fetch('/api/reviews', {
      method: 'POST',
      body: formData,
    });

    if (res.status == 200) {
      const reviews = await res.json();
      setRating(reviews.avgRating);
      setCount(reviews.reviewCount);
    } else {
      //TODO
    }
  };

  const stars = getStars(avgRating, submitReview);
  return (
    <>
      <h2 className='pb-4 pt-12 font-secondary text-3xl'>Oceń przepis</h2>
      <div className='flex flex-wrap items-center'>
        <div className='pr-10 text-xl'>
          Średnia {avgRating.toFixed(2)}/5 ({reviewCount} głosów)
        </div>
        <div className='flex gap-3 text-6xl'>{stars}</div>
      </div>
    </>
  );
}
