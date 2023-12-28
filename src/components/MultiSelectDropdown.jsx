'use clinet';
import { useEffect, useRef, useState } from 'react';
import { MdArrowDropDown } from 'react-icons/md';
import { FaCheck } from 'react-icons/fa6';
import '@styles/MultiSelectDropdown.module.css';

const MultiSelectDropdown = ({ inputName, options, setOptions }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    window.addEventListener('click', handleOutsideClick);
    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    setOptions(selectedOptions);
  }, [selectedOptions]);

  const handleSelect = (e) => {
    let element = e.target;
    if (e.target.tagName != 'LI') element = element.parentNode;
    const option = element.lastChild.textContent;

    const selectedItemsSet = new Set(selectedOptions);

    if (element.classList.contains('active')) {
      element.classList.remove('active');
      selectedItemsSet.delete(option);
    } else {
      selectedItemsSet.add(option);
      element.classList.add('active');
    }

    setSelectedOptions(Array.from(selectedItemsSet));
  };

  return (
    <div className='select-none relative' ref={dropdownRef}>
      <label className='text-lg'>{inputName}</label>
      <div
        className='mt-3 flex items-center justify-between rounded-lg bg-w_gray p-3'
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOptions.length > 0 ? (
          <span>Wybrano elmentów: {selectedOptions.length}</span>
        ) : (
          <span className='text-gray-400'>Wybierz jedną lub więcej opcji</span>
        )}
        <MdArrowDropDown />
      </div>

      <ul
        ref={dropdownRef}
        className={`${!isOpen && 'hidden'} mt-1 rounded-lg bg-w_gray absolute w-full shadow-md`}
      >
        {options.map((option, count) => (
          <li
            className='group rounded-lg p-2 text-gray-600 hover:bg-w_orange hover:text-white'
            key={count}
            onClick={handleSelect}
          >
            <FaCheck className={`mr-2 hidden group-[.active]:inline-block`} />
            <span className='display'>{option}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MultiSelectDropdown;
