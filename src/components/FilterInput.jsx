const FilterInput = ({
  filterObj,
  stateElem,
  setStateElem,
}) => {
  return (
    <div>
      <label htmlFor='filter_input' className='text-lg'>
        {filterObj.filterDisplayName}
      </label>
      <select
        className='basic_input mt-3'
        name='filer_input'
        id='filter_input'
        value={stateElem}
        onChange={(e) => setStateElem(e.target.value)}
      >
        {filterObj.avaliableOptions.map((categoryName, count) => {
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
