'use client';

import { useState } from 'react';

import Image from 'next/image';

import {
  FaStar,
  FaRegStarHalfStroke,
  FaRegStar,
  FaHeart,
  FaRegHeart,
} from 'react-icons/fa6';
import { FaFire, FaRegCalendarAlt, FaRegClock } from 'react-icons/fa';
import { BiCommentDetail } from 'react-icons/bi';

const RecipeCard = ({ recipe }) => {
  const [isLiked, setIsLiked] = useState(recipe.isLiked);

  const handleIsLiked = () => {
    setIsLiked(!isLiked);
  };

  const returnStars = () => {
    const stars = [];

    let decimalPart = recipe.reviewAvg - Math.floor(recipe.reviewAvg);

    if (decimalPart <= 0.25) decimalPart = 0;
    else if (decimalPart >= 0.75) decimalPart = 1;
    else decimalPart = 0.5;

    for (let i = 0; i < Math.floor(recipe.reviewAvg + decimalPart); i++) {
      stars.push(<FaStar color='#FF8051' />);
    }

    if (decimalPart === 0.5)
      stars.push(<FaRegStarHalfStroke color='#FF8051' />);

    const starsLeft =
      5 -
      (Math.floor(recipe.reviewAvg + decimalPart) +
        (decimalPart === 0.5 ? 1 : 0));

    for (let i = 0; i < starsLeft; i++) {
      stars.push(<FaRegStar color='#FF8051' />);
    }

    return stars;
  };

  return (
    <div className='relative flex w-full flex-col rounded-lg bg-w_gray'>
      <div
        className='absolute right-0 top-0 z-10 mr-2 mt-2 h-[30px] w-[30px] rounded-full bg-white'
        onClick={handleIsLiked}
      >
        {isLiked ? (
          <FaHeart className='m-auto h-full' color='#FF8051' />
        ) : (
          <FaRegHeart className='m-auto h-full' color='#FF8501' />
        )}
      </div>
      <div className='relative min-h-[227px] w-full '>
        <Image
          src={recipe.recipeImg}
          fill
          alt='food image'
          className='rounded-t-lg object-cover'
        />
      </div>
      <div className='flex flex-col gap-2 px-2 py-1'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center'>
            {returnStars()}
            <p className='pl-2 font-light'>{recipe.reviewCount} ocen</p>
          </div>
          <p className='font-light'>
            <FaRegClock className='inline-block' /> {recipe.time}
          </p>
        </div>
        <h1 className='block w-full text-2xl font-bold'>{recipe.title}</h1>
        <div className='flex items-center gap-2'>
          <div className='relative h-[38px] w-[38px]'>
            <Image
              src={recipe.authorImg}
              fill
              className='rounded-full object-cover'
              alt='author image'
            />
          </div>
          <p className='font-light'>{recipe.authorName}</p>
        </div>
        <div className='flex justify-between'>
          <p>
            <FaFire size='1.3rem' className='inline-block' />{' '}
            <span className='font-light'>{recipe.difficulty}</span>
          </p>
          <div>
            <p className='inline-block pr-1'>
              <FaRegCalendarAlt className='inline-block' />{' '}
              <span className='font-light'>{recipe.date}</span>
            </p>
            <p className='inline-block'>
              <BiCommentDetail className='inline-block' />{' '}
              <span className='font-light'>{recipe.commentCount}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
