import { ChangeEvent, FormEventHandler, useState } from 'react';
import { Input } from '../../../components/ui-elements/input';
import { Button } from '../../../components/ui-elements/button';
import styles from './upload-audio.module.scss';

export default function UploadUserModal({ handleCloseModal, handleAddUser }: any) {
  const [fileName, setFileName] = useState('');
  const [fileNameError, setFilenameError] = useState('');

  const hanleFileNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (fileNameError && e.target.value) {
      setFilenameError('');
    }
    setFileName(e.target.value);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault();
    if (!fileName) {
      setFilenameError('name can not be empty!');
      console.error('name can not be empty!');
      return;
    }
    if (!fileNameError) {
      await handleAddUser(fileName);
      handleCloseModal();
    }
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <Input
        value={fileName}
        id='user email'
        placeholder='type new user email'
        label='user email'
        onChange={hanleFileNameChange}
        error={fileNameError}
      />
      <Button htmlType='submit' disabled={!fileName}>
        Submit
      </Button>
    </form>
  );
}
