import { useNavigate } from 'react-router-dom';
import useLang from '../../hooks/useLang';
import { useStore } from '../../store';
import { Checkbox } from '../../components/ui-elements/checkbox';
import styles from './filenames-setting.module.scss';
import { Button } from '../../components/ui-elements/button';
import { useEffect } from 'react';

//category: personal
const questions = [
  {
    heading: 'Introduce yourself',
    description: '',
  },
  {
    heading: 'Your top 3 places where you like to eat?',
    description: '',
  },
  {
    heading: 'How many countries have you visited and which are you favourites?',
    description: '',
  },
  {
    heading: "Your top 3 books that you'd recommend everyone?",
    description: '',
  },
  {
    heading: 'Tell where you are from and how long have you been living there?',
    description: '',
  },
  {
    heading: 'Where do you get your inspiration from?',
    description: '',
  },
  {
    heading: 'Do you like peaceful hobbies or energetic ones?',
    description: '',
  },
  {
    heading: 'What are your top 3 hobbies now?',
    description: '',
  },
  {
    heading: "What's the hobby that grew into a job/project?",
    description: '',
  },
  {
    heading: 'Do you like team activities or solo ones?',
    description: '',
  },
  {
    heading: 'What hobbies from your childhood made affected your life now?',
    description: '',
  },
  {
    heading: 'What are the top 3 things you value at work?',
    description: '',
  },
  {
    heading: 'What things you value in your teammates?',
    description: '',
  },
  {
    heading: "What's the most proud moment in your career?",
    description: '',
  },
  {
    heading: 'What helped you to grow to the point where you are now?',
    description: '',
  },
  {
    heading: 'What advice would you give everyone who starts a job in your department?',
    description: '',
  },
  {
    heading: 'What books or people have influenced you?',
    description: '',
  },
];

export default function SelectQuestions() {
  const { tr } = useLang();
  let navigate = useNavigate();
  const filenames = useStore(state => state.filenames);
  const setFilenames = useStore(state => state.setFilenames);
  const initStepsData = useStore(state => state.initStepsData);
  const questionsAndCategories = useStore(state => state.questionsAndCategories);

  useEffect(() => {
    initStepsData(questions);
  }, []);

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    setFilenames(
      questions
        .filter((_, index: number) => e.target[String(index + 1)].checked)
        .map(({ heading }: any, index: number) => heading),
    );
    navigate('../upload-and-edit');
  };

  return (
    <form onSubmit={handleSubmit} className={styles['page-container']}>
      <div className={styles['header-container']}>
        <div className={styles.text}>
          <h1>{tr('Select questions')}</h1>
          <p className={styles.description}>
            {tr('to answer them, we recommend about 10-20 sec per question.')}
          </p>
          <div className={styles.button}>
            <Button htmlType='submit'>{tr('Next')}</Button>
          </div>
        </div>
      </div>

      <div className={styles['content-container']}>
        <div className={styles.checkboxes}>
          {questionsAndCategories?.map(category => (
            <>
              <p>{category.name}</p>
              {category.questions.map(
                ({ text }, index) =>
                  index >= 1 &&
                  index < 5 && (
                    <Checkbox
                      id={`1${String(index)}`}
                      name={'1'}
                      label={`${text}`}
                      isDefaultChecked={filenames.find((filename: string) => filename === text)}
                      isDisabled={index === 0}
                      key={index}
                    />
                  ),
              )}
            </>
          ))}
        </div>
      </div>
    </form>
  );
}
