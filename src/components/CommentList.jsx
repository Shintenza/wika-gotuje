'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRef } from 'react';

import Comment from './Comment';
import RatingStars from './RatingStars';
import Link from 'next/link';

const CommentList = ({
  comments: commentsInitial,
  avgRating,
  reviewCount,
  recipeId,
}) => {
  const { status } = useSession();
  const [loadedCount, setLoadedCount] = useState(
    Math.min(3, commentsInitial.length),
  );
  const [comments, setComments] = useState(commentsInitial);
  const headerRef = useRef(null);
  const textboxRef = useRef(null);
  const writeCommentRef = useRef(null);

  const handleLoad = () => {
    setLoadedCount(loadedCount + Math.min(comments.length - loadedCount, 10));
  };

  const submitComment = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.set('recipeId', recipeId);

    const res = await fetch('/api/comments', {
      method: 'POST',
      body: formData,
    });

    if (res.status == 200) {
      const comment = await res.json();
      comment.commentDateAdded = new Date(comment.commentDateAdded);
      setComments([comment].concat(comments));
      setLoadedCount(loadedCount + 1);
      headerRef.current.scrollIntoView();
      textboxRef.current.value = '';
    } else {
      //TODO
    }
  };

  const returnButton = () => {
    const remainingComments = Math.min(comments.length - loadedCount);
    if (remainingComments > 0)
      return (
        <div
          className='mt-6 rounded-xl bg-black py-4 text-center text-lg font-bold text-white hover:opacity-80'
          onClick={handleLoad}
        >
          Załaduj {Math.min(remainingComments, 10)} kolejn
          {remainingComments == 1
            ? 'y'
            : remainingComments < 5
              ? 'e'
              : 'ych'}{' '}
          komentarz
          {remainingComments == 1 ? '' : remainingComments < 5 ? 'e' : 'y'}
        </div>
      );

    return;
  };

  const returnCommentList = () => {
    if (comments.length == 0)
      return (
        <div className='py-7 text-center text-2xl font-bold'>
          Brak komentarzy
        </div>
      );
    else
      return (
        <div className='divide-y divide-gray-400 border-y border-gray-400'>
          {comments.slice(0, loadedCount).map((comment, key) => (
            <Comment comment={comment} key={key} />
          ))}
        </div>
      );
  };

  const scrollToWriteComment = () => {
    if (writeCommentRef) writeCommentRef.current.scrollIntoView();
  };

  return (
    <>
      <h1 className='py-[35px] font-secondary text-4xl'>
        Przygotowałeś już ten przepis?
      </h1>
      <button
        onClick={scrollToWriteComment}
        className='max-w-fit rounded-xl bg-black px-28 py-5 text-lg text-white hover:opacity-80'
      >
        Podziel się wrażeniami
      </button>

      <h1 ref={headerRef} className='py-[35px] font-secondary text-4xl'>
        Komentarze
      </h1>
      {returnCommentList()}
      {returnButton()}

      <RatingStars
        avgRating={avgRating}
        reviewCount={reviewCount}
        recipeId={recipeId}
      />

      <div className='flex items-center justify-between pb-8 pt-12'>
        <label
          htmlFor='comment'
          className='font-secondary text-3xl'
          ref={writeCommentRef}
        >
          Napisz komentarz
        </label>
        {(status == 'unauthenticated' || status == 'loading') && (
          <div>
            <Link
              href={'/api/auth/signin?callbackUrl=/recipe/' + recipeId}
              className='text-w_orange underline hover:opacity-80'
            >
              Zaloguj się
            </Link>{' '}
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
              placeholder={
                status == 'unauthenticated' || status == 'loading'
                  ? 'Musisz się zalogować aby dodać komentarz.'
                  : 'Napisz co sądzisz o tym przepisie.'
              }
              ref={textboxRef}
              disabled={status == 'unauthenticated' || status == 'loading'}
            ></textarea>
          </div>
          {status == 'authenticated' && (
            <button
              type='submit'
              className='absolute bottom-6 right-8 rounded-xl bg-w_orange p-3 text-white hover:opacity-80'
            >
              Opublikuj komentarz
            </button>
          )}
        </form>
      </div>
    </>
  );
};

export default CommentList;
