import Image from 'next/image';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { PiPrinterLight } from 'react-icons/pi';
import { BiCommentDetail } from 'react-icons/bi';
import Task from '@components/Task';
import CommentList from '@components/CommentList';

export default function Page({ params }) {
  const recipe = {
    recipeImg:
      'https://images.unsplash.com/photo-1622973536968-3ead9e780960?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    reviewAvg: 4.28,
    title: 'Spaghetti Bolognese',
    authorImg:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    authorName: 'Stefania Kurwigrzmot',
    difficulty: 'Łatwy',
    reviewCount: 2137,
    commentCount: 69,
    date: '02.11.2023',
    time: 90,
    isLiked: false,
    portions: 4,
    availability: 'Łatwa',
    ingredients: [
      { text: '150g boczku', isDone: true },
      { text: '1 cebula', isDone: true },
      { text: '2 łodygi selera naciowego', isDone: true },
      { text: '1 marchewka', isDone: true },
      { text: '2 łyżki oliwy', isDone: false },
      { text: '500g mielonego mięsa', isDone: false },
      { text: '1 szklanka czerwonego wina', isDone: false },
      { text: '1 szklanka gorącego bulionu', isDone: false },
      { text: '4 łyżki koncentratu pomidorowego', isDone: false },
      { text: '1 puszka obranych pomidorów', isDone: false },
      { text: '1/2 szklanki mleka', isDone: false },
      { text: 'makaron spaghetti (75g/porcję)', isDone: false },
      { text: 'tarty parmezan', isDone: false },
    ],
    tasks: [
      {
        text: 'Boczek pokroić w drobną kostkę i włożyć na dużą patelnię, wytopić na małym ogniu aż się zrumieni. Przesunąć na bok, w wytopiony tłuszcz włożyć drobno posiekaną cebulę i zeszklić. Dodać drobno posiekany seler naciowy i startą marchewkę. Obsmażyć, następnie wszystko przełożyć do garnka.',
        isDone: true,
      },
      {
        text: 'Na patelnię wlać oliwę i obsmażyć mięso. Obsmażone mięso przełożyć do garnka z boczkiem i warzywami. Wlać wino i gotować mieszając ok. 5 minut. Dodać gorący bulion i koncentrat pomidorowy, wymieszać. Dodać pomidory z puszki, doprawić solą i pieprzem. Drewnianą łyżką rozdrobnić pomidory i wymieszać.',
        isDone: false,
      },
      {
        text: 'Przykryć i gotować na małym ogniu przez minimum 2 godziny, od czasu do czasu mieszając. W połowie gotowania dodać mleko. Podawać z ugotowanym makaronem spaghetti posypując tartym parmezanem.',
        isDone: false,
      },
    ],
    comments: [],
  };

  return (
    <div className='page_padding'>
      <h1 className='py-[35px] font-secondary text-4xl'>{recipe.title}</h1>

      <div className='flex items-center gap-6 text-sm'>
        <div className='relative h-[44px] w-[44px]'>
          <Image
            src={recipe.authorImg}
            fill
            className='rounded-full object-cover'
            alt='`{recipe.authorName}`'
          />
        </div>
        <p className='text-lg'>{recipe.authorName}</p>
        <div className='rounded-lg bg-w_orange px-5 py-1 text-white hover:opacity-80'>
          Obserwuj
        </div>
        <div>
          <p className='inline-block pr-3'>
            <FaRegCalendarAlt className='inline-block text-lg' /> {recipe.date}
          </p>
          <p className='inline-block'>
            <BiCommentDetail className='inline-block text-lg' />{' '}
            {recipe.commentCount}
          </p>
        </div>
      </div>

      <div className='relative mt-10 h-[600px] w-full overflow-hidden'>
        <Image
          src={recipe.recipeImg}
          fill
          className='rounded-xl object-cover'
          alt='`{recipe.title}`'
        />
      </div>

      <div className='flex justify-between py-16'>
        <div className='flex divide-x divide-black font-light uppercase'>
          <div className='pr-8 text-center'>
            <p className='text-gray-500'>Czas</p>
            <p>{recipe.time} min</p>
          </div>
          <div className='px-8 text-center'>
            <p className='text-gray-500'>Porcje</p>
            <p>
              {recipe.portions} {recipe.portions > 1 ? 'osoby' : 'osoba'}
            </p>
          </div>
          <div className='px-8 text-center'>
            <p className='text-gray-500'>Trudność</p>
            <p>{recipe.difficulty}</p>
          </div>
          <div className='pl-8 text-center'>
            <p className='text-gray-500'>Dostępność składników</p>
            <p>{recipe.availability}</p>
          </div>
        </div>

        <div>
          <p className='inline-block'>
            Wydrukuj przepis
            <PiPrinterLight className='ml-5 inline-block text-5xl' />
          </p>
        </div>
      </div>

      <div className='grid grid-cols-10 pb-4'>
        <div className='col-span-4 pr-5'>
          <h2 className='pb-4 text-2xl font-bold'>Składniki</h2>
          {recipe.ingredients.map((task, key) => (
            <Task task={task} key={key} />
          ))}
        </div>
        <div className='col-span-6 pl-5'>
          <h2 className='pb-4 text-2xl font-bold'>Kroki przygotowania</h2>
          {recipe.tasks.map((task, key) => (
            <Task task={task} key={key} />
          ))}
        </div>
      </div>

      <h1 className='py-[35px] font-secondary text-4xl'>
        Przygotowałeś już ten przepis?
      </h1>

      <div className='max-w-fit rounded-xl bg-black px-28 py-5 text-lg text-white hover:opacity-80'>
        Podziel się wrażeniami
      </div>

      <h1 className='py-[35px] font-secondary text-4xl'>Komentarze</h1>
      <CommentList comments={recipe.comments} />
    </div>
  );
}
