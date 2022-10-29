import { ChangeEvent, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../store';
import { Input } from '../../components/ui-elements/input';
import { validateEmail } from './helpers';
import LayoutPage from '../../components/templates/form-page';
import yandexDiskApi from '../../services/api/api-yandex-disk';
import useLang from '../../hooks/useLang';

export default function EmaleChosing({ onSubmit }: any) {
  const { tr } = useLang();
  const [errorMsg, setErrorMsg] = useState('');
  const { email, setEmail, setPreloaderText } = useStore(state => ({
    email: state.email,
    setEmail: state.setEmail,
    setPreloaderText: state.setPreloaderText,
  }));

  let navigate = useNavigate();

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    const localEmail = e.target['email'].value;

    if (!validateEmail(localEmail)) {
      setErrorMsg(tr('e-mail format is invalid!'));
      return;
    } else {
      CheckAcess(localEmail);
    }
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const localEmail = e.target.value;
    if (errorMsg) {
      if (validateEmail(localEmail)) {
        setErrorMsg('');
      }
    }
  };

  async function CheckAcess(localEmail: string) {
    try {
      await yandexDiskApi.checkUserAcess(localEmail);
      setEmail(localEmail);
      onSubmit();
    } catch (error) {
      setErrorMsg(tr('You have no access to service, please contact your curator'));
    }
  }

  return (
    <LayoutPage onSubmit={handleSubmit} buttonText={tr('Next')}>
      <>
        <Input
          defaultValue={email}
          id='email'
          placeholder={tr('type your e-mail')}
          label='email'
          onChange={handleEmailChange}
          error={errorMsg}
        />
      </>
    </LayoutPage>
  );
}
