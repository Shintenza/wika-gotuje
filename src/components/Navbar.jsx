'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import wikagotuje_logo from '../assets/logo.png';
import user_picture from '../assets/user.png';

const Navbar = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const mobileHandler = () => {
    setIsMobile(!isMobile);
  }

  const loginHandler = () => {
    setIsLogged(true);
  };

  return (
    <>
      {isMobile ? (
        <header className='flex justify-between border-b-2 border-black'>
          <div>
            <Image src={wikagotuje_logo} alt='Wika Gotuje' />
          </div>
          <div className='p-2' onClick={mobileHandler}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </div>
        </header>
      ) : (
        <header className='border-b-2 border-black flex justify-between items-center py-4 px-6'>
          <div>
            <Image src={wikagotuje_logo} alt='Wika Gotuje' className='h-70% w-auto' />
          </div>
          <div>
            <ul className='flex space-x-4'>
              <li><button className='px-2 py-1 hover:underline'>Strona główna</button></li>
              <li><button className='px-2 py-1 hover:underline'>Znajdz przepis</button></li>
              <li><button className='px-2 py-1 hover:underline'>Dodaj przepis</button></li>
              <li><button className='px-2 py-1 hover:underline'>Polubione</button></li>
            </ul>
          </div>
          <div>
            {isLogged ? (
              <img src={user_picture} alt='user picture' className='h-10 rounded-full' />
            ) : (
              <button onClick={loginHandler} className='border border-black px-4 p-2 rounded-md'>Zaloguj się</button>
            )}
          </div>
        </header>
      )}
    </>
  );
};

export default Navbar;
