import { ChangeEvent, useState, useEffect } from "react";
import { useStore } from "../../store";
import { Input } from "../../components/ui-elements/input";
import { validateEmail } from "./helpers";
import LayoutPage from "../../components/templates/form-page";
import useLang from "../../hooks/useLang";
import styles from "./emale-chosing.module.scss";
import api from "../../services/api/admin";

export default function EmaleChosing({ onSubmit }: any) {
  const { tr } = useLang();

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const setQuestionsAndCategories = useStore(
    (state) => state.setQuestionsAndCategories
  );
  const setPreloaderText = useStore((state) => state.setPreloaderText);
  const { email, setEmail, password, setPassword } = useStore(
    ({ email, setEmail, password, setPassword }) => ({
      email,
      setEmail,
      password,
      setPassword,
    })
  );

  const getCategories = async (email: string, password: string) => {
    try {
      setPreloaderText("authorizing");
      const { data } = await api.getQuestions(email, password);
      setQuestionsAndCategories(data);
      setPreloaderText("");
      onSubmit();
    } catch (error) {
      setPreloaderText("");
      setEmailError("failed to authorize user");
    }
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");
    let isError = false;
    if (!validateEmail(email)) {
      setEmailError("e-mail is incorrect, please type another");
      isError = true;
    }
    if (password.length < 3) {
      setPasswordError("please type minimum 4 symbols");
      isError = true;
    }
    if (isError) return;
    getCategories(email, password);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setEmail(e.target.value);
    if (emailError && validateEmail(email)) {
      setEmailError("");
    }
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    setPassword(e.target.value);
    if (passwordError && !(password.length < 4)) {
      setPasswordError("");
    }
  };

  return (
    <LayoutPage onSubmit={handleSubmit} buttonText={tr("Next")}>
      <Input
        value={email}
        id="email"
        placeholder={tr("type your e-mail")}
        label="email"
        onChange={handleEmailChange}
        error={emailError}
      />
      <Input
        value={password}
        id="password"
        placeholder={tr("type your password")}
        label="password"
        onChange={handlePasswordChange}
        error={passwordError}
      />
      {errorMsg && <p className={styles.error}>{errorMsg}</p>}
    </LayoutPage>
  );
}
