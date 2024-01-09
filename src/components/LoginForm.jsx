'use client';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { FaFacebook, FaGithub, FaGoogle } from 'react-icons/fa';
import wikagotuje_logo from '@../public/logo.svg';
import { useSearchParams } from 'next/navigation';

const LoginForm = ({ providers }) => {
  const searchParams = useSearchParams();
  const callback = searchParams.get('callbackUrl') || '';

  const providerDetails = (provider) => {
    if (provider.name == 'Facebook') {
      return {
        icon: <FaFacebook />,
        bgColor: '#4267B2',
        fgColor: '#ffffff',
      };
    }
    if (provider.name == 'GitHub') {
      return {
        icon: <FaGithub />,
        bgColor: '#161B22',
        fgColor: '#ffffff',
      };
    }
    if (provider.name == 'Google') {
      return {
        icon: <FaGoogle />,
        bgColor: '#ffffff',
        fgColor: '#000000',
      };
    }
  };

  return (
    <div className='flex min-h-[50vh] items-center justify-center'>
      <div className='relative flex w-full sm:4/5 md:w-2/5 flex-col items-center justify-center rounded-lg bg-w_gray py-5'>
        <Link href='/'>
          <Image
            src={wikagotuje_logo}
            alt='Wika Gotuje Logo'
            className='font-logo mx-auto w-1/2 object-contain'
          />
        </Link>
        <p className='py-3 px-2 text-center'>
          Aby się zalogować wybierz jedną z poniższych metod
        </p>
        {Object.values(providers).map((provider) => (
          <div key={provider.name} className='w-4/5 p-2'>
            <button
              style={{
                backgroundColor: providerDetails(provider).bgColor,
                color: providerDetails(provider).fgColor,
              }}
              onClick={() =>
                signIn(provider.id, {
                  callbackUrl: callback.length > 0 ? callback : '/',
                })
              }
              className='flex w-full justify-center rounded-lg p-3 shadow-md'
            >
              <span className='my-auto mr-2 inline-block text-2xl'>
                {providerDetails(provider).icon}
              </span>
              <span className='my-auto'>{provider.name}</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoginForm;
