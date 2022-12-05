export type QuestionsAndCategories = {
  id: string;
  name: string;
  questions: {
    id: string;
    text: string;
  }[];
}[];
