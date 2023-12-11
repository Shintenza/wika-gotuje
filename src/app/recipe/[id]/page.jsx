import Image from 'next/image';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { PiPrinterLight } from 'react-icons/pi';
import { BiCommentDetail } from 'react-icons/bi';
import Task from '@components/Task';
import CommentList from '@components/CommentList';
import { MdStar, MdStarHalf, MdStarBorder } from 'react-icons/md';

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
    comments: [
      {
        authorImg:
          'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        authorName: 'Karosław Jaczyński',
        date: '11.11.2023',
        text: 'Mniam, ale wchodzi',
      },
      {
        authorImg:
          'https://images.unsplash.com/photo-1615813967515-e1838c1c5116?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        authorName: 'Norbert Krzywonogi',
        date: '12.11.2023',
        text: 'Autorka nie zna się na gotowaniu. Sos leje się jak sraka. Przez ciebie zmarnowane pół kilo mięsa pajacu.',
      },
      {
        authorImg:
          'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        authorName: 'Stefania Kurwigrzmot',
        date: '12.11.2023',
        text: 'Sam się nie znasz na gotowaniu, sos jest w pyte!',
      },
      {
        authorImg:
          'https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=3086&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        authorName: 'Patrycja Parówka',
        date: '15.11.2023',
        text: 'Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi anim cupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor minim nulla est proident. Nostrud officia pariatur ut officia. Sit irure elit esse ea nulla sunt ex occaecat reprehenderit commodo officia dolor Lorem duis laboris cupidatat officia voluptate. Culpa proident adipisicing id nulla nisi laboris ex in Lorem sunt duis officia eiusmod. Aliqua reprehenderit commodo ex non excepteur duis sunt velit enim. Voluptate laboris sint cupidatat ullamco ut ea consectetur et est culpa et culpa duis.',
      },
      {
        authorImg:
          'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=3161&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        authorName: 'Barbara Miller',
        date: '17.11.2023',
        text: 'Zdefekowałam po tym.',
      },
    ],
  };

  const returnStars = () => {
    const stars = [];
    let starIndex = 0;

    let decimalPart = recipe.reviewAvg - Math.floor(recipe.reviewAvg);

    if (decimalPart <= 0.25) decimalPart = 0;
    else if (decimalPart >= 0.75) decimalPart = 1;
    else decimalPart = 0.5;

    for (let i = 0; i < Math.floor(recipe.reviewAvg + decimalPart); i++) {
      stars.push(<MdStar color='#FF8051' key={starIndex} />);
      starIndex++;
    }

    if (decimalPart === 0.5) {
      stars.push(<MdStarHalf color='#FF8051' key={starIndex} />);
      starIndex++;
    }

    const starsLeft =
      5 -
      (Math.floor(recipe.reviewAvg + decimalPart) +
        (decimalPart === 0.5 ? 1 : 0));

    for (let i = 0; i < starsLeft; i++) {
      stars.push(<MdStarBorder color='#FF8051' key={starIndex} />);
      starIndex++;
    }

    return stars;
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
            alt={recipe.authorName}
          />
        </div>
        <p className='text-lg'>{recipe.authorName}</p>
        <button className='rounded-lg bg-w_orange px-5 py-1 text-white hover:opacity-80'>
          Obserwuj
        </button>
        <div>
          <p className='inline-block pr-3'>
            <FaRegCalendarAlt className='inline-block text-lg' /> {recipe.date}
          </p>
          <p className='inline-block'>
            <BiCommentDetail className='inline-block text-lg' />{' '}
            {recipe.comments.length}
          </p>
        </div>
      </div>

      <div className='relative mt-10 h-[600px] w-full overflow-hidden'>
        <Image
          src={recipe.recipeImg}
          fill
          className='rounded-xl object-cover'
          alt={recipe.title}
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

        <button>
          <p className='inline-block'>
            Wydrukuj przepis
            <PiPrinterLight className='ml-5 inline-block text-5xl' />
          </p>
        </button>
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

      <button className='max-w-fit rounded-xl bg-black px-28 py-5 text-lg text-white hover:opacity-80'>
        Podziel się wrażeniami
      </button>

      <CommentList comments={recipe.comments} />

      <h2 className='pb-4 pt-12 font-secondary text-3xl'>Oceń przepis</h2>
      <div className='flex items-center gap-10'>
        <div className='text-xl'>
          Średnia {recipe.reviewAvg}/5 ({recipe.reviewCount} głosów)
        </div>
        <div className='flex gap-3 text-6xl'>{returnStars()}</div>
      </div>

      <div className='flex items-center justify-between pb-8 pt-12'>
        <label for='comment' className='font-secondary text-3xl'>
          Napisz komentarz
        </label>
        <div>
          <button className='text-w_orange underline hover:opacity-80'>
            Zaloguj się
          </button>{' '}
          aby dodać komentarz
        </div>
      </div>
      <div className='relative mb-24 h-80 w-full rounded-xl bg-gray-100'>
        <div className='p-8'>
          <textarea
            id='comment'
            rows='8'
            className='w-full resize-none bg-gray-100 placeholder:text-gray-600'
            placeholder='Napisz co sądzisz o tym przepisie.'
          ></textarea>
        </div>
        <button className='absolute bottom-6 right-8 rounded-xl bg-w_orange p-3 text-white hover:opacity-80'>
          Opublikuj komentarz
        </button>
      </div>
    </div>
  );
}
