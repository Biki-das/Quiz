import { useState } from "react";
import { Option } from "./Option";

export function MCQComponent({
  quiz,
  handleAnswerSubmission,
  flagged,
  handleFlagUpdate,
  nextActiveTab,
}) {
  const [submittedAnswer, setSubmittedAnswer] = useState("");

  function getSubmittedAnswer(selectedAnswer) {
    setSubmittedAnswer(selectedAnswer);
  }

  return (
    <>
      <li className="list-none">
        <strong>{quiz.questionTitle}</strong>
        <p>Attempts: {quiz.attempts}</p>
        <Option quiz={quiz} getSubmittedAnswer={getSubmittedAnswer} />
      </li>
      {/* <button
        onClick={() => {
          handleAnswerSubmission(quiz.id, submittedAnswer);
        }}
      >
        Check
      </button> */}
      {quiz.isAttempted ||
        (quiz.flagged ? (
          <button
            onClick={() => {
              nextActiveTab(quiz.id);
            }}
          >
            Next
          </button>
        ) : (
          <button
            onClick={() => {
              handleAnswerSubmission(quiz.id, submittedAnswer);
            }}
          >
            Check
          </button>
        ))}

      <button
        onClick={() => {
          handleFlagUpdate(quiz.id);
        }}
        className="block"
      >
        {`${flagged ? "flagged" : "flag"}`}
      </button>
    </>
  );
}
