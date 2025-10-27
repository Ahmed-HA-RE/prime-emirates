import type { Route } from './+types';
import { redirect } from 'react-router';
import MainLayout from '~/components/layouts/MainLayout';
import UserProfileForm from '~/components/UserProfileForm';
import { Flex } from '@radix-ui/themes';
import DisplayOrders from '~/components/DisplayOrders';
import axios from 'axios';
import type { User } from 'type';

export const meta = () => [
  {
    title: 'User Profile | PrimEmirates',
  },
  {
    name: 'description',
    content:
      'Manage your account details, update your personal information, and view your orders on PrimEmirates.',
  },
];

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
