import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LayoutPage from '../../components/templates/form-page';
import { useStore } from '../../store';
import { Typography, Checkbox as AntCheckbox } from 'antd';
import { Checkbox } from '../../components/ui-elements/checkbox';
import styles from './filenames-setting.module.scss';

const questions = [
  'Introduce yourself',
  'Your favourite meal',
  'Your favourite movie',
  'Your fav. spot to eat',
  'Your spare time hobby',
];

export default function FilenamesSetting() {
  const [localFilenames, setLocalFilenames] = useState(['Your favourite meal']);
  let navigate = useNavigate();
  const setFilenames = useStore(state => state.setFilenames);

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    setFilenames(
      questions
        .filter((_, index: number) => e.target[String(index)].checked)
        .map((question: string, index: number) => `${index + 1}. ${question}`),
    );

    navigate('../step-1', { replace: true });
  };

  return (
    <LayoutPage onSubmit={handleSubmit} heading='Select 2 questions' buttonText='Continue'>
      <div className={styles.checkboxes}>
        {questions.map((question, index) => (
          <Checkbox
            id={String(index)}
            label={`${index}. ${question}`}
            isDefaultChecked={index === 0}
            isDisabled={index === 0}
            key={index}
          />
        ))}
      </div>
    </LayoutPage>
  );
}
