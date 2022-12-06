import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';
import styles from './audio-controlls.module.scss';
import deleteIcon from '../../../assets/icons/delete.svg';
import api from '../../../services/api/admin';
import { Button } from '../../../components/ui-elements/button';
const steps = ['users', 'questions', 'audios', 'video backgrounds'];
import crossIcon from '../../../assets/icons/cross-white.svg';
import UploadAudio from '../upload-audio-controls';
import Modal from '../../../components/ui-elements/modal/modal';
import Input from 'antd/lib/input/Input';
import UploadUserModal from '../upload-user-controls';
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

  const [isUploadActive, setIsAploadActive] = useState(false);

  const handleOpenModal = () => {
    setIsAploadActive(true);
  };

  const handleCloseModal = () => {
    setIsAploadActive(false);
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

  const handleAdd = async (name: string) => {
    try {
      /*       await audioApi.addWhiteListUser(name, email, password); */
    } catch (error) {
      console.error(error);
    }
    getQuestions();
  };

  return (
    <section className={styles.audios}>
      <Button onClick={handleOpenModal} className={styles.button}>
        <div className={styles.adderContent}>
          <p>add category</p>
          <img src={crossIcon} className={styles.cross}></img>
        </div>
      </Button>
      {questions?.map(({ name, id, questions }: any) => (
        <AudioPlayer
          id={id}
          name={name}
          questions={questions}
          handleDelete={handleDelete}
          handleDeleteQuestion={handleDeleteQuestion}
        />
      ))}
      {isUploadActive && (
        <Modal
          handleModalClose={() => {
            setIsAploadActive(false);
          }}
        >
          <UploadUserModal handleCloseModal={handleCloseModal} handleAddUser={handleAdd} />
        </Modal>
      )}
    </section>
  );
}

function AudioPlayer({
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
        <img src={deleteIcon} className={styles.deleteIcon} onClick={onDelete} />
      </section>
      {questions?.map(({ text, id }: any) => (
        <>
          <div className={styles.children}>
            <Button onClick={() => {}} className={styles.button}>
              <div className={styles.adderContent}>
                <p>add question</p>
                <img src={crossIcon} className={styles.cross}></img>
              </div>
            </Button>
          </div>

          <div className={styles.children}>
            <AudioPlayer
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
