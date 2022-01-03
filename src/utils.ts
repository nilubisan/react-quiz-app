export const shuffleArray = (arr: any[]) =>
  [...arr].sort(() => Math.random() - 0.5);

export const NEXT_QUESTION = "NEXT QUESTION";
export const FINISH_QUIZ = "FINISH GAME";
export const START_QUIZ = "START QUIZ";
export const SHOW_ANSWERS = "SHOW ANSWERS";

export const EASY = "easy";
export const MEDIUM = "medium";
export const HARD = "hard";
