import { useStore } from '../../store';
import { Typography, Input, Button, Checkbox } from 'antd';
const { Title } = Typography;
import styles from './filenames-setting.module.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function FilenamesSetting() {
  const [localFilenames, setLocalFilenames] = useState(['Your favourite meal']);
  let navigate = useNavigate();
  const setFilenames = useStore(state => state.setFilenames);

  const handleCheck = (e: any) => {
    if (localFilenames.includes(e.target.value)) {
      setLocalFilenames(localFilenames.filter(filename => filename !== e.target.value));
    } else {
      setLocalFilenames([...localFilenames, e.target.value]);
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setFilenames(localFilenames);
    navigate('../step-1', { replace: true });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <Typography>
        <Title>Select questions which you will discribe!</Title>
      </Typography>

      <div className={styles.checkboxes}>
        <Checkbox checked={true} disabled value='Your favourite meal'>
          Your favourite meal
        </Checkbox>
        <br />
        <Checkbox onChange={handleCheck} value='Your favourite movie'>
          Your favourite movie
        </Checkbox>
        <br />
        <Checkbox onChange={handleCheck} value='Your fav. spot to eat'>
          Your fav. spot to eat
        </Checkbox>
        <br />
        <Checkbox onChange={handleCheck} value='Your spare time hobby'>
          Your spare time hobby
        </Checkbox>
        <br />
      </div>
      <div>
        <Button htmlType='submit' type='primary' size='large'>
          Далее
        </Button>
      </div>
    </form>
  );
}
