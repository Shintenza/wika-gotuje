'use client';

import { useEffect, useState } from 'react';

import ListInput from './ListInput';
import ListElement from './ListElement';

const InteractiveList = ({ listTitle, placeholder, mainArray }) => {
  const [listElements, setListElements] = useState([]);

  useEffect(()=>{
    mainArray.current = listElements;
  }, [listElements])

  const updateMainArray = () => {
    console.log(mainArray)
  };

  const handleAddElement = (element) => {
    if (element.length <= 5) return;
    setListElements((current) => [...current, element]);
  };

  const handleEditElement = (index, newElement) => {
    const updatedArray = [...listElements];
    updatedArray[index] = newElement;

    setListElements(updatedArray);
  };

  const handleRemoveElement = (index) => {
    setListElements((current) => current.filter((_, idx) => idx !== index));
  };

  return (
    <>
      <h2 className='text-2xl mb-4'>{listTitle}</h2>

      <ul className='list-disc'>
        {listElements.map((ingredient, index) => {
          return (
            <ListElement
              key={index}
              content={ingredient}
              handleEdit={handleEditElement}
              handleDelete={handleRemoveElement}
              idx={index}
            />
          );
        })}
      </ul>
      <ListInput handleAdd={handleAddElement} placeholder={placeholder}/>
    </>
  );
};

export default InteractiveList;