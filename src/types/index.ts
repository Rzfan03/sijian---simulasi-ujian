export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // index of correct option
  explanation?: string;
}

export interface ExamSession {
  id: string;
  title: string;
  questions: Question[];
  answers: Record<string, number>; // questionId -> selectedOption index
  startedAt: number;
  finishedAt?: number;
  timeLimit: number; // in seconds
}

export interface ExamResult {
  sessionId: string;
  score: number;
  total: number;
  percentage: number;
  timeTaken: number;
  answers: Record<string, number>;
  questions: Question[];
}
