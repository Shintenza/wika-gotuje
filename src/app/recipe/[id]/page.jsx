import Image from 'next/image';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { PiPrinterLight } from 'react-icons/pi';
import { BiCommentDetail } from 'react-icons/bi';
import Task from '@components/Task';
import CommentList from '@components/CommentList';
import { getRecipe } from '@utils/getRecipes';
import { notFound } from 'next/navigation';

export default async function Page({ params }) {
  const recipe = await getRecipe(params.id);

  if (!recipe) {
    notFound();
  }

  const formatter = new Intl.DateTimeFormat('pl-PL', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  return (
    <div className='page_padding'>
      <h1 className='py-[35px] font-secondary text-4xl'>{recipe.name}</h1>

      <div className='flex flex-wrap items-center gap-6 text-sm'>
        <div className='relative h-[44px] w-[44px]'>
          <Image
            src={recipe.authorId.image}
            fill
            className='rounded-full object-cover'
            alt={recipe.authorId.name}
          />
        </div>
        <p className='text-lg'>{recipe.authorId.name}</p>
        <button className='rounded-lg bg-w_orange px-5 py-1 text-white hover:opacity-80'>
          Obserwuj
        </button>
        <div>
          <p className='inline-block pr-3'>
            <FaRegCalendarAlt className='inline-block text-lg' /> {}
            {formatter.format(recipe.dateAdded)}
          </p>
          <p className='inline-block'>
            <BiCommentDetail className='inline-block text-lg' />{' '}
            {recipe.comments.length}
          </p>
        </div>
      </div>

      <div className='relative mt-10 h-[600px] w-full overflow-hidden'>
        <Image
          src={recipe.image}
          fill
          className='rounded-xl object-cover'
          alt={recipe.name}
        />
      </div>

      <div className='flex flex-col justify-between gap-8 py-16 md:flex-row'>
        <div className='flex flex-col divide-y divide-black font-light uppercase sm:flex-row sm:divide-x sm:divide-y-0'>
          <div className='pb-4 text-center sm:py-0 sm:pr-8'>
            <p className='text-gray-500'>Czas</p>
            <p>{recipe.prepTime} min</p>
          </div>
          <div className='py-4 text-center sm:px-8 sm:py-0'>
            <p className='text-gray-500'>Porcje</p>
            <p>
              {recipe.portionsNumber}{' '}
              {recipe.portionsNumber > 1
                ? recipe.portionsNumber > 4
                  ? 'osób'
                  : 'osoby'
                : 'osoba'}
            </p>
          </div>
          <div className='py-4 text-center sm:px-8 sm:py-0'>
            <p className='text-gray-500'>Trudność</p>
            <p>{recipe.difficulty}</p>
          </div>
          <div className='pt-4 text-center sm:py-0 sm:pl-8'>
            <p className='text-gray-500'>Dostępność składników</p>
            <p>{recipe.ingredientsAvailability}</p>
          </div>
        </div>

        <button>
          <p className='inline-block'>
            Wydrukuj przepis
            <PiPrinterLight className='ml-5 inline-block text-5xl' />
          </p>
        </button>
      </div>

      <div className='flex flex-col gap-5 pb-4 md:flex-row'>
        <div className='flex-shrink-0 md:w-1/3'>
          <h2 className='pb-4 text-2xl font-bold'>Składniki</h2>
          {recipe.ingredients.map((task, key) => (
            <Task task={task} recipeId={params.id} key={key} />
          ))}
        </div>
        <div className=''>
          <h2 className='pb-4 text-2xl font-bold'>Kroki przygotowania</h2>
          {recipe.steps.map((task, key) => (
            <Task task={task} recipeId={params.id} key={key} />
          ))}
        </div>
      </div>

      <h1 className='py-[35px] font-secondary text-4xl'>
        Przygotowałeś już ten przepis?
      </h1>

      <button className='max-w-fit rounded-xl bg-black px-28 py-5 text-lg text-white hover:opacity-80'>
        Podziel się wrażeniami
      </button>

      <CommentList
        comments={recipe.comments}
        reviews={recipe.starReviews}
        recipeId={params.id}
      />
    </div>
  );
}
