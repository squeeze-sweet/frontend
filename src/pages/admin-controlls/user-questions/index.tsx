import { useEffect, useState } from 'react';
import styles from './audio-controlls.module.scss';
import deleteIcon from '../../../assets/icons/delete.svg';
import api from '../../../services/api/admin';
import { Button } from '../../../components/ui-elements/button';
import crossIcon from '../../../assets/icons/cross-white.svg';
import Modal from '../../../components/ui-elements/modal/modal';
import UploadCategoryModal from '../upload-category-controls';
import audioApi from '../../../services/api/admin';
import { useStore } from '../../../store';

export default function UserQuestions() {
  const [questions, setQuestions] = useState<any>([]);
  const { email, password } = useStore(({ email, password }) => ({
    email,
    password,
  }));

  useEffect(() => {
    getQuestions();
  }, []);

  const getQuestions = async () => {
    try {
      const { data } = await api.getQuestions(email, password);
      setQuestions(data);
    } catch (error) {}
  };

  const [isCategoryUploadActive, setIsCategoryUploadActive] = useState(false);
  const [questionUploadActiveState, setQuestionUploadActiveState] =
    useState(null);

  const handleOpenCategoryModal = () => {
    setIsCategoryUploadActive(true);
  };

  const handleCloseCategoryModal = () => {
    setIsCategoryUploadActive(false);
  };

  const handleOpenQuestionModal = (parentId) => {
    setQuestionUploadActiveState(parentId);
  };

  const handleCloseQuestionModal = () => {
    setQuestionUploadActiveState(null);
  };

  const handleDelete = async (id: string) => {
    try {
      await api.deleteCategory(id, email, password);
    } catch (error) {
      console.error(error);
    }
    getQuestions();
  };

  const handleDeleteQuestion = async (id: string) => {
    try {
      await api.deleteQuestion(id, email, password);
    } catch (error) {
      console.error(error);
    }
    getQuestions();
  };

  const handleAddCategory = async (name: string) => {
    try {
      await audioApi.addCategory(name, email, password);
    } catch (error) {
      console.error(error);
    }
    getQuestions();
  };

  const handleAddQuestion = async (name: string, parentId: string) => {
    try {
      await audioApi.addQuestion(parentId, name, email, password);
    } catch (error) {
      console.error(error);
    }
    getQuestions();
  };

  return (
    <section className={styles.audios}>
      <Button onClick={handleOpenCategoryModal} className={styles.button}>
        <div className={styles.adderContent}>
          <p>add category</p>
          <img src={crossIcon} className={styles.cross}></img>
        </div>
      </Button>
      {questions?.map(({ name, id, questions }: any) => (
        <Category
          handleOpenQuestionModal={handleOpenQuestionModal}
          email={email}
          password={password}
          getQuestions={getQuestions}
          categoryId={id}
          name={name}
          questions={questions}
          handleDelete={handleDelete}
          handleDeleteQuestion={handleDeleteQuestion}
        />
      ))}
      {isCategoryUploadActive && (
        <Modal
          handleModalClose={() => {
            setIsCategoryUploadActive(false);
          }}
        >
          <UploadCategoryModal
            type="category"
            handleCloseModal={handleCloseCategoryModal}
            handleAddCategory={handleAddCategory}
          />
        </Modal>
      )}
      {questionUploadActiveState && (
        <Modal
          handleModalClose={() => {
            setQuestionUploadActiveState(null);
          }}
        >
          <UploadCategoryModal
            type="question"
            handleCloseModal={handleCloseQuestionModal}
            handleAddCategory={handleAddQuestion}
            parentId={questionUploadActiveState}
          />
        </Modal>
      )}
    </section>
  );
}

function Category({
  handleOpenQuestionModal,
  email,
  password,
  getQuestions,
  categoryId,
  name,
  questions,
  handleDelete,
  handleDeleteQuestion,
  isCategory = true,
}: any) {
  const onCategoryDelete = async () => {
    handleDelete(categoryId);
  };
  return (
    <>
      <section className={styles.audioPlayer}>
        <div className={styles.leftGroup}>
          {isCategory && 'Category:'} {name}
        </div>
        <img
          src={deleteIcon}
          className={styles.deleteIcon}
          onClick={onCategoryDelete}
        />
      </section>
      <div className={styles.children}>
        <Button
          onClick={() => {
            handleOpenQuestionModal(categoryId);
          }}
          className={styles.button}
        >
          <div className={styles.adderContent}>
            <p>add question</p>
            <img src={crossIcon} className={styles.cross}></img>
          </div>
        </Button>
      </div>
      {questions?.map(({ text, id }: any) => (
        <>
          <div className={styles.children}>
            <Question
              email={email}
              password={password}
              getQuestions={getQuestions}
              categoryId={categoryId}
              id={id}
              name={text}
              handleDelete={handleDeleteQuestion}
              isCategory={false}
            />
          </div>
        </>
      ))}
    </>
  );
}

function Question({
  id,
  name,
  questions,
  handleDelete,
  handleDeleteQuestion,
  isCategory = true,
}: any) {
  const onDelete = async () => {
    handleDelete(id);
  };

  return (
    <>
      <section className={styles.audioPlayer}>
        <div className={styles.leftGroup}>
          {isCategory && 'Category:'} {name}
        </div>
        <img
          src={deleteIcon}
          className={styles.deleteIcon}
          onClick={onDelete}
        />
      </section>
      {questions?.map(({ text, id }: any) => (
        <>
          <div className={styles.children}>
            <Category
              id={id}
              name={text}
              handleDelete={handleDeleteQuestion}
              isCategory={false}
            />
          </div>
        </>
      ))}
    </>
  );
}
