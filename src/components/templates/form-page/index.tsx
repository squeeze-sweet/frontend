import { FormEvent, ReactElement } from "react";
import cn from "classnames";
import { Button } from "../../../components/ui-elements/button";
import styles from "./page.module.scss";
import Preloader from "../../ui-elements/preloader";
import { useStore } from "../../../store";

type Props = {
  onSubmit: (e: React.ChangeEvent<HTMLFormElement>) => void;
  heading?: string;
  buttonText: string;
  className?: string;
  children: any;
};

export default function FormPage({
  onSubmit,
  heading,
  buttonText,
  className,
  children,
}: Props) {
  const preloaderText = useStore((state) => state.preloaderText);

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(e);
  };

  //TODO handle preloader better
  return (
    <form onSubmit={handleSubmit} className={cn(styles.container)}>
      {preloaderText && <div className={styles.preloader}>{<Preloader />}</div>}
      {!preloaderText && heading && <h1>{heading}</h1>}
      {!preloaderText && children}
      {!preloaderText && <Button htmlType="submit">{buttonText}</Button>}
    </form>
  );
}
