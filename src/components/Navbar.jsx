'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import { MenuIcon, XIcon } from '@heroicons/react/outline';

import wikagotuje_logo from '../assets/logo.png';
import user_picture from '../assets/user.png';

const Navbar = () => {
  const [nav, setNav] = useState(false)
  const handleClick = () => setNav(!nav)

  const handleClose = () => setNav(!nav)

  return (
    <div className='w-screen h-[80px] z-10 border-b-2 border-black'>
      
        <div className='flex items-center justify-between px-2 pt-2 sm:mx-24'>
          <div>
            <Image src={wikagotuje_logo} alt='Wika Gotuje' className='h-70% w-auto sm:ml-4' />
          </div>
          <div>
            <ul className='hidden md:flex sm:space-x-8'>
              <li><button className='px-2 py-1 hover:underline'>Strona główna</button></li>
              <li><button className='px-2 py-1 hover:underline'>Znajdz przepis</button></li>
              <li><button className='px-2 py-1 hover:underline'>Dodaj przepis</button></li>
              <li><button className='px-2 py-1 hover:underline'>Polubione</button></li>
            </ul>
          </div>

          <div className='hidden md:flex pr-4'>
            <button className='border border-black px-4 p-2 rounded-md hover:bg-black hover:text-white'>Zaloguj się</button>
          </div>
        </div>
        
        <div className='md:hidden mr-4' onClick={handleClick}>
          {!nav ? <MenuIcon className='w-5' /> : <XIcon className='w-5' />}
        </div>

      <ul className={!nav ? 'hidden' : 'absolute bg-zinc-200 w-full px-8'}>
        <li className='border-b-2 border-zinc-300 w-full'><button onClick={handleClose}>Strona główna</button></li>
        <li className='border-b-2 border-zinc-300 w-full'><button onClick={handleClose}>Znajdz przepis</button></li>
        <li className='border-b-2 border-zinc-300 w-full'><button onClick={handleClose}>Dodaj przepis</button></li>
        <li className='border-b-2 border-zinc-300 w-full'><button onClick={handleClose}>Polubione</button></li>

        <div className='flex flex-col my-4'>
          <button className='border border-black px-4 p-2 rounded-md hover:bg-black hover:text-white'>Zaloguj się</button>
        </div>
      </ul>
    </div>
  );
};

export default Navbar;