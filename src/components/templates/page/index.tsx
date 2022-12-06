import { ReactElement } from 'react';
import { Button } from '../../../components/ui-elements/button';
import styles from './page.module.scss';

type Props = {
  onSubmit: (e: React.ChangeEvent<HTMLFormElement>) => void;
  heading: string;
  buttonText: string;
  children: ReactElement;
};

export default function FormPage({ onSubmit, heading, buttonText, children }: Props) {
  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <h1>{heading}</h1>
      {children}
      <Button htmlType='submit'>{buttonText}</Button>
    </form>
  );
}
