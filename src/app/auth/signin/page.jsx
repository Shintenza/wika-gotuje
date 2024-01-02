import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { getProviders } from 'next-auth/react';
import LoginForm from '@components/LoginForm';

const getConfiguredProviders = async () => {
  const session = await getServerSession();

  if (session) {
    redirect('/', 'replace');
  }

  const providers = await getProviders();
  return providers;
};

const Page = async () => {
  const providers = await getConfiguredProviders();
  return <LoginForm providers={providers} />;
};

export default Page;
