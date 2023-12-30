'use client';

import { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa6';

const RecipeLikeButton = ({ _recipeId }) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleIsLiked = () => {
    setIsLiked(!isLiked);
  };

  return (
    <div
      className='absolute right-0 top-0 z-10 mr-2 mt-2 h-[30px] w-[30px] rounded-full bg-white hover:cursor-pointer'
      onClick={handleIsLiked}
    >
      {isLiked ? (
        <FaHeart className='m-auto h-full' color='#FF8051' />
      ) : (
        <FaRegHeart className='m-auto h-full' color='#FF8501' />
      )}
    </div>
  );
};

export default RecipeLikeButton;
