import { ChangeEvent, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../store';
import { Input } from '../../components/ui-elements/input';
import { validateEmail } from './helpers';
import LayoutPage from '../../components/templates/form-page';
import yandexDiskApi from '../../services/api/api-yandex-disk';
import useLang from '../../hooks/useLang';
import styles from './emale-chosing.module.scss';
import api from '../../services/api/admin';

export default function EmaleChosing({ onSubmit }: any) {
  const { tr } = useLang();

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const setQuestionsAndCategories = useStore(state => state.setQuestionsAndCategories);
  const questionsAndCategories = useStore(state => state.questionsAndCategories);

  console.log('questionsAndCategories', questionsAndCategories);

  const getCategories = async (email: string, password: string) => {
    try {
      const { data } = await api.getQuestions(email, password);
      setQuestionsAndCategories(data);
      onSubmit();
    } catch (error) {}
  };
  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    let isError = false;
    if (!validateEmail(email)) {
      setEmailError('e-mail is incorrect, please type another');
      isError = true;
    }
    if (password.length < 3) {
      setPasswordError('please type minimum 4 symbols');
      isError = true;
    }
    if (isError) return;
    getCategories(email, password);
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
    <LayoutPage onSubmit={handleSubmit} buttonText={tr('Next')}>
      <Input
        value={email}
        id='email'
        placeholder={tr('type your e-mail')}
        label='email'
        onChange={handleEmailChange}
        error={emailError}
      />
      <Input
        value={password}
        id='password'
        placeholder='type your password'
        label='password'
        onChange={handlePasswordChange}
        error={passwordError}
      />
      {errorMsg && <p className={styles.error}>{errorMsg}</p>}
    </LayoutPage>
  );
}
