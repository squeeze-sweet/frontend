import { useStore } from '../../store';
import { Typography, Input, Button, Checkbox } from 'antd';
const { Title } = Typography;
import styles from './filenames-setting.module.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function FilenamesSetting() {
  const [filenames, setFilenames] = useState(['Your favourite meal']);

  const handleCheck = (e: any) => {
    if (filenames.includes(e.target.value)) {
      setFilenames(filenames.filter(filename => filename !== e.target.value));
    } else {
      setFilenames([...filenames, e.target.value]);
    }
  };

  let navigate = useNavigate();
  //const setFileNames = useStore(state => state.setFileNames);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(filenames);
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
