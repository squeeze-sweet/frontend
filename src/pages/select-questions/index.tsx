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
    <LayoutPage onSubmit={handleSubmit} heading='Select 2 questions' buttonText='Continue'>
      <div className={styles.checkboxes}>
        {questions.map((question, index) => (
          <Checkbox
            id={String(index)}
            label={`${index}. ${question}`}
            isDefaultChecked={
              index === 0 || filenames.find((filename: string) => filename === question)
            }
            isDisabled={index === 0}
            key={index}
          />
        ))}
      </div>
    </LayoutPage>
  );
}
