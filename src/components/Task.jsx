'use client';

import { useState } from 'react';

import {
  RiCheckboxBlankCircleLine,
  RiCheckboxCircleLine,
} from 'react-icons/ri';

const Task = ({ task }) => {
  const [isDone, setIsDone] = useState(task.isDone);

  const handleIsDone = () => {
    setIsDone(!isDone);
  };

  return (
    <div>
      <label className='inline-block cursor-pointer text-lg'>
        <input
          className='peer appearance-none'
          type='checkbox'
          defaultChecked={isDone}
          onChange={handleIsDone}
        />
        <RiCheckboxBlankCircleLine className='mr-4 inline-block text-2xl peer-checked:hidden' />
        <RiCheckboxCircleLine className='mr-4 hidden text-2xl peer-checked:inline-block' />
        <span className='peer-checked:line-through'>{task.text}</span>
      </label>
    </div>
  );
};

export default Task;
