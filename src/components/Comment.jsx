import Image from 'next/image';
import { FaClock } from 'react-icons/fa6';

const Comment = ({ comment }) => {
  return (
    <div className='flex gap-8 py-12'>
      <div className='relative h-14 w-14 shrink-0'>
        <Image
          src={comment.authorImg}
          fill
          className='rounded-full object-cover'
          alt={comment.authorName}
        />
      </div>
      <div>
        <div className='text-lg font-bold'>{comment.authorName}</div>
        <div className='pb-7'>
          <FaClock className='inline-block' /> {comment.date}
        </div>
        <p>{comment.text}</p>
      </div>
    </div>
  );
};

export default Comment;
