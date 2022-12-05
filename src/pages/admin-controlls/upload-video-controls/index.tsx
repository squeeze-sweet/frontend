import { ChangeEvent, FormEventHandler, useState } from 'react';
import { Input } from '../../../components/ui-elements/input';
import { Button } from '../../../components/ui-elements/button';
import styles from './upload-audio.module.scss';
import Uploader from '../uploader';
import audioApi from '../../../services/api/admin';

export default function uploadVideo({ handleCloseModal, handleAddAudio }: any) {
  const [fileName, setFileName] = useState('');
  const [fileNameError, setFilenameError] = useState('');
  const [file, setFile] = useState<any>(null);
  const [fileError, setFileError] = useState('');

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
    if (file && !fileError) {
      await handleAddAudio(file);
      handleCloseModal();
    }
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <Input
        value={fileName}
        id='fileName'
        placeholder='type audio display name'
        label='file name'
        onChange={hanleFileNameChange}
        error={fileNameError}
      />
      <Uploader file={file} setFile={setFile} error={fileError} setFileError={setFileError} />
      {fileError && fileError}
      <Button htmlType='submit' disabled={!(file && fileName)}>
        Submit
      </Button>
    </form>
  );
}
