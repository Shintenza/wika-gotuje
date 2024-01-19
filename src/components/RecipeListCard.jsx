'use client';
import Image from 'next/image';
import { FaBowlFood } from 'react-icons/fa6';
import { FaFire, FaRegClock, FaShoppingCart } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

const RecipeListCard = ({ recipe }) => {
  const router = useRouter();
  const formatter = new Intl.DateTimeFormat('pl-PL', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  const handleDelete = async () => {
    const recipeId = recipe.id;

    try {
      const response = await fetch(`/api/delete-recipe/${recipeId}`, {
        method: 'DELETE',
      });
      if (response.status == 200) {
        router.refresh();
      }
    } catch (error) { }
  };

  return (
    <div className='grid-cols-3 md:grid '>
      <div className='relative hidden min-h-[20vh] md:col-span-1 md:block'>
        <Image
          src={process.env.NEXT_PUBLIC_CDN_URL + recipe.image}
          fill
          alt='food image'
          className='rounded-t-lg object-cover'
        />
      </div>
      <div className='flex flex-col justify-between gap-8 md:col-span-2 md:flex-row'>
        <div className='flex flex-col justify-between md:w-4/5'>
          <h1 className='text-2xl'>{recipe.name}</h1>
          <div>
            <ul className='grid grid-cols-2 grid-rows-2'>
              <li>
                <FaBowlFood className='mr-2 inline-block text-xl' />{' '}
                {recipe.category}
              </li>
              <li>
                <FaFire className='mr-2 inline-block text-xl' />{' '}
                {recipe.difficulty}
              </li>

              <li>
                <FaShoppingCart className='mr-2 inline-block text-xl' />{' '}
                {recipe.availability}
              </li>

              <li>
                <FaRegClock className='mr-2 inline-block text-xl' />{' '}
                {recipe.prep_time}
              </li>
            </ul>
          </div>

          <span className='font-light'>
            Dodano: {formatter.format(recipe.added)}
          </span>
        </div>
        <div className='justify-top flex flex-col items-center gap-2'>
          <button className='block w-full border-2 border-solid border-black px-8 py-2 hover:bg-black hover:text-white '>
            Edit
          </button>
          <button
            className='block w-full bg-w_orange px-8 py-2 hover:bg-red-500'
            onClick={handleDelete}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeListCard;
