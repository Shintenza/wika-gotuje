import Image from 'next/image';
import Link from 'next/link';

import { FaFire, FaRegCalendarAlt, FaRegClock } from 'react-icons/fa';
import { BiCommentDetail } from 'react-icons/bi';
import { getRecipe } from '@utils/getRecipe';
import getStars from '@utils/getStars';
import RecipeLikeButton from '@components/RecipeLikeButton';

const RecipeCard = async ({ recipeId }) => {
  const recipe = await getRecipe(recipeId);
  const [_avgRating, stars] = getStars(recipe.starReviews);
  const formatter = new Intl.DateTimeFormat('pl-PL', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  return (
    <div className='relative flex w-full flex-col rounded-lg bg-w_gray'>
      <RecipeLikeButton />
      <Link href={`recipe/${recipe._id}`}>
        <div className=' relative min-h-[227px] w-full '>
          <Image
            src={recipe.image}
            fill
            alt='food image'
            className='rounded-t-lg object-cover'
          />
        </div>
        <div className='flex flex-col gap-2 px-2 py-1'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center'>
              {stars}
              <p className='pl-2 font-light'>
                {recipe.starReviews.length} ocen
              </p>
            </div>
            <p className='font-light'>
              <FaRegClock className='inline-block' /> {recipe.prepTime}
            </p>
          </div>
          <h1 className='block w-full text-2xl font-bold'>{recipe.name}</h1>
          <div className='flex items-center gap-2'>
            <div className='relative h-[38px] w-[38px]'>
              <Image
                src={recipe.authorId.image}
                fill
                className='rounded-full object-cover'
                alt='author image'
              />
            </div>
            <p className='font-light'>{recipe.authorId.name}</p>
          </div>
          <div className='flex justify-between'>
            <p>
              <FaFire size='1.3rem' className='inline-block' />{' '}
              <span className='font-light'>{recipe.difficulty}</span>
            </p>
            <div>
              <p className='inline-block pr-1'>
                <FaRegCalendarAlt className='inline-block' />{' '}
                <span className='font-light'>
                  {formatter.format(recipe.dateAdded)}
                </span>
              </p>
              <p className='inline-block'>
                <BiCommentDetail className='inline-block' />{' '}
                <span className='font-light'>{recipe.comments.length}</span>
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default RecipeCard;
