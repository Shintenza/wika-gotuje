'use client';

import { useEffect, useState, useTransition } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function FollowButton({ userId }) {
  const { status } = useSession();
  const [isFollowed, setIsFollowed] = useState(false);
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  useEffect(() => {
    const fetchIsFollowed = async () => {
      if (status == 'loading' || status == 'unauthenticated') return;

      const response = await fetch(
        '/api/follow?' +
          new URLSearchParams({
            userId: userId,
          }),
      );

      if (response.status == 200) {
        const { follows: followed } = await response.json();
        setIsFollowed(followed);
      }
    };

    fetchIsFollowed();
  }, [status]);

  const handleClick = () => {
    if (status == 'loading') return;
    if (status == 'unauthenticated') {
      router.replace('/auth/signin', { scroll: false });
      return;
    }
    startTransition(async () => {
      const stateBefore = isFollowed;
      try {
        const response = await fetch(`/api/follow`, {
          method: `${isFollowed ? 'DELETE' : 'POST'}`,
          body: JSON.stringify({ userId: userId }),
        });
        if (response.status != 200) {
          setIsFollowed(stateBefore);
        }
      } catch {
        setIsFollowed(isFollowed);
      }
    });

    setIsFollowed(!isFollowed);
  };

  if (isFollowed)
    return (
      <button
        onClick={handleClick}
        className='rounded-lg bg-gray-100 px-5 py-1 hover:opacity-80'
      >
        Obserwujesz
      </button>
    );
  return (
    <button
      onClick={handleClick}
      className='rounded-lg bg-w_orange px-5 py-1 text-white hover:opacity-80'
    >
      Obserwuj
    </button>
  );
}
