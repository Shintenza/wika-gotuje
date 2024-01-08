'use clinet';
import { useState } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { LiaTimesSolid } from 'react-icons/lia';

const ListElement = ({ content, idx, handleEdit, handleDelete }) => {
  const [editMode, setEditMode] = useState(false);
  const [editValue, setEditValue] = useState(content);
  const [isError, setIsError] = useState(false);

  const handleEditButton = () => {
    if (!editMode) {
      setEditMode(true);
      return;
    }

    if (editValue.length < 5) {
      setIsError(true);
      return;
    }

    setEditMode(false);
    handleEdit(idx, editValue);
  };

  const handleKeyDown = (e) => {
    if (e.key && e.key == 'Enter') {
      setEditValue(e.target.value);
      handleEditButton();
    }
  };

  return (
    <li className='my-4 ml-4'>
      <div className='flex items-center gap-2'>
        {editMode ? (
          <>
            <input
              type=''
              name=''
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className='bg-w_gray p-3'
              onKeyDown={handleKeyDown}
            />
          </>
        ) : (
          <p>{content}</p>
        )}
        <button
          className='rounded-full border-2 border-black p-2 text-xl'
          onClick={handleEditButton}
        >
          <FaRegEdit className='m-auto' />
        </button>
        <button
          className='rounded-full border-2 border-black p-2 text-xl'
          onClick={() => handleDelete(idx)}
        >
          <LiaTimesSolid className='m-auto' />
        </button>
      </div>

      {isError && editValue.length < 5 && (
        <p className='text-red-400'>
          Zawartość pola nie może być krótsza niż 5 znaków
        </p>
      )}
    </li>
  );
};

export default ListElement;
