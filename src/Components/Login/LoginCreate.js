import React from 'react';

import { USER_POST } from '../../api';
import { UserContext } from '../../UserContext';
import useForm from '../../Hooks/useForm';
import Button from '../Forms/Button';
import Input from '../Forms/Input';
import useFetch from '../../Hooks/useFetch';
import Error from '../Helper/Error';
import Head from '../Helper/Head';

const LoginCreate = () => {
  const username = useForm();
  const email = useForm('email');
  const password = useForm('password');

  const { userLogin } = React.useContext(UserContext);
  const { loading, error, request } = useFetch();

  async function handleSubmit(event) {
    event.preventDefault();
    const { url, options } = USER_POST({
      username: username.value,
      email: email.value,
      password: password.value,
    });
    const { res } = await request(url, options);
    if (res.ok) userLogin(username.value, password.value);
  }
  return (
    <section className='animeLeft'>
      <Head title='Criar Conta' />
      <h1 className='title'> Cadastre-se</h1>
      <form onSubmit={handleSubmit}>
        <Input
          {...username}
          label='Usuário'
          type='text'
          name='username'
          className
        />
        <Input {...email} label='Email' type='email' name='email' className />
        <Input {...password} label='Senha' type='password' name='password' />

        {loading ? (
          <Button disabled>Cadastrando</Button>
        ) : (
          <Button>Cadastrar</Button>
        )}
        <Error error={error} />
      </form>
    </section>
  );
};

export default LoginCreate;
