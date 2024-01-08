'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { IoCloseSharp } from 'react-icons/io5';

import styles from '@styles/Navbar.module.css';

import wikagotuje_logo from '@../public/logo.svg';
import { redirect, usePathname } from 'next/navigation';
import { signIn, signOut, useSession } from 'next-auth/react';

const Navbar = () => {
  const pathname = usePathname();

  const [open, isOpen] = useState(false);
  const { data: session, status } = useSession();

  const navigationElements = [
    <Link
      className={`${pathname === '/' ? styles.active : ''}`}
      href='/'
      key={0}
      onClick={()=> isOpen(false)}
    >
      Strona główna
    </Link>,
    <Link
      className={`${pathname === '/find-recipe' ? styles.active : ''}`}
      href='/find-recipe'
      key={1}
      onClick={()=> isOpen(false)}
    >
      Znajdź przepis
    </Link>,
    <Link
      className={`${pathname === '/add-recipe' ? styles.active : ''}`}
      href='/add-recipe'
      key={2}
      onClick={()=> isOpen(false)}
    >
      Dodaj przepis
    </Link>,
    <Link
      className={`${pathname === '/liked' ? styles.active : ''}`}
      href='/liked'
      key={3}
      onClick={()=> isOpen(false)}
    >
      Polubione
    </Link>,
  ];
  const getAuthBtn = (classesString) => {
    if (status == 'unauthenticated' || status == 'loading') {
      return (
        <button className={classesString} onClick={() => signIn()}>
          Zaloguj się
        </button>
      );
    } else {
      return (
        <Image
          src={session.user.image}
          alt='user avatar'
          width={50}
          height={50}
          className='rounded-full shadow-md'
          onClick={() => {
            signOut();
            redirect('/');
          }}
        />
      );
    }
  };

  return (
    <div className='page_padding mb-12 flex h-[20vh] items-center border-b-2 border-black'>
      <div className='flex h-full w-full items-center justify-between px-2 pt-2'>
        <div className='sm:6/12 relative h-4/5 w-9/12 lg:w-3/12'>
          <Link href='/'>
            <Image
              src={wikagotuje_logo}
              alt='Wika Gotuje Logo'
              fill
              className='font-logo object-contain'
            />
          </Link>
        </div>
        <div>
          <ul className='hidden gap-8 md:flex'>
            {navigationElements.map((e) => e)}
          </ul>
        </div>

        <div className='hidden pr-4 md:flex'>
          {getAuthBtn(
            'rounded-md border border-black p-2 px-4 hover:bg-black hover:text-white',
          )}
        </div>
      </div>

      <div className='mr-4 md:hidden' onClick={() => isOpen(!open)}>
        {!open ? <MenuIcon className='w-5' /> : <XIcon className='w-5' />}
      </div>

      <ul className={!open ? 'hidden' : styles.navbar_mobile}>
        <IoCloseSharp
          className='z-100 self-end text-3xl'
          onClick={() => isOpen(!open)}
        />
        {navigationElements.map((e) => e)}
        <div className='my-4 flex flex-col'>
          {getAuthBtn(
            'rounded-md border border-black p-2 px-4 hover:bg-black hover:text-white',
          )}
        </div>
      </ul>
    </div>
  );
};

export default Navbar;
