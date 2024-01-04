import Image from 'next/image';
import Link from 'next/link';

import { FaFire, FaRegCalendarAlt, FaRegClock } from 'react-icons/fa';
import { BiCommentDetail } from 'react-icons/bi';
import getStars, { calcAvgRating } from '@utils/getStars';
import RecipeLikeButton from '@components/RecipeLikeButton';
import { getToken } from 'next-auth/jwt';

const RecipeCard = async ({ recipeDetails }) => {
  const {
    _id,
    name,
    difficulty,
    dateAdded,
    starReviews,
    image: recipeImage,
    comments,
    authorId: author,
    prepTime,
  } = recipeDetails;
  const stars = getStars(calcAvgRating(starReviews));
  const formatter = new Intl.DateTimeFormat('pl-PL', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  return (
    <div className='relative flex w-full flex-col rounded-lg bg-w_gray'>
      <RecipeLikeButton recipeId={_id.toString()}/>
      <Link href={`recipe/${_id}`}>
        <div className=' relative min-h-[227px] w-full '>
          <Image
            src={recipeImage}
            fill
            alt='food image'
            className='rounded-t-lg object-cover'
          />
        </div>
        <div className='flex flex-col gap-2 px-2 py-1'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center'>
              {stars}
              <p className='pl-2 font-light'>{starReviews.length} ocen</p>
            </div>
            <p className='font-light'>
              <FaRegClock className='inline-block' /> {prepTime}
            </p>
          </div>
          <h1 className='block w-full text-2xl font-bold'>{name}</h1>
          <div className='flex items-center gap-2'>
            <div className='relative h-[38px] w-[38px]'>
              <Image
                src={author.image}
                fill
                className='rounded-full object-cover'
                alt='author image'
              />
            </div>
            <p className='font-light'>{author.name}</p>
          </div>
          <div className='flex justify-between'>
            <p>
              <FaFire size='1.3rem' className='inline-block' />{' '}
              <span className='font-light'>{difficulty}</span>
            </p>
            <div>
              <p className='inline-block pr-1'>
                <FaRegCalendarAlt className='inline-block' />{' '}
                <span className='font-light'>
                  {formatter.format(dateAdded)}
                </span>
              </p>
              <p className='inline-block'>
                <BiCommentDetail className='inline-block' />{' '}
                <span className='font-light'>{comments.length}</span>
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default RecipeCard;
