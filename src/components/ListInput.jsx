'use clinet';
import { useState } from 'react';
import { IoMdAddCircle } from 'react-icons/io';

const ListInput = ({ handleAdd, placeholder }) => {
  const [inputValue, setInputValue] = useState('');
  const [isError, setIsError] = useState(false);

  const handleKeyDown = (e) => {
    if (e.key && e.key == 'Enter') {
      if (inputValue.length < 5) {
        setIsError(true);
        return;
      }
      handleAdd(inputValue);
      setInputValue('');
    }
  };

  return (
    <div className='mt-4'>
      <div className='flex items-center'>
        <input
          type='text'
          name=''
          id=''
          placeholder={placeholder}
          className='block h-full w-full rounded-l-lg bg-w_gray p-3 outline-none md:w-3/4 lg:w-2/5'
          value={inputValue}
          onKeyDown={handleKeyDown}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <div className='inline-block rounded-r-lg bg-w_gray p-3'>
          <button
            onClick={() => {
              if (inputValue.length < 5) setIsError(true);
              handleAdd(inputValue);
              setInputValue('');
            }}
          >
            <IoMdAddCircle className='inline-block bg-w_gray text-xl' />
          </button>
        </div>
      </div>
      {isError && inputValue.length < 5 && (
        <p className='text-red-400'>
          Zawartość pola nie może być krótsza niż 5 znaków
        </p>
      )}
    </div>
  );
};

export default ListInput;
