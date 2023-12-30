'use client';

import { useSession } from 'next-auth/react';

export default function AddComment({ recipeId }) {
  const { status } = useSession();

  const submitComment = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.set('recipeId', recipeId);

    const res = await fetch('/api/comments', {
      method: 'POST',
      body: formData,
    });

    //TODO
    if (res.status == 200) {
      console.log('zajebis');
    }
  };

  return (
    <>
      <div className='flex items-center justify-between pb-8 pt-12'>
        <label htmlFor='comment' className='font-secondary text-3xl'>
          Napisz komentarz
        </label>
        {(status == 'unauthenticated' || status == 'loading') && (
          <div>
            <button className='text-w_orange underline hover:opacity-80'>
              Zaloguj się
            </button>{' '}
            aby dodać komentarz
          </div>
        )}
      </div>
      <div className='relative mb-24 h-80 w-full rounded-xl bg-gray-100'>
        <form onSubmit={submitComment}>
          <div className='p-8'>
            <textarea
              name='comment'
              rows='8'
              className='w-full resize-none bg-gray-100 placeholder:text-gray-600'
              placeholder='Napisz co sądzisz o tym przepisie.'
            ></textarea>
          </div>
          <button
            type='submit'
            className='absolute bottom-6 right-8 rounded-xl bg-w_orange p-3 text-white hover:opacity-80'
          >
            Opublikuj komentarz
          </button>
        </form>
      </div>
    </>
  );
}
