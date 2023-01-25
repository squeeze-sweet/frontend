import { ChangeEvent, FormEventHandler, useState } from 'react';
import { Input } from '../../../components/ui-elements/input';
import { Button } from '../../../components/ui-elements/button';
import styles from './upload-audio.module.scss';

export default function UploadUserModal({
  type,
  handleCloseModal,
  handleAddCategory,
  parentId,
}: any) {
  const [categoryName, setCategoryName] = useState('');
  const [categoryNameError, setCategorynameError] = useState('');

  const hanleFileNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (categoryNameError && e.target.value) {
      setCategorynameError('');
    }
    setCategoryName(e.target.value);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!categoryName) {
      setCategorynameError(`${type} can not be empty!`);
      console.error(`${type}name can not be empty!`);
      return;
    }
    if (!categoryNameError) {
      await handleAddCategory(categoryName, parentId);
      handleCloseModal();
    }
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <Input
        value={categoryName}
        id="categoryName"
        placeholder={`type new ${type} name`}
        label={`${type} name`}
        onChange={hanleFileNameChange}
        error={categoryNameError}
      />
      <Button htmlType="submit" disabled={!categoryName}>
        Submit
      </Button>
    </form>
  );
}
