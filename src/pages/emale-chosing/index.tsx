import { useStore } from '../../store';
import { Button } from '../../components/ui-elements/button';
import styles from './emale-chosing.module.scss';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Input } from '../../components/ui-elements/input';
import { validateEmail } from './helpers';

export default function EmaleChosing() {
  const [localEmail, setLocalEmail] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  let navigate = useNavigate();
  const setEmail = useStore(state => state.setEmail);

  const handleSubmit = (e: any) => {
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
        id='email'
        placeholder="please type you'r email here"
        label='email'
        onChange={handleEmailChange}
        error={errorMsg}
      />
      <Button htmlType='submit'>Continue</Button>
    </form>
  );
}
