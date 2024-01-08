'use client';

import { useRef } from 'react';
import { PiPrinterLight } from 'react-icons/pi';

const PrintRecipe = ({ name, ingredients, steps }) => {
  const printContentDiv = useRef(null);
  const printRecipe = () => {
    window.print()
  };
  return (
    <>
      <div id='print_content' ref={printContentDiv} className='hidden'>
        <h1>{name}</h1>
        <h2>Składniki</h2>
        <ul>
          {ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
        <h2>Przygotowanie</h2>
        <ul>
          {steps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ul>
      </div>
      <button onClick={printRecipe}>
        <p className='inline-block'>
          Wydrukuj przepis
          <PiPrinterLight className='ml-5 inline-block text-5xl' />
        </p>
      </button>
    </>
  );
};
export default PrintRecipe;
