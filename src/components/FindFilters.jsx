'use client';

import '@styles/add-recipe.css';
import PageSpinner from '@components/PageSpinner';
import MultiSelectDropdown from '@components/MultiSelectDropdown';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import SearchBar from '@components/SearchBar';
import { useDebouncedCallback } from 'use-debounce';
import { Filters } from '@utils/filters';

const FindFilters = () => {
  const searchParams = useSearchParams();
  const minPrepTime = searchParams.get('minPrepTime');
  const maxPrepTime = searchParams.get('maxPrepTime');

  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback(async (value, filter) => {
    const params = new URLSearchParams(searchParams);
    if (value.length > 0) {
      params.set(filter, value);
    } else {
      params.delete(filter);
    }
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, 300);

  return (
    <>
      <h1 className='pb-5 font-secondary text-4xl'>Filtruj</h1>

      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        <SearchBar name='Nazwa' paramName='name' onChange={handleSearch} />
        <MultiSelectDropdown
          options={Filters.category.options}
          name={Filters.category.displayName}
          setOptions={handleSearch}
          placeholder='Wszystkie'
          param_name='category'
        />

        <MultiSelectDropdown
          options={Filters.difficulty.options}
          name={Filters.difficulty.displayName}
          setOptions={handleSearch}
          placeholder='Wszystkie'
          param_name='difficulty'
        />

        <MultiSelectDropdown
          options={Filters.availability.options}
          name={Filters.availability.displayName}
          setOptions={handleSearch}
          placeholder='Wszystkie'
          param_name='availability'
        />

        <MultiSelectDropdown
          options={Filters.diet.options}
          name={Filters.diet.displayName}
          setOptions={handleSearch}
          placeholder='Wszystkie'
          param_name='diet'
        />

        <div>
          <label className='text-lg'>Czas przygotowania (w min)</label>
          <div className='flex gap-2'>
            <input
              type='number'
              defaultValue={minPrepTime || ''}
              min={0}
              max={maxPrepTime}
              className='basic_input'
              onChange={(e) => handleSearch(e.target.value, 'minPrepTime')}
              placeholder='Od'
            />
            <input
              type='number'
              defaultValue={maxPrepTime || ''}
              min={minPrepTime + 1 || 1}
              max={9999}
              className='basic_input'
              onChange={(e) => handleSearch(e.target.value, 'maxPrepTime')}
              placeholder='Do'
            />
          </div>
        </div>

        <MultiSelectDropdown
          options={Filters.region.options}
          name={Filters.region.displayName}
          setOptions={handleSearch}
          placeholder='Wszystkie'
          param_name='region'
        />
      </div>
    </>
  );
};

export default FindFilters;
