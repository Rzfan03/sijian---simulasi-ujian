export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface ExamSession {
  id: string;
  title: string;
  questions: Question[];
  answers: Record<string, number>;
  startedAt: number;
  finishedAt?: number;
  timeLimit: number;
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
