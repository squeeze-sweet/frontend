import { useStore } from '../../store';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '../../components/ui-elements/input';
import LayoutPage from '../../components/templates/form-page';
import styles from './general-info.module.scss';

type FormErrors = { firstName: string; lastName: string; jobTitle: string };

export const GeneralInfo = ({ onSubmit }: any) => {
  const [errors, setErrors] = useState<FormErrors>({ firstName: '', lastName: '', jobTitle: '' });
  const setUserInfo = useStore(state => state.setUserInfo);
  const { firstName, lastName, jobTitle } = useStore(state => state.userInfo);

  const addClipNameAndTitle = useStore(state => state.addClipNameAndTitle);

  let navigate = useNavigate();

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    const {
      'first-name': firstNameInput,
      'last-name': lastNameInput,
      'job-title': jobTitleInput,
    } = e.target;
    const firstName = firstNameInput.value;
    const lastName = lastNameInput.value;
    const jobTitle = jobTitleInput.value;

    let newErrorValue = { firstName: '', lastName: '', jobTitle: '' };

    if (!firstName || !lastName || !jobTitle) {
      if (!firstName) newErrorValue = { ...newErrorValue, firstName: "can't be empty" };
      if (!lastName) newErrorValue = { ...newErrorValue, lastName: "can't be empty" };
      if (!jobTitle) newErrorValue = { ...newErrorValue, jobTitle: "can't be empty" };
      if (JSON.stringify(errors) !== JSON.stringify(newErrorValue)) {
        setErrors(newErrorValue);
      }
      return;
    } else {
      setUserInfo({ firstName, lastName, jobTitle });
      addClipNameAndTitle(`${firstName} ${lastName}`, jobTitle);
      onSubmit();
    }
  };

  return (
    <LayoutPage onSubmit={handleSubmit} buttonText='Continue'>
      <div className={styles.inputs}>
        <Input
          id='first-name'
          placeholder="please type you'r first name"
          label='first-name'
          defaultValue={firstName}
          error={errors.firstName}
        />
        <Input
          id='last-name'
          placeholder="please type you'r last name"
          label='last-name'
          defaultValue={lastName}
          error={errors.lastName}
        />
        <Input
          id='job-title'
          placeholder="please type you'r job title"
          label='job-title'
          defaultValue={jobTitle}
          error={errors.jobTitle}
        />
      </div>
    </LayoutPage>
  );
};
