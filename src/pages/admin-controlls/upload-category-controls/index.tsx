import { ChangeEvent, FormEventHandler, useState } from 'react';
import { Input } from '../../../components/ui-elements/input';
import { Button } from '../../../components/ui-elements/button';
import styles from './upload-audio.module.scss';

export default function UploadUserModal({
  handleCloseModal,
  handleAddCategory,
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
      setCategorynameError('name can not be empty!');
      console.error('name can not be empty!');
      return;
    }
    if (!categoryNameError) {
      await handleAddCategory(categoryName);
      handleCloseModal();
    }
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <Input
        value={categoryName}
        id="categoryName"
        placeholder="type new category name"
        label="category name"
        onChange={hanleFileNameChange}
        error={categoryNameError}
      />
      <Button htmlType="submit" disabled={!categoryName}>
        Submit
      </Button>
    </form>
  );
}
