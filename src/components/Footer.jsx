import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import wikagotuje_logo from '../../public/logo.svg';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className='page_padding mt-12 flex min-h-[50vh] flex-col items-center justify-between gap-4 bg-gray-100 py-6 font-light text-gray-700 sm:flex-row'>
      <div className='w-8/12 sm:w-3/12'>
        <div className='relative w-full'>
          <Image
            src={wikagotuje_logo}
            className='h-auto w-full'
            alt='logo of the page'
          />
        </div>
        <p className='pt-3 text-justify'>
          Smakuj życie poprzez kuchnię. Odkrywaj nowe smaki, twórz kulinarne
          arcydzieła i dziel się radością gotowania z innymi. W naszej
          przestrzeni każdy posiłek to wyjątkowa podróż przez smaki i aromaty.
        </p>
      </div>
      <div className='flex flex-col gap-4 text-center sm:flex-row sm:gap-32 sm:text-left'>
        <div className='flex flex-col gap-4'>
          <h1 className='text-xl font-bold'>WikaGotuje</h1>
          <span>O nas</span>
          <span>Feedback</span>
          <span>Kariera</span>
          <span>Kontakt</span>
        </div>
        <div className='flex flex-col gap-4'>
          <h1 className='text-xl font-bold'>Obserwuj</h1>
          <span>
            <FaFacebook className='inline-block' /> Facebook
          </span>
          <span>
            <FaInstagram className='inline-block' />
            Instagram
          </span>
          <span>
            <FaYoutube className='inline-block' /> YouTube
          </span>
          <span>
            <FaTwitter className='inline-block' />
            Twitter
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
