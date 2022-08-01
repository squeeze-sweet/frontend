import { useNavigate } from 'react-router-dom';
import LayoutPage from '../../components/templates/form-page';
import { useStore } from '../../store';
import { Checkbox } from '../../components/ui-elements/checkbox';
import styles from './filenames-setting.module.scss';

const questions = [
  'Introduce yourself',
  'Your favourite meal',
  'Your favourite movie',
  'Your fav. spot to eat',
  'Your spare time hobby',
];

export default function SelectQuestions() {
  let navigate = useNavigate();
  const filenames = useStore(state => state.filenames);
  const setFilenames = useStore(state => state.setFilenames);

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    setFilenames(
      questions
        .filter((_, index: number) => e.target[String(index)].checked)
        .map((question: string, index: number) => question),
    );

    navigate('../upload-and-edit');
  };

  return (
    <section className={styles['page-container']}>
      <div className={styles['header-container']}>
        <div className={styles.text}>
          <h1>Select the questions</h1>
          <p className={styles.description}>
            answer them in videos in next step. ideal length is 10-20 sec per question.
          </p>
        </div>
      </div>
      <div className={styles['content-container']}>
        <LayoutPage buttonText='Submit' onSubmit={handleSubmit} className={styles.layout}>
          <div className={styles.checkboxes}>
            {questions.map((question, index) => (
              <Checkbox
                id={String(index)}
                label={`${question}`}
                isDefaultChecked={
                  index === 0 || filenames.find((filename: string) => filename === question)
                }
                isDisabled={index === 0}
                key={index}
              />
            ))}
          </div>
        </LayoutPage>
      </div>
    </section>
  );
}
