import { useNavigate } from "react-router-dom";
import useLang from "../../hooks/useLang";
import { useStore } from "../../store";
import { Checkbox } from "../../components/ui-elements/checkbox";
import styles from "./filenames-setting.module.scss";
import { Button } from "../../components/ui-elements/button";
import { useEffect } from "react";
import _ from "lodash";

export default function SelectQuestions() {
  const { tr } = useLang();
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
        if (question?.text) {
          data.push(question?.text);
        }
      })
    );
    initStepsData(data);
  }, []);

  useEffect(() => {
    if (!filenames?.length && questionsAndCategories) {
      setFilenames([questionsAndCategories[0].questions[0].text]);
    }
  }, [filenames, questionsAndCategories]);

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

  console.log("questionsAndCategories", questionsAndCategories);

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
              <p>{category.name}</p>
              {category?.questions?.map(({ text }, questionIndex) => (
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
              ))}
            </>
          ))}
        </div>
      </div>
    </form>
  );
}
