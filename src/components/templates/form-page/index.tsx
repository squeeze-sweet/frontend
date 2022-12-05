import { FormEvent, ReactElement } from 'react';
import cn from 'classnames';
import { Button } from '../../../components/ui-elements/button';
import styles from './page.module.scss';

type Props = {
  onSubmit: (e: React.ChangeEvent<HTMLFormElement>) => void;
  heading?: string;
  buttonText: string;
  className?: string;
  children: any;
};

export default function FormPage({ onSubmit, heading, buttonText, className, children }: Props) {
  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <form onSubmit={handleSubmit} className={cn(styles.container)}>
      {heading && <h1>{heading}</h1>}
      {children}
      <Button htmlType='submit'>{buttonText}</Button>
    </form>
  );
}
