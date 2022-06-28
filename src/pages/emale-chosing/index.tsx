import { useStore } from '../../store';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '../../components/ui-elements/input';
import { validateEmail } from './helpers';
import LayoutPage from '../../components/templates/form-page';
import styles from './emale-chosing.module.scss';

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
    navigate('/general-info');
  };

  const handleEmailChange = (e: any) => {
    console.log(e.target.value);
    setLocalEmail(e.target.value);
  };

  return (
    <LayoutPage handleSubmit={handleSubmit} heading='Who are you?' buttonText='Continue'>
      <Input
        id='email'
        placeholder="please type you'r email here"
        label='email'
        onChange={handleEmailChange}
        error={errorMsg}
      />
    </LayoutPage>
  );
}
