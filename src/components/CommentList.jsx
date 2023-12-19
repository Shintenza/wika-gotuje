'use client';

import { useState } from 'react';
import Comment from './Comment';

const CommentList = ({ comments }) => {
  const [loadedCount, setLoadedCount] = useState(Math.min(3, comments.length));

  const handleLoad = () => {
    setLoadedCount(loadedCount + Math.min(comments.length - loadedCount, 10));
  };

  if (comments.length == 0) {
    return (
      <div className='py-7 text-center text-2xl font-bold'>Brak komentarzy</div>
    );
  }

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

  return (
    <>
      <h1 className='py-[35px] font-secondary text-4xl'>Komentarze</h1>
      <div className='divide-y divide-gray-400 border-y border-gray-400'>
        {comments.slice(0, loadedCount).map((comment, key) => (
          <Comment comment={comment} key={key} />
        ))}
      </div>
      {returnButton()}
    </>
  );
};

export default CommentList;
