import axios from 'axios';
import { api } from '~/lib/axios';

type PaypalClientId = {
  clientId: string;
};

export const getPaypalClientId = async (): Promise<PaypalClientId> => {
  try {
    const { data } = await api.get('/config/paypal');
    return data;
  } catch (error) {
    let message = 'Something went wrong';

    if (axios.isAxiosError(error)) {
      message = error.response?.data?.message;
    }

    throw new Error(message);
  }
};
