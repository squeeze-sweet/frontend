export type QuestionsAndCategories = {
  id: string;
  name: string;
  name_fr: string;
  questions: {
    id: string;
    text: string;
    text_fr: string;
  }[];
}[];
