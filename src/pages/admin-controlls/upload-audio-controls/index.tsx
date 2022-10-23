import { ChangeEvent, FormEventHandler, useState } from 'react';
import { Input } from '../../../components/ui-elements/input';
import { Button } from '../../../components/ui-elements/button';
import styles from './upload-audio.module.scss';
import Uploader from '../uploader';

export default function uploadAudio() {
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

  const handleSubmit: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    if (!fileName) {
      setFilenameError('name can not be empty!');
      console.log('name can not be empty!');

      return;
    }
    console.log(file, fileError);
    if (file && !fileError) {
      console.log('success');
    }
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <Input
        value={fileName}
        id='fileName'
        placeholder="please type you'r email here"
        label='file name'
        onChange={hanleFileNameChange}
        error={fileNameError}
      />
      <Uploader file={file} setFile={setFile} error={fileError} setFileError={setFileError} />
      {fileError && fileError}
      <Button htmlType='submit'>Submit</Button>
    </form>
  );
}
