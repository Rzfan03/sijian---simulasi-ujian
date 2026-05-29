import type { ExamSession, ExamResult } from "@/types";

const SESSIONS_KEY = "sijian_sessions";
const RESULTS_KEY = "sijian_results";

export function saveSession(session: ExamSession): void {
  const sessions = getSessions();
  sessions[session.id] = session;
  localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions));
}

export function getSession(id: string): ExamSession | null {
  const sessions = getSessions();
  return sessions[id] ?? null;
}

export function getSessions(): Record<string, ExamSession> {
  try {
    return JSON.parse(localStorage.getItem(SESSIONS_KEY) ?? "{}");
  } catch {
    return {};
  }
}

export function saveResult(result: ExamResult): void {
  const results = getResults();
  results[result.sessionId] = result;
  localStorage.setItem(RESULTS_KEY, JSON.stringify(results));
}

export function getResult(sessionId: string): ExamResult | null {
  const results = getResults();
  return results[sessionId] ?? null;
}

export function getResults(): Record<string, ExamResult> {
  try {
    return JSON.parse(localStorage.getItem(RESULTS_KEY) ?? "{}");
  } catch {
    return {};
  }
}
