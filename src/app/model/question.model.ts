export interface Question {
  id: string;
  questionText: string;
  answerChoices: AnswerChoices[];
  explanation: string;
}

export interface AnswerChoices {
  id: string;
  answerText: string;
  correct?: boolean;
}
