export type QuestionsAndCategories = {
  id: string;
  name: string;
  questions: {
    id: string;
    text: string;
    text_fr: string;
  }[];
}[];
