import type { Route } from './+types';
import { redirect } from 'react-router';
import MainLayout from '~/components/layouts/MainLayout';
import UserProfileForm from '~/components/UserProfileForm';
import { Flex } from '@radix-ui/themes';
import DisplayOrders from '~/components/DisplayOrders';
import axios from 'axios';
import type { User } from 'type';

export const loader = async ({ request }: Route.LoaderArgs) => {
  const refreshToken = request.headers.get('Cookie');

  if (!refreshToken) return redirect('/login');
  const token = refreshToken.split('=')[1];

  const userData = await axios.get<User>(
    `${import.meta.env.VITE_BACKEND_URL_DEV}/users/my-profile`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  if (userData.data.user.role === 'admin') {
    return redirect('/');
  }
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
