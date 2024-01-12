import Image from 'next/image';
import { FaClock } from 'react-icons/fa6';

const Comment = ({ comment }) => {
  const formatter = new Intl.DateTimeFormat('pl-PL', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  return (
    <div className='flex gap-8 py-12'>
      <div className='relative h-14 w-14 shrink-0'>
        <Image
          src={comment.author_image}
          fill
          className='rounded-full object-cover'
          alt={comment.author_name}
        />
      </div>
      <div>
        <div className='text-lg font-bold'>{comment.author_name}</div>
        <div className='pb-7'>
          <FaClock className='inline-block' /> {formatter.format(comment.added)}
        </div>
        <p>{comment.content}</p>
      </div>
    </div>
  );
};

export default Comment;
