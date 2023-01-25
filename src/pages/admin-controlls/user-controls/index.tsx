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
import { useStore } from '../../../store';

export default function UserControls() {
  const [users, setUsers] = useState<any>([]);
  const { email, password } = useStore(({ email, password }) => ({
    email,
    password,
  }));

  useEffect(() => {
    getWhiteList();
  }, []);

  const getWhiteList = async () => {
    try {
      const { data } = await audioApi.getWhiteList(email, password);
      setUsers(data);
    } catch (error) {}
  };

  const [isUploadActive, setIsUploadActive] = useState(false);

  const handleOpenModal = () => {
    setIsUploadActive(true);
  };

  const handleCloseModal = () => {
    setIsUploadActive(false);
  };

  const handleDelete = async (id: string) => {
    try {
      await audioApi.deleteWhiteListUser(id, email, password);
    } catch (error) {
      console.error(error);
    }
    getWhiteList();
  };

  const handleAdd = async (name: string) => {
    try {
      await audioApi.addWhiteListUser(name, email, password);
    } catch (error) {
      console.error(error);
    }
    getWhiteList();
  };

  return (
    <section className={styles.audios}>
      <Button onClick={handleOpenModal} className={styles.button}>
        <div className={styles.adderContent}>
          <p>add user</p>
          <img src={crossIcon} className={styles.cross}></img>
        </div>
      </Button>
      {users?.map(({ email, id }: any) => (
        <AudioPlayer id={id} name={email} handleDelete={handleDelete} />
      ))}
      {isUploadActive && (
        <Modal
          handleModalClose={() => {
            setIsUploadActive(false);
          }}
        >
          <UploadUserModal
            handleCloseModal={handleCloseModal}
            handleAddUser={handleAdd}
          />
        </Modal>
      )}
    </section>
  );
}

function AudioPlayer({ id, name, handleDelete }: any) {
  const onDelete = async () => {
    handleDelete(id);
  };

  return (
    <section className={styles.audioPlayer}>
      <div className={styles.leftGroup}>{name}</div>
      <img src={deleteIcon} className={styles.deleteIcon} onClick={onDelete} />
    </section>
  );
}
