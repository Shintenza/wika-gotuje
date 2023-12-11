'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { IoCloseSharp } from "react-icons/io5";

import styles from '@styles/Navbar.module.css';

import wikagotuje_logo from '../../public/logo.svg';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const pathname = usePathname();

  const [nav, setNav] = useState(false);

  const navigationElements = [
    <Link
      className={`${pathname === '/' ? styles.active : ''}`}
      href='/'
      key={0}
    >
      Strona główna
    </Link>,
    <Link
      className={`${pathname === '/find-recipe' ? styles.active : ''}`}
      href='/find-recipe'
      key={1}
    >
      Znajdź przepis
    </Link>,
    <Link
      className={`${pathname === '/add-recipe' ? styles.active : ''}`}
      href='/add-recipe'
      key={2}
    >
      Dodaj przepis
    </Link>,
    <Link
      className={`${pathname === '/liked' ? styles.active : ''}`}
      href='/liked'
      key={3}
    >
      Polubione
    </Link>,
  ];

  return (
    <div className='page_padding mb-12 flex h-[20vh] items-center border-b-2 border-black'>
      <div className='flex h-full w-full items-center justify-between px-2 pt-2'>
        <div className='sm:6/12 relative h-4/5 w-9/12 lg:w-3/12'>
          <Image
            src={wikagotuje_logo}
            alt='Wika Gotuje Logo'
            fill
            className='font-logo object-contain'
          />
        </div>
        <div>
          <ul className='hidden gap-8 md:flex'>
            {navigationElements.map((e) => e)}
          </ul>
        </div>

        <div className='hidden pr-4 md:flex'>
          <button className='rounded-md border border-black p-2 px-4 hover:bg-black hover:text-white'>
            Zaloguj się
          </button>
        </div>
      </div>

      <div className='mr-4 md:hidden' onClick={()=> setNav(!nav)}>
        {!nav ? <MenuIcon className='w-5' /> : <XIcon className='w-5' />}
      </div>

      <ul className={!nav ? 'hidden' : styles.navbar_mobile}>
        <IoCloseSharp className='self-end text-3xl z-100' onClick={()=> setNav(!nav)}/>
        {navigationElements.map((e) => e)}
        <div className='my-4 flex flex-col'>
          <button className='rounded-md border border-black p-2 px-4 hover:bg-black hover:text-white'>
            Zaloguj się
          </button>
        </div>
      </ul>
    </div>
  );
};

export default Navbar;
