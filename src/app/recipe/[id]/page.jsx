import Image from 'next/image';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { BiCommentDetail } from 'react-icons/bi';
import Task from '@components/Task';
import CommentList from '@components/CommentList';
// import FollowButton from '@components/FollowButton';
import { getRecipe } from '@utils/getRecipes';
import { notFound } from 'next/navigation';
import PrintRecipe from '@components/PrintRecipe';
import '@styles/recipe.css';
import { getComments } from '@utils/getComments';

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
    <div className='page_padding recipe_wrapper'>
      <h1 className='py-[35px] font-secondary text-4xl'>{recipe.name}</h1>

      <div className='print_hide flex flex-wrap items-center gap-6 text-sm'>
        <div className='relative h-[44px] w-[44px]'>
          <Image
            src={recipe.author_image}
            fill
            className='rounded-full object-cover'
            alt={recipe.author_name}
          />
        </div>
        <p className='print_hide text-lg'>{recipe.author_name}</p>
        {/*<FollowButton userId={recipe.author_id} />*/}
        <div>
          <p className='inline-block pr-3'>
            <FaRegCalendarAlt className='inline-block text-lg' /> {}
            {formatter.format(recipe.added)}
          </p>
          <p className='inline-block'>
            <BiCommentDetail className='inline-block text-lg' />{' '}
            {recipe.comment_count}
          </p>
        </div>
      </div>

      <div className='relative mt-10 h-[600px] w-full overflow-hidden'>
        <Image
          src={process.env.NEXT_PUBLIC_CDN_URL + recipe.image}
          fill
          className='rounded-xl object-cover'
          alt={recipe.name}
        />
      </div>

      <div className='recipe_details flex flex-col justify-between gap-8 py-16 md:flex-row'>
        <div className='flex flex-col divide-y divide-black font-light uppercase sm:flex-row sm:divide-x sm:divide-y-0'>
          <div className='pb-4 text-center sm:py-0 sm:pr-8'>
            <p className='text-gray-500'>Czas</p>
            <p>{recipe.prep_time} min</p>
          </div>
          <div className='py-4 text-center sm:px-8 sm:py-0'>
            <p className='text-gray-500'>Porcje</p>
            <p>
              {recipe.portions}{' '}
              {recipe.portions > 1
                ? recipe.portions > 4
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
            <p>{recipe.availability}</p>
          </div>
        </div>

        <PrintRecipe
          name={recipe.name}
          ingredients={recipe.ingredients}
          steps={recipe.steps}
        />
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

      <CommentList
        comments={await getComments(params.id, 1)}
        avgRating={parseFloat(recipe.avg_rating)}
        reviewCount={recipe.review_count}
        recipeId={params.id}
      />
    </div>
  );
}
