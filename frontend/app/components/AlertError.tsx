import { Alert, AlertTitle } from './ui/alert';

type AlertErrorProps = {
  icon: React.ReactNode;
  message: string | React.ReactNode;
};

const AlertError = ({ icon, message }: AlertErrorProps) => {
  return (
    <Alert className='border-destructive bg-destructive/10 text-destructive rounded-none border-0 border-l-6'>
      {icon}
      <AlertTitle>{message}</AlertTitle>
    </Alert>
  );
};

export default AlertError;
