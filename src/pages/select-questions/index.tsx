import { useNavigate } from "react-router-dom";
import useLang from "../../hooks/useLang";
import { useStore } from "../../store";
import { Checkbox } from "../../components/ui-elements/checkbox";
import styles from "./filenames-setting.module.scss";
import { Button } from "../../components/ui-elements/button";
import { useEffect } from "react";
import _ from "lodash";

export default function SelectQuestions() {
  const { tr, lang } = useLang();
  let navigate = useNavigate();
  const filenames = useStore((state) => state.filenames);
  const setFilenames = useStore((state) => state.setFilenames);
  const initStepsData = useStore((state) => state.initStepsData);
  const questionsAndCategories = useStore(
    (state) => state.questionsAndCategories
  );

  useEffect(() => {
    const data: string[] = [];
    questionsAndCategories?.forEach((category) =>
      category?.questions?.map((question) => {
        if (lang === "en")
          if (question?.text) {
            data.push(question?.text);
          }
        if (lang === "fr")
          if (question?.text_fr) {
            data.push(question?.text_fr);
          }
      })
    );

    if (lang === "fr") {
      setFilenames([questionsAndCategories[0].questions[0].text_fr]);
    } else {
      setFilenames([questionsAndCategories[0].questions[0].text]);
    }

    initStepsData(data);
  }, []);

  useEffect(() => {
    if (!filenames?.length && questionsAndCategories) {
      if (lang === "fr") {
        setFilenames([questionsAndCategories[0].questions[0].text_fr]);
      } else {
        setFilenames([questionsAndCategories[0].questions[0].text]);
      }
    }
  }, []);

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate("../upload-and-edit");
  };

  const handleChange = (text: string) => {
    if (filenames.find((filename) => filename === text)) {
      setFilenames(_.remove(filenames, (filename) => filename !== text));
    } else {
      setFilenames([...filenames, text]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles["page-container"]}>
      <div className={styles["header-container"]}>
        <div className={styles.text}>
          <h1>{tr("Select questions")}</h1>
          <p className={styles.description}>
            {tr("to answer them, we recommend about 10-20 sec per question.")}
          </p>
          <div className={styles.button}>
            <Button htmlType="submit">{tr("Next")}</Button>
          </div>
        </div>
      </div>

      <div className={styles["content-container"]}>
        <div className={styles.checkboxes}>
          {questionsAndCategories?.map((category, categoryIndex) => (
            <>
              <p>{lang === "en" ? category.name : category.name_fr}</p>
              {category?.questions?.map((question, questionIndex) => {
                const text = lang === "fr" ? question.text_fr : question.text;
                return (
                  <Checkbox
                    id={`${categoryIndex}${questionIndex}`}
                    name={`${categoryIndex}${questionIndex}`}
                    label={`${text}`}
                    isDefaultChecked={
                      (categoryIndex === 0 && questionIndex === 0) ||
                      filenames.find((filename: string) => filename === text)
                    }
                    isDisabled={categoryIndex === 0 && questionIndex === 0}
                    key={`${categoryIndex}${questionIndex}`}
                    onChange={() => handleChange(text)}
                  />
                );
              })}
            </>
          ))}
        </div>
      </div>
    </form>
  );
}
