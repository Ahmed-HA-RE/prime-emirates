import type { Route } from './+types';
import { redirect } from 'react-router';
import MainLayout from '~/components/layouts/MainLayout';
import UserProfileForm from '~/components/UserProfileForm';
import { Flex } from '@radix-ui/themes';
import DisplayOrders from '~/components/DisplayOrders';

export const loader = ({ request }: Route.LoaderArgs) => {
  const refreshToken = request.headers.get('Cookie');

  if (!refreshToken) return redirect('/login');
};

const UserProfilePage = () => {
  return (
    <MainLayout>
      <Flex className='flex-col-reverse lg:flex-row gap-6'>
        {/* Left Col */}
        <UserProfileForm />
        {/* Right Col */}
        <DisplayOrders />
      </Flex>
    </MainLayout>
  );
};

export default UserProfilePage;
