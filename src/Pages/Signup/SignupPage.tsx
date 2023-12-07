import { useCreateAccount } from '@Hooks/index';
import useAuth from '@Hooks/useAuth';
import { useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

const Signup = ({
  email,
  password,
  nickname,
}: {
  email: string;
  password: string;
  nickname: string;
}) => {
  const navigate = useNavigate();
  const { mutate } = useCreateAccount();
  const { updateAuth } = useAuth();

  useEffect(() => {
    mutate(
      { email, password, nickname },
      {
        onSuccess: () => {
          updateAuth(true);
          navigate('/app/tutorial', { replace: true });
        },
      }
    );
  }, []);

  return null;
};

export const SignupPage = () => {
  const location = useLocation();

  const locationState = location.state;

  if (!locationState) {
    return <Navigate to="/" replace />;
  }

  const { fieldState } = locationState;

  return <Signup {...fieldState} />;
};
