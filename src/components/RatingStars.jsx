'use client';
import { useState } from 'react';
import '@styles/stars.css';
import getStars from '@utils/getStars';

export default function RatingStars({
  avgRating: ratingInitial,
  reviewCount: countInitial,
  recipeId,
}) {
  let stars = [];
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
      setRating(parseFloat(reviews.avg_rating));
      setCount(reviews.review_count);
    } else {
      //TODO
    }
  };

  const onMouseEnter = (e) => {
    const index = parseInt(e.currentTarget.getAttribute('index'));
    const stars = Array.from(document.getElementsByTagName('svg')).filter((e) =>
      e.hasAttribute('index'),
    );
    for (let i = 0; i <= index; i++) {
      stars[i].classList.add('hovered');
    }
  };

  const onMouseLeave = (e) => {
    const index = parseInt(e.currentTarget.getAttribute('index'));
    const stars = Array.from(document.getElementsByTagName('svg')).filter((e) =>
      e.hasAttribute('index'),
    );
    for (let i = 0; i <= index; i++) {
      stars[i].classList.remove('hovered');
    }
  };

  stars = getStars(avgRating, submitReview, onMouseEnter, onMouseLeave);

  return (
    <>
      <h2 className='pb-4 pt-12 font-secondary text-3xl'>Oceń przepis</h2>
      <div className='transi flex flex-wrap items-center'>
        <div className='pr-10 text-xl'>
          Średnia {avgRating.toFixed(2)}/5 ({reviewCount} głosów)
        </div>
        <div className='flex gap-3 text-6xl'>{stars}</div>
      </div>
    </>
  );
}
