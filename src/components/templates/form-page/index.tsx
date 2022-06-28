import { FormEvent, ReactElement } from 'react';
import { Button } from '../../../components/ui-elements/button';
import styles from './page.module.scss';

type Props = {
  handleSubmit: (e: FormEvent) => void;
  heading: string;
  buttonText: string;
  children: ReactElement;
};

export default function FormPage({ handleSubmit, heading, buttonText, children }: Props) {
  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <h1>{heading}</h1>
      {children}
      <Button htmlType='submit'>{buttonText}</Button>
    </form>
  );
}
