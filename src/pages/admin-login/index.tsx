import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '../../components/ui-elements/input';
import styles from './introduce-yourself.module.scss';
import { Button } from '../../components/ui-elements/button';
import { validateEmail } from './helpers';
import { useStore } from '../../store';
import api from '../../services/api/admin';

export default function AdminLogin() {
  const navigate = useNavigate();

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const { email, setEmail, password, setPassword, setPreloaderText } = useStore(
    ({ email, setEmail, password, setPassword, setPreloaderText }) => ({
      email,
      setEmail,
      password,
      setPassword,
      setPreloaderText,
    }),
  );

  const getUsers = async (email: string, password: string) => {
    try {
      setPreloaderText('authorizing');
      const { data } = await api.getWhiteList(email, password);
      setPreloaderText('');
      navigate('/controls');
    } catch (error) {
      setPreloaderText('');
    }
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    let isError = false;
    if (!validateEmail(email)) {
      setEmailError('e-mail is incorrect, please type another');
      isError = true;
    }
    if (password.length < 3) {
      setPasswordError('please type minimum 3 symbols');
      isError = true;
    }
    if (isError) return;
    getUsers(email, password);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setEmail(e.target.value);
    if (emailError && validateEmail(email)) {
      setEmailError('');
    }
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    setPassword(e.target.value);

    if (passwordError && !(password.length < 4)) {
      setPasswordError('');
    }
  };

  return (
    <section className={styles['page-container']}>
      <div className={styles['header-container']}>
        <div className={styles.text}>
          <h1>admin panel login</h1>
        </div>
      </div>
      <div className={styles['content-container']}>
        <form onSubmit={handleSubmit}>
          <Input
            value={email}
            id='email'
            placeholder='please type your email here'
            label='email'
            onChange={handleEmailChange}
            error={emailError}
          />
          <Input
            value={password}
            id='password'
            placeholder='please type your password here'
            label='password'
            onChange={handlePasswordChange}
            error={passwordError}
          />
          <Button htmlType='submit'>log in</Button>
          {errorMsg && <p className={styles.error}>{errorMsg}</p>}
        </form>
      </div>
    </section>
  );
}
