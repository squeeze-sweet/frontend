import { ChangeEvent, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../store';
import { Input } from '../../components/ui-elements/input';
import { validateEmail } from './helpers';
import LayoutPage from '../../components/templates/form-page';
import { AudioPicker } from '../../components/ui-elements/audio-picker';
import { downloadconfigFile } from '../../services/api/api-yandex-disk';

import { google } from 'googleapis';

const CLIENT_ID = '31526199535-efjns9n6lp21ltba1n60f7essskosg5e.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground/';
const REFRESH_TOKEN =
  '1//04xn8jhKinRivCgYIARAAGAQSNwF-L9IrLY51-qe0RuzFDGRCNebzIXBsHg5uhWQLxKB79RkK0dqX34T92Tx0vyc7AGZRfpOwOKY';

export default function EmaleChosing({ onSubmit }: any) {
  const [errorMsg, setErrorMsg] = useState('');
  const setEmail = useStore(state => state.setEmail);
  const email = useStore(state => state.email);
  const initStepsData = useStore(state => state.initStepsData);
  let navigate = useNavigate();

  useEffect(() => {
    initStepsData();
  }, []);

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    const localEmail = e.target['email'].value;
    if (!validateEmail(localEmail)) {
      setErrorMsg('e-mail format is invalid!');
      return;
    } else {
      setEmail(localEmail);
    }
    onSubmit();
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const localEmail = e.target.value;
    if (errorMsg) {
      if (validateEmail(localEmail)) {
        setErrorMsg('');
      }
    }
  };

  return (
    <LayoutPage onSubmit={handleSubmit} buttonText='Continue'>
      <>
        <Input
          defaultValue={email}
          id='email'
          placeholder="please type you'r email here"
          label='email'
          onChange={handleEmailChange}
          error={errorMsg}
        />
        {/* <AudioPicker text='Calm' /> */}
      </>
    </LayoutPage>
  );
}
