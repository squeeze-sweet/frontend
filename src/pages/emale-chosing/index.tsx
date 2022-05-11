import { useStore } from '../../store';
import { Typography, Input, Button } from 'antd';
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
    e.preventDefault();
    if (!validateEmail(localEmail)) {
      setErrorMsg('e-mail format is invalid!');
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
      <Typography>
        <Title>Welcome!</Title>
      </Typography>
      <Input
        status={errorMsg ? 'error' : ''}
        placeholder='Please type your e-mail!'
        onChange={handleEmailChange}
        className={styles.input}
      />
      <div>
        <Button htmlType='submit' type='primary' size='large' disabled={!Boolean(localEmail)}>
          Далее
        </Button>
        {errorMsg && <p className={styles.error}>{errorMsg}</p>}
      </div>
    </form>
  );
}
