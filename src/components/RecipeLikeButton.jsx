'use client';

import { useEffect, useState, useTransition } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa6';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const RecipeLikeButton = ({ recipeId, clickHandle = null }) => {
  const { data: session, status } = useSession();
  const [isLiked, setIsLiked] = useState(false);
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  useEffect(() => {
    const fetchIsLiked = async () => {
      if (status == 'loading' || status == 'unauthenticated') return;

      const response = await fetch(
        '/api/like/check?' +
          new URLSearchParams({
            userId: session.user.id,
            recipeId,
          }),
      );

      if (response.status == 200) {
        const { liked } = await response.json();
        setIsLiked(liked);
      }
    };

    fetchIsLiked();
  }, [status]);

  const handleClick = () => {
    if (status == 'loading') return;
    if (status == 'unauthenticated') {
      router.replace('/auth/signin', { scroll: false });
      return;
    }
    startTransition(async () => {
      const stateBefore = isLiked;
      try {
        const response = await fetch(
          `/api/like/${isLiked ? 'remove' : 'add'}`,
          {
            method: 'POST',
            body: JSON.stringify({ recipeId }),
          },
        );
        if (response.status != 200) {
          setIsLiked(stateBefore);
        }
      } catch {
        setIsLiked(isLiked);
      }
    });

    if (isLiked && clickHandle) {
      clickHandle(recipeId);
    }

    setIsLiked(!isLiked);
  };

  if (status == 'loading') {
    return <div></div>;
  }

  return (
    <div
      className='absolute right-0 top-0 z-10 mr-2 mt-2 h-[30px] w-[30px] rounded-full bg-white hover:cursor-pointer'
      onClick={handleClick}
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
