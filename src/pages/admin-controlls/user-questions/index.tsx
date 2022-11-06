import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';
import styles from './audio-controlls.module.scss';
import deleteIcon from '../../../assets/icons/delete.svg';
import audioApi from '../../../services/api/admin';
import { Button } from '../../../components/ui-elements/button';
const steps = ['users', 'questions', 'audios', 'video backgrounds'];
import crossIcon from '../../../assets/icons/cross-white.svg';
import UploadAudio from '../upload-audio-controls';
import Modal from '../../../components/ui-elements/modal/modal';
import Input from 'antd/lib/input/Input';
import UploadUserModal from '../upload-user-controls';

export default function UserQuestions() {
  const [questions, setQuestions] = useState<any>([]);
  useEffect(() => {
    getQuestions();
  }, []);

  const getQuestions = async () => {
    try {
      const { data } = await audioApi.getQuestions();
      console.log('data', data);
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
      await audioApi.deleteFile(id);
    } catch (error) {
      console.error();
    }
    getQuestions();
  };

  const handleAdd = async (name: string) => {
    try {
      await audioApi.addWhiteListUser(name);
    } catch (error) {
      console.error();
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
        <AudioPlayer id={id} name={name} questions={questions} handleDelete={handleDelete} />
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

function AudioPlayer({ id, name, questions, handleDelete, isCategory = true }: any) {
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
            <AudioPlayer id={id} name={text} handleDelete={handleDelete} isCategory={false} />
          </div>
        </>
      ))}
    </>
  );
}
