import { ReactElement } from 'react';
import cn from 'classnames';
import styles from './page.module.scss';

type Props = {
  heading?: string;
  className?: string;
  children: ReactElement;
};

export default function FormPage({ heading, className, children }: Props) {
  return (
    <section className={cn(styles.container + className)}>
      {heading && <h1>{heading}</h1>}
      {children}
    </section>
  );
}
