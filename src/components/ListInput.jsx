'use clinet';
import { useState } from 'react';
import { IoMdAddCircle } from 'react-icons/io';

const ListInput = ({ handleAdd, placeholder }) => {
  const [inputValue, setInputValue] = useState('');

  return (
    <div className='mt-4'>
      <div className='flex items-center'>
        <input
          type='text'
          name=''
          id=''
          size='50'
          placeholder={placeholder}
          className='block h-full rounded-l-lg bg-w_gray p-3 outline-none'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <div className='inline-block rounded-r-lg bg-w_gray p-3'>
          <button
            onClick={() => {
              handleAdd(inputValue);
              setInputValue('');
            }}
          >
            <IoMdAddCircle className='inline-block bg-w_gray text-xl' />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListInput;
