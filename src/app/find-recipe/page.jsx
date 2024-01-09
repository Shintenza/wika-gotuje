'use client';

import '@styles/add-recipe.css';
import { useEffect, useRef, useState } from 'react';
import FilterInput from '@components/FilterInput';
import PageSpinner from '@components/PageSpinner';
import MultiSelectDropdown from '@components/MultiSelectDropdown';
import { useRouter } from 'next/navigation';

const Page = () => {

  const router = useRouter();

  const [isError, setIsError] = useState(false);

  const [recipeName, setRecipeName] = useState('');
  const [recipeImage, setRecipeImage] = useState(null);
  const [filters, setFilters] = useState(null);

  const [recipeCategory, setRecipeCategory] = useState('');
  const [ingredientsAval, setIngredientsAval] = useState('');
  const [dietType, setDietType] = useState([]);
  const [region, setRegion] = useState([]);
  const [advancementLevel, setAdvancementLevel] = useState('');
  const [prepTime, setPrepTime] = useState(0);
  const [portionsNumber, setPortionsNumber] = useState(1);

  const recipeIngredients = useRef([]);
  const recipeSteps = useRef([]);

  const imageInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files && e.target.files[0];
    if (!selectedFile) return;

    e.target.value = null;
    setRecipeImage(selectedFile);
  };

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

  const submitRecipe = async () => {
    if (
      recipeName.length < 3 ||
      !recipeImage ||
      recipeSteps.current.length < 2 ||
      recipeIngredients.current.length < 2 ||
      prepTime <= 0 ||
      portionsNumber <= 0 ||
      portionsNumber > 100
    ) {
      setIsError(true);
      const isBrowser = typeof window !== 'undefined';
      if (!isBrowser) return;
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const data = new FormData();
    data.set('name', recipeName);
    data.set('prepTime', prepTime);
    data.set('ingredientsAvailability', ingredientsAval);
    data.set('difficulty', advancementLevel);
    data.set('portionsNumber', portionsNumber);
    data.set('ingredients', JSON.stringify(recipeIngredients.current));
    data.set('steps', JSON.stringify(recipeSteps.current));
    data.set('diet', JSON.stringify(dietType));
    data.set('region', JSON.stringify(region));
    data.set('image', recipeImage);

    const response = await fetch('/api/add-recipe', {
      method: 'POST',
      body: data,
    });
    if (response.status === 200) {
      const responseBody = await response.json();
      router.replace(`/recipe/${responseBody.id}`, { scroll: false });
    }
  };
  

  if (!filters) {
    return <PageSpinner />;
  }

  return (
    <div className='page_padding'>
      <h1 className='section_header'>Filtruj (Not ready yet)</h1>

      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        <FilterInput
          filterObj={filters['advancement_level']}
          stateElem={advancementLevel}
          setStateElem={setAdvancementLevel}
        />

        <FilterInput
          filterObj={filters['ingredients_availability']}
          stateElem={ingredientsAval}
          setStateElem={setIngredientsAval}
        />

        <div>
          <label className='text-lg'>Czas przygotowania (w min)</label>
          <input
            type='number'
            value={prepTime}
            className='basic_input'
            onChange={(e) => setPrepTime(e.target.value)}
          />
          {isError && prepTime <= 0 && (
            <p className='error_msg'>
              Czas przygotowania musi być większy od 0
            </p>
          )}
        </div>

        <div>
          <label className='text-lg'>Liczba porcji</label>
          <input
            type='number'
            min={0}
            max={20}
            value={portionsNumber}
            className='basic_input'
            onChange={(e) => setPortionsNumber(e.target.value)}
          />

          {isError && (portionsNumber <= 0 || portionsNumber > 100) && (
            <p className='error_msg'>
              Liczba porcji musi być większa od 0 ale mniejsza od 50
            </p>
          )}
        </div>

        <MultiSelectDropdown
          name="Rodzaj diety"
          options={filters['diet_type'].availableOptions}
          inputName={filters['diet_type'].filterDisplayName}
          setOptions={setDietType}
        />

        <MultiSelectDropdown
          name="Region pochodzenia"
          options={filters['region'].availableOptions}
          inputName={filters['region'].filterDisplayName}
          setOptions={setRegion}
        />
      </div>
    </div>

  );
};

export default Page;
