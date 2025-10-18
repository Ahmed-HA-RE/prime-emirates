import { Alert, AlertTitle } from './ui/alert';

type AlertSuccessProps = {
  icon: React.ReactNode;
  message: string;
};

const AlertSuccess = ({ icon, message }: AlertSuccessProps) => {
  return (
    <Alert className='rounded-md border-l-6 border-green-600 bg-green-600/10 text-green-600 dark:border-green-400 dark:bg-green-400/10 dark:text-green-400 max-w-sm'>
      {icon}
      <AlertTitle>{message}</AlertTitle>
    </Alert>
  );
};

export default AlertSuccess;
