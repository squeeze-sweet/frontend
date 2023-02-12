import { ChangeEvent, FormEventHandler, useState } from "react";
import { Input } from "../../../components/ui-elements/input";
import { Button } from "../../../components/ui-elements/button";
import styles from "./upload-audio.module.scss";

export default function UploadUserModal({
  type,
  handleCloseModal,
  handleAddCategory,
  parentId,
}: any) {
  const [categoryName, setCategoryName] = useState("");
  const [categoryNameError, setCategoryNameError] = useState("");
  const [categoryNameFr, setCategoryNameFr] = useState("");
  const [categoryNameFrError, setCategoryNameFrError] = useState("");

  const hanleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (categoryNameError && e.target.value) {
      setCategoryNameError("");
    }
    setCategoryName(e.target.value);
  };
  const hanleNameFrChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (categoryNameError && e.target.value) {
      setCategoryNameFrError("");
    }
    setCategoryNameFr(e.target.value);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!(categoryName && categoryNameFr)) {
      if (!categoryName) {
        setCategoryNameError(`${type} can not be empty!`);
      }
      if (!categoryNameFr) {
        setCategoryNameFrError(`${type} can not be empty!`);
      }
      return;
    }
    if (!categoryNameError) {
      await handleAddCategory(categoryName, categoryNameFr, parentId);
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
        onChange={hanleNameChange}
        error={categoryNameError}
      />
      <Input
        value={categoryNameFr}
        id="categoryNameFr"
        placeholder={`type new ${type} name (French)`}
        label={`${type} name (French)`}
        onChange={hanleNameFrChange}
        error={categoryNameFrError}
      />
      <Button htmlType="submit" disabled={!(categoryName && categoryNameFr)}>
        Submit
      </Button>
    </form>
  );
}
