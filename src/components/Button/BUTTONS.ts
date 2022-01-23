import {
    PREV_QUESTION,
    NEXT_QUESTION,
    START_NEW_QUIZ,
    FINISH_QUIZ,
    SHOW_ANSWERS,
    ABORT_QUIZ
  } from "../../utils";

export const BUTTONS = {
    [PREV_QUESTION]: {
      className: "btn_std",
      title: "Previous"
    },
    [NEXT_QUESTION]: {
      className: "btn_std",
      title: "Next"
    },
    [FINISH_QUIZ]: {
      className: "btn_finish",
      title: "Finish"
    },
    [START_NEW_QUIZ]: {
      className: "btn_std",
      title: "Start new quiz"
    },
    [SHOW_ANSWERS]: {
      className: "btn_show-answers",
      title: "Show answers"
    },
    [ABORT_QUIZ]: {
      className: "btn_abort",
      title: "Abort quiz"
    }
  }