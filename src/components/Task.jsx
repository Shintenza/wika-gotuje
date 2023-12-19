'use client';

import { useEffect, useState } from 'react';

import {
  RiCheckboxBlankCircleLine,
  RiCheckboxCircleLine,
} from 'react-icons/ri';

const Task = ({ task, recipeId }) => {
  const [isDone, setIsDone] = useState(false);
  const key = btoa(
    String.fromCodePoint(...new TextEncoder().encode(`${recipeId}_${task}`)),
  );

  const handleIsDone = () => {
    localStorage.setItem(key, !isDone);
    setIsDone(!isDone);
  };

  useEffect(() => {
    const saved = localStorage.getItem(key) === 'true' || false;
    setIsDone(saved);
  }, [key]);

  return (
    <div>
      <label className='inline-block cursor-pointer text-lg'>
        <input
          className='peer appearance-none'
          type='checkbox'
          checked={isDone}
          onChange={handleIsDone}
        />
        <RiCheckboxBlankCircleLine className='mr-4 inline-block text-2xl peer-checked:hidden' />
        <RiCheckboxCircleLine className='mr-4 hidden text-2xl peer-checked:inline-block' />
        <span className='peer-checked:line-through'>{task}</span>
      </label>
    </div>
  );
};

export default Task;
