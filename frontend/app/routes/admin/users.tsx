import { redirect } from 'react-router';
import type { Route } from './+types/users';
import axios from 'axios';
import type { User } from 'type';

export const loader = async ({ request }: Route.LoaderArgs) => {
  const refreshToken = request.headers.get('Cookie');
  if (!refreshToken) return redirect('/login');

  const token = refreshToken.split('=')[1];

  const { data } = await axios.get<User>(
    `${import.meta.env.VITE_BACKEND_URL_DEV}/users/my-profile`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  if (data.user.role !== 'admin') return redirect('/');
};

const UsersPage = () => {
  return <div>UsersPage</div>;
};

export default UsersPage;
