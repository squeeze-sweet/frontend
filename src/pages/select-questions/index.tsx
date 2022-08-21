import { useNavigate } from 'react-router-dom';
import LayoutPage from '../../components/templates/form-page';
import { useStore } from '../../store';
import { Checkbox } from '../../components/ui-elements/checkbox';
import styles from './filenames-setting.module.scss';
import { Button } from '../../components/ui-elements/button';
import { useEffect } from 'react';

const questions = [
  {
    heading: 'Introduce yourself',
    description: 'tell your name and your current title',
  },
  {
    heading: 'How did you get your last promotion?',
    description: "Briefly tell about the process and you'r enforsements",
  },
  {
    heading: 'Your favourite movie',
    description: 'And why is it so good?',
  },
  {
    heading: 'Your spare time hobby',
    description: 'Or may be want to spare in perspective',
  },
  {
    heading: 'Your fav. spot to eat',
    description: 'And fav. meal',
  },
];

export default function SelectQuestions() {
  let navigate = useNavigate();
  const filenames = useStore(state => state.filenames);
  const setFilenames = useStore(state => state.setFilenames);
  const initStepsData = useStore(state => state.initStepsData);

  useEffect(() => {
    initStepsData(questions);
  }, []);

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFilenames(
      questions
        .filter((_, index: number) => e.target[String(index)].checked)
        .map(({ heading }: any, index: number) => heading),
    );
    navigate('../upload-and-edit');
  };

  return (
    <form onSubmit={handleSubmit} className={styles['page-container']}>
      <div className={styles['header-container']}>
        <div className={styles.text}>
          <h1>Select the questions</h1>
          <p className={styles.description}>
            answer them in videos in next step. ideal length is 10-20 sec per question.
          </p>
          <div className={styles.button}>
            <Button htmlType='submit'>Next</Button>
          </div>
        </div>
      </div>

      <div className={styles['content-container']}>
        <div className={styles.checkboxes}>
          {questions.map(({ heading }: any, index) => (
            <Checkbox
              id={String(index)}
              label={`${heading}`}
              isDefaultChecked={
                index === 0 || filenames.find((filename: string) => filename === heading)
              }
              isDisabled={index === 0}
              key={index}
            />
          ))}
        </div>
      </div>
    </form>
  );
}
