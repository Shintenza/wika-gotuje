'use client';
import Image from 'next/image';
import { useState } from 'react';
import { FiLogOut } from 'react-icons/fi';
import { signOut } from 'next-auth/react';
import { redirect } from 'next/navigation';

const UserAvatar = ({ image }) => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <div
      className='relative'
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onClick={() => {
        signOut();
        redirect('/');
      }}
    >
      <Image
        src={image}
        alt='user avatar'
        width={60}
        height={60}
        className='rounded-full shadow-md'
      />
      <div
        className={`${isVisible ? 'absolute' : 'hidden'} left-0 top-0 flex h-full w-full items-center justify-center rounded-full bg-black opacity-80`}
      >
        <FiLogOut className='text-2xl text-white' />
      </div>
    </div>
  );
};

export default UserAvatar;
