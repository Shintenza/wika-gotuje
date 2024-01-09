'use client';

import '@styles/add-recipe.css';
import { useEffect, useState } from 'react';
import PageSpinner from '@components/PageSpinner';
import MultiSelectDropdown from '@components/MultiSelectDropdown';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import SearchBar from '@components/SearchBar';
import { useDebouncedCallback } from 'use-debounce';

const FindFilters = () => {
  const [filters, setFilters] = useState(null);

  const searchParams = useSearchParams();
  const minPrepTime = searchParams.get('minPrepTime');
  const maxPrepTime = searchParams.get('maxPrepTime');

  useEffect(() => {
    const getFilters = async () => {
      const fetchedFilters = await fetch('/api/filters');
      const parsedFilters = await fetchedFilters.json();

      const filtersDict = {};

      parsedFilters.forEach((item) => {
        const { filterName, _id, ...rest } = item;
        filtersDict[item.filterName] = rest;
      });

      setFilters(filtersDict);
    };
    getFilters();
  }, []);

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

  if (!filters) {
    return <PageSpinner />;
  }

  return (
    <>
      <h1 className='pb-5 font-secondary text-4xl'>Filtruj</h1>

      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        <SearchBar name='Nazwa' paramName='name' onChange={handleSearch} />
        <MultiSelectDropdown
          options={filters['recipe_category'].availableOptions}
          name={filters['recipe_category'].filterDisplayName}
          setOptions={handleSearch}
          placeholder='Wszystkie'
          param_name='recipe_category'
        />

        <MultiSelectDropdown
          options={filters['advancement_level'].availableOptions}
          name={filters['advancement_level'].filterDisplayName}
          setOptions={handleSearch}
          placeholder='Wszystkie'
          param_name='advancement_level'
        />

        <MultiSelectDropdown
          options={filters['ingredients_availability'].availableOptions}
          name={filters['ingredients_availability'].filterDisplayName}
          setOptions={handleSearch}
          placeholder='Wszystkie'
          param_name='ingredients_availability'
        />

        <MultiSelectDropdown
          options={filters['diet_type'].availableOptions}
          name={filters['diet_type'].filterDisplayName}
          setOptions={handleSearch}
          placeholder='Wszystkie'
          param_name='diet_type'
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
          options={filters['region'].availableOptions}
          name={filters['region'].filterDisplayName}
          setOptions={handleSearch}
          placeholder='Wszystkie'
          param_name='region'
        />
      </div>
    </>
  );
};

export default FindFilters;
