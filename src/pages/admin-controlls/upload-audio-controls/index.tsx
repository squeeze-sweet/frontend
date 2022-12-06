import { ChangeEvent, FormEventHandler, useState } from 'react';
import { Input } from '../../../components/ui-elements/input';
import { Button } from '../../../components/ui-elements/button';
import styles from './upload-audio.module.scss';
import Uploader from '../uploader';
import audioApi from '../../../services/api/admin';

export default function uploadAudio({ handleCloseModal, handleAddAudio }: any) {
  const [file, setFile] = useState<any>(null);
  const [fileError, setFileError] = useState('');

  const handleSubmit: FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault();
    if (file && !fileError) {
      await handleAddAudio(file);
      handleCloseModal();
    }
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <Uploader file={file} setFile={setFile} error={fileError} setFileError={setFileError} />
      {fileError && fileError}
      <Button htmlType='submit' disabled={!file}>
        Submit
      </Button>
    </form>
  );
}
