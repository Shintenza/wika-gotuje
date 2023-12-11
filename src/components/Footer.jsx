import wikagotuje_logo from '../assets/logo.png';
import user_picture from '../assets/user.png';
import Image from 'next/image';

const Footer = () => {
  return (
    <div class="flex items-end w-full min-h-scree bg-gray-300">

      <footer class="w-full text-gray-700 bg-gray-100 body-font">
        <div class="container flex flex-col justify-between flex-wrap px-5 py-24 mx-auto md:items-center lg:items-start md:flex-row md:flex-no-wrap">
          <div class="flex-shrink-0 w-64 mx-auto text-center md:mx-0  md:text-left">
            <div>
              <Image src={wikagotuje_logo} alt='Wika Gotuje' className='h-70% w-auto sm:ml-4' />
              <p class="mt-2 text-sm text-gray-500">Smakuj życie poprzez kuchnię. Odkrywaj nowe smaki, twórz kulinarne arcydzieła i dziel się radością gotowania z innymi. W naszej przestrzeni każdy posiłek to wyjątkowa podróż przez smaki i aromaty.</p>
              <div class="mt-4">
                <span class="inline-flex justify-center mt-2 sm:ml-auto sm:mt-0 sm:justify-start">
                  <a class="text-gray-500 cursor-pointer hover:text-gray-700">
                    <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      class="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                    </svg>
                  </a>
                  <a class="ml-3 text-gray-500 cursor-pointer hover:text-gray-700">
                    <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      class="w-5 h-5" viewBox="0 0 24 24">
                      <path
                        d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z">
                      </path>
                    </svg>
                  </a>
                  <a class="ml-3 text-gray-500 cursor-pointer hover:text-gray-700">
                    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                      stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                    </svg>
                  </a>
                  <a class="ml-3 text-gray-500 cursor-pointer hover:text-gray-700">
                    <svg fill="currentColor" stroke="currentColor" stroke-linecap="round"
                      stroke-linejoin="round" stroke-width="0" class="w-5 h-5" viewBox="0 0 24 24">
                      <path stroke="none"
                        d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z">
                      </path>
                      <circle cx="4" cy="4" r="2" stroke="none"></circle>
                    </svg>
                  </a>
                </span>
              </div>
            </div>
            <div class="flex flex-wrap flex-grow mt-10 -mb-10 text-center md:pl-20 md:mt-0 md:text-left">
              <div class="w-full px-4 lg:w-1/4 md:w-1/2">
                <h2 class="mb-3 text-sm font-medium tracking-widest text-gray-900 uppercase title-font">Wika gotuje</h2>
                <nav class="mb-10 list-none">
                  <li class="mt-3">
                    <a class="text-gray-500 cursor-pointer hover:text-gray-900">Strona główna</a>
                  </li>
                  <li class="mt-3">
                    <a class="text-gray-500 cursor-pointer hover:text-gray-900">Znajdz przepis</a>
                  </li>
                  <li class="mt-3">
                    <a class="text-gray-500 cursor-pointer hover:text-gray-900">Dodaj przepis</a>
                  </li>
                  <li class="mt-3">
                    <a class="text-gray-500 cursor-pointer hover:text-gray-900">Polubione</a>
                  </li>
                </nav>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-gray-300">
          <div class="container px-5 py-4 mx-auto">
            <p class="text-sm text-gray-700 capitalize xl:text-center">© 2023 Soydev All rights reserved </p>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Footer;
