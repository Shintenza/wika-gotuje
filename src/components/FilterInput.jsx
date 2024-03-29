import { useEffect } from 'react';

const FilterInput = ({ filterObj, stateElem, setStateElem }) => {
  useEffect(() => {
    setStateElem(filterObj.options[0]);
  }, []);
  return (
    <div>
      <label htmlFor='filter_input' className='text-lg'>
        {filterObj.displayName}
      </label>
      <select
        className='basic_input'
        name='filer_input'
        id='filter_input'
        value={stateElem}
        onChange={(e) => setStateElem(e.target.value)}
      >
        {filterObj.options.map((categoryName, count) => {
          return (
            <option value={categoryName} key={count}>
              {categoryName}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FilterInput;
