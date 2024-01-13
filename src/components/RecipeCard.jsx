import Image from 'next/image';
import Link from 'next/link';

import { FaFire, FaRegCalendarAlt, FaRegClock } from 'react-icons/fa';
import { BiCommentDetail } from 'react-icons/bi';
import getStars from '@utils/getStars';
import RecipeLikeButton from '@components/RecipeLikeButton';

const RecipeCard = async ({ recipeDetails, refreshOnUnlike }) => {
  const {
    id,
    name,
    difficulty,
    added,
    review_count,
    avg_rating,
    image: recipeImage,
    comment_count,
    author_name,
    author_image,
    prep_time,
  } = recipeDetails;
  const stars = getStars(avg_rating);
  const formatter = new Intl.DateTimeFormat('pl-PL', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  return (
    <div className='relative flex w-full flex-col rounded-lg bg-w_gray'>
      <RecipeLikeButton
        key={id}
        recipeId={id}
        refreshOnUnlike={refreshOnUnlike}
      />
      <Link scroll={false} href={`recipe/${id}`}>
        <div className=' relative min-h-[227px] w-full '>
          <Image
            src={process.env.NEXT_PUBLIC_CDN_URL + recipeImage}
            fill
            alt='food image'
            className='rounded-t-lg object-cover'
          />
        </div>
        <div className='flex flex-col gap-2 px-2 py-1'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center'>
              {stars}
              <p className='pl-2 font-light'>{review_count} ocen</p>
            </div>
            <p className='font-light'>
              <FaRegClock className='inline-block' /> {prep_time}
            </p>
          </div>
          <h1 className='block w-full text-2xl font-bold'>{name}</h1>
          <div className='flex items-center gap-2'>
            <div className='relative h-[38px] w-[38px]'>
              <Image
                src={author_image}
                fill
                className='rounded-full object-cover'
                alt='author image'
              />
            </div>
            <p className='font-light'>{author_name}</p>
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
                  {formatter.format(
                    typeof added == 'string' ? new Date(added) : added,
                  )}
                </span>
              </p>
              <p className='inline-block'>
                <BiCommentDetail className='inline-block' />{' '}
                <span className='font-light'>{comment_count}</span>
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default RecipeCard;
