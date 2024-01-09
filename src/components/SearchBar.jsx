import { MdSearch } from 'react-icons/md';
import '@styles/MultiSelectDropdown.module.css';
import { useSearchParams } from 'next/navigation';

const SearchBar = ({ name, paramName, onChange }) => {
  const param = useSearchParams().get(paramName);
  return (
    <div className='relative select-none'>
      <label className='text-lg'>{name}</label>
      <MdSearch className='absolute bottom-3 right-3 text-2xl' />
      <input
        type='text'
        placeholder='Wszystkie'
        className='mt-3 flex w-full items-center justify-between rounded-lg bg-w_gray p-3 pr-12'
        defaultValue={param || ''}
        onChange={(e) => onChange(e.currentTarget.value, paramName)}
      />
    </div>
  );
};

export default SearchBar;
