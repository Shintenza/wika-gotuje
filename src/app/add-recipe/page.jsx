'use client';

import '@styles/add-recipe.css';
import { useEffect, useRef, useState } from 'react';
import { MdAddPhotoAlternate } from 'react-icons/md';
import Image from 'next/image';
import InteractiveList from '@components/InteractiveList';
import FilterInput from '@components/FilterInput';
import PageSpinner from '@components/PageSpinner';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import MultiSelectDropdown from '@components/MultiSelectDropdown';

const Page = () => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/api/auth/signin?callbackUrl=/add-recipe');
    },
  });

  const [recipeName, setRecipeName] = useState('');
  const [recipeImage, setRecipeImage] = useState(null);
  const [filters, setFilters] = useState(null);

  const [recipeCategory, setRecipeCategory] = useState('');
  const [ingredientsAval, setIngredientsAval] = useState('');
  const [dietType, setDietType] = useState([]);
  const [region, setRegion] = useState([]);
  const [advancementLevel, setAdvancementLevel] = useState('');
  const [prepTime, setPrepTime] = useState('');

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

  const submitRecipe = () => {
    console.log('To be continued');
  };

  if (!filters) {
    return <PageSpinner />;
  }

  return (
    <div className='page_padding'>
      <h1 className='section_header'>Dodaj przepis</h1>
      <div className='add_recipe mb-10 grid grid-cols-4 grid-rows-2 gap-x-4 gap-y-16'>
        <div className='col-span-2'>
          <label htmlFor='recipe_name'>Nazwa przepisu</label>
          <input
            value={recipeName}
            type='text'
            id='recipe_name'
            name='recipe_name'
            placeholder='np. Pizza hawajska'
            className='basic_input'
            onChange={(e) => setRecipeName(e.target.value)}
          />
        </div>
        <div className='col-span-2'>
          <FilterInput
            filterObj={filters['recipe_category']}
            stateElem={recipeCategory}
            setStateElem={setRecipeCategory}
          />
        </div>
        <div className='col-span-2 col-start-3 row-span-2 row-start-1'>
          <label className='text-lg'>Wybierz zdjęcie</label>
          <input
            type='file'
            ref={imageInputRef}
            className='hidden'
            onChange={handleFileChange}
            accept='.png,.jpg,.jpeg'
          />
          <button
            className='add_img_btn'
            onClick={() => imageInputRef.current.click()}
          >
            {recipeImage ? (
              <Image
                src={URL.createObjectURL(recipeImage)}
                fill
                alt='selected recipe image'
              />
            ) : (
              <MdAddPhotoAlternate />
            )}
          </button>
        </div>
      </div>
      <h1 className='section_header'></h1>
      <InteractiveList
        listTitle='Potrzebne składniki'
        placeholder='Wpisz składnik i jego ilość'
        mainArray={recipeIngredients}
      />
      <InteractiveList
        listTitle='Lista kroków'
        placeholder='Wpisz opis kroku'
        mainArray={recipeSteps}
      />
      <h1 className='section_header'></h1>
      <h2 className='mb-4 text-2xl'>Dodatkowe informacje</h2>

      <div className='grid grid-cols-3 gap-4'>
        <FilterInput
          filterObj={filters['advancement_level']}
          stateElem={advancementLevel}
          setStateElem={setAdvancementLevel}
        />

        <FilterInput
          filterObj={filters['ingredients_avaliability']}
          stateElem={ingredientsAval}
          setStateElem={setIngredientsAval}
        />

        <MultiSelectDropdown
          options={filters['diet_type'].avaliableOptions}
          inputName={filters['diet_type'].filterDisplayName}
          setOptions={setDietType}
        />

        <FilterInput
          filterObj={filters['prep_time']}
          stateElem={prepTime}
          setStateElem={setPrepTime}
        />

        <MultiSelectDropdown
          options={filters['region'].avaliableOptions}
          inputName={filters['region'].filterDisplayName}
          setOptions={setRegion}
        />
      </div>
    </div>
  );
};

export default Page;
