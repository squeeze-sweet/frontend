import { useStore } from '../../store';
import { Typography, Input, Button } from 'antd';
const { Title } = Typography;
import styles from './emale-chosing.module.scss';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function EmaleChosing() {
  const [localEmail, setLocalEmail] = useState('');
  let navigate = useNavigate();
  const setEmail = useStore(state => state.setEmail);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log('handleSubmit', localEmail);
    navigate('/step-1');
  };

  const handleEmailChange = (e: any) => {
    console.log(e.target.value);
    setLocalEmail(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <Typography>
        <Title>Welcome!</Title>
      </Typography>

      <Input
        placeholder='Please type your e-mail!'
        onChange={handleEmailChange}
        className={styles.input}
      />
      <Button htmlType='submit' type='primary' size='large'>
        Далее
      </Button>
    </form>
  );
}
