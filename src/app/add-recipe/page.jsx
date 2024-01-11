'use client';

import '@styles/add-recipe.css';
import { useRef, useState } from 'react';
import { MdAddPhotoAlternate } from 'react-icons/md';
import Image from 'next/image';
import InteractiveList from '@components/InteractiveList';
import FilterInput from '@components/FilterInput';
import PageSpinner from '@components/PageSpinner';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import MultiSelectDropdown from '@components/MultiSelectDropdown';
import { useRouter } from 'next/navigation';
import { Filters } from '@utils/filters';

const Page = () => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/api/auth/signin?callbackUrl=/add-recipe');
    },
  });

  const router = useRouter();

  const [isError, setIsError] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [recipeName, setRecipeName] = useState('');
  const [recipeImage, setRecipeImage] = useState(null);

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
    data.set('category', recipeCategory);
    data.set('prepTime', prepTime);
    data.set('availability', ingredientsAval);
    data.set('difficulty', advancementLevel);
    data.set('portions', portionsNumber);
    data.set('ingredients', JSON.stringify(recipeIngredients.current));
    data.set('steps', JSON.stringify(recipeSteps.current));
    data.set('diet', JSON.stringify(dietType));
    data.set('region', JSON.stringify(region));
    data.set('image', recipeImage);

    setSubmitting(true);

    const response = await fetch('/api/add-recipe', {
      method: 'POST',
      body: data,
    });
    if (response.status == 200) {
      const responseBody = await response.json();
      router.replace(`/recipe/${responseBody.id}`);
    } else {
      setSubmitting(false);
    }
  };

  if (submitting) return <PageSpinner />;

  return (
    <div className='page_padding'>
      <h1 className='section_header'>Dodaj przepis</h1>
      <div className='add_recipe mb-10 grid grid-cols-1 gap-x-4 gap-y-16 sm:grid-cols-2 sm:grid-rows-3 '>
        <div className=''>
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
          {isError && recipeName.length < 3 && (
            <p className='error_msg'>
              Nazwa przepisu musi zawierać co najmniej 3 znaki
            </p>
          )}
        </div>

        <div className='sm:row-span-1 sm:row-start-2'>
          <FilterInput
            filterObj={Filters.category}
            stateElem={recipeCategory}
            setStateElem={setRecipeCategory}
          />
        </div>
        <div className='row-span-6 sm:row-span-3'>
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
          {isError && !recipeImage && (
            <p className='error_msg'>Musisz dodać zdjęcie do przepisu</p>
          )}
        </div>
      </div>
      <h1 className='section_header'></h1>
      <InteractiveList
        listTitle='Potrzebne składniki'
        placeholder='Wpisz składnik i jego ilość'
        mainArray={recipeIngredients}
      />

      {isError && recipeIngredients.current.length < 2 ? (
        <p className='error_msg'>
          Przepis powinien wymagać co najmniej 2 składników
        </p>
      ) : (
        ''
      )}

      <InteractiveList
        listTitle='Lista kroków'
        placeholder='Wpisz opis kroku'
        mainArray={recipeSteps}
      />
      {isError && recipeSteps.current.length < 2 ? (
        <p className='error_msg'>
          Przepis powinien składać się z co najmniej 2 kroków
        </p>
      ) : (
        ''
      )}

      <h1 className='section_header'></h1>
      <h2 className='mb-4 text-2xl'>Dodatkowe informacje</h2>

      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        <FilterInput
          filterObj={Filters.difficulty}
          stateElem={advancementLevel}
          setStateElem={setAdvancementLevel}
        />

        <FilterInput
          filterObj={Filters.availability}
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
          name='Rodzaj diety (opcjonalne)'
          options={Filters.diet.options}
          inputName={Filters.diet.displayName}
          setOptions={setDietType}
        />

        <MultiSelectDropdown
          name='Region pochodzenia (opcjonalne)'
          options={Filters.region.options}
          inputName={Filters.region.displayName}
          setOptions={setRegion}
        />
      </div>
      <button
        className='mt-10 w-full rounded-lg bg-black p-3 text-white'
        onClick={submitRecipe}
      >
        Dodaj przepis
      </button>
    </div>
  );
};

export default Page;
