import { useStore } from '../../store';
import { Button } from '../../components/ui-elements/button';
import styles from './general-info.module.scss';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Input } from '../../components/ui-elements/input';

type FormErrors = { firstName: string; lastName: string; jobTitle: string };

export const GeneralInfo = () => {
  const [localEmail, setLocalEmail] = useState('');
  const [errors, setErrors] = useState<FormErrors>({ firstName: '', lastName: '', jobTitle: '' });

  let navigate = useNavigate();
  const setEmail = useStore(state => state.setEmail);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    /*     if (!validateEmail(localEmail)) {
      setErrorMsg('e-mail format is invalid!');
      return;
    } else {
      setErrorMsg('');
      setEmail(localEmail);
    } */
    navigate('/general-info');
  };

  const handleEmailChange = (e: any) => {
    console.log(e.target.value);
    setLocalEmail(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <h1>Welcome!</h1>
      <div className={styles.inputs}>
        <Input
          id='first-name'
          placeholder="please type you'r first name"
          label='first-name'
          onChange={handleEmailChange}
          error={errors.firstName}
        />
        <Input
          id='last-name'
          placeholder="please type you'r last name"
          label='last-name'
          onChange={handleEmailChange}
          error={errors.lastName}
        />
        <Input
          id='job-title'
          placeholder="please type you'r job title"
          label='job-title'
          onChange={handleEmailChange}
          error={errors.jobTitle}
        />
      </div>

      <Button htmlType='submit'>Continue</Button>
    </form>
  );
};
