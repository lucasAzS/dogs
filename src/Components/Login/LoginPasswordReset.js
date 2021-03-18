import React from 'react';
import { useNavigate } from 'react-router';

import { PASSWORD_RESET } from '../../api';
import useForm from '../../Hooks/useForm';
import useFetch from '../../Hooks/useFetch';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import Error from '../Helper/Error';
import Head from '../Helper/Head';

const LoginPasswordReset = () => {
  const [login, setLogin] = React.useState('');
  const [key, setKey] = React.useState('');
  const password = useForm();
  const { error, loading, request } = useFetch();
  const navigate = useNavigate();

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const key = params.get('key');
    const login = params.get('login');
    if (key) setKey(key);
    if (login) setLogin(login);
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (password.validate()) {
      const { url, options } = PASSWORD_RESET({
        login,
        key,
        password: password.value,
      });
      const { res } = await request(url, options);
      if (res.ok) navigate('/login');
    }
  }

  return (
    <div>
      <Head title='Resete a senha' />
      {/* <p>{key}</p>
      <p>{login}</p> */}
      <h1 className='title'>Resete a senha</h1>
      <form onSubmit={handleSubmit}>
        <Input
          label='Nova Senha'
          type='password'
          name='password'
          {...password}
        />
        {loading ? (
          <Button disabled>Resetando...</Button>
        ) : (
          <Button>Resetar</Button>
        )}
      </form>
      {error && <Error error={error} />}
    </div>
  );
};

export default LoginPasswordReset;
