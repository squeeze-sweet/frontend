import { useStore } from '../../store';
import { Typography, Input } from 'antd';
import { Button } from '../../components/ui-elements/button';
const { Title } = Typography;
import styles from './emale-chosing.module.scss';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const validateEmail = (email: string) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  );
};

export default function EmaleChosing() {
  const [localEmail, setLocalEmail] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  let navigate = useNavigate();
  const setEmail = useStore(state => state.setEmail);

  const handleSubmit = (e: any) => {
    console.log('1');
    e.preventDefault();
    if (!validateEmail(localEmail)) {
      setErrorMsg('e-mail format is invalid!');
      return;
    } else {
      setErrorMsg('');
      setEmail(localEmail);
    }
    navigate('/filenames-setting');
  };

  const handleEmailChange = (e: any) => {
    console.log(e.target.value);
    setLocalEmail(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <h1>Welcome!</h1>
      <Input
        status={errorMsg ? 'error' : ''}
        placeholder='Please type your e-mail!'
        onChange={handleEmailChange}
        className={styles.input}
      />
      <Button htmlType='submit' /* disabled={!Boolean(localEmail)} */>Continue</Button>
      {errorMsg && <p className={styles.error}>{errorMsg}</p>}
    </form>
  );
}
