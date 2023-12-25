'use clinet';
import { useState } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { LiaTimesSolid } from 'react-icons/lia';

const ListElement = ({ content, idx, handleEdit, handleDelete }) => {
  const [editMode, setEditMode] = useState(false);
  const [editValue, setEditValue] = useState(content);

  const handleEditButton = () => {
    if (!editMode) {
      setEditMode(true);
      return;
    }
    if (editValue.length <= 5) return;
    setEditMode(false);
    handleEdit(idx, editValue);
  };

  return (
    <li className='my-4 ml-4'>
      <div className='flex items-center gap-2'>
        {editMode ? (
          <input
            type=''
            name=''
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className='bg-w_gray p-3'
          />
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
    </li>
  );
};

export default ListElement;
