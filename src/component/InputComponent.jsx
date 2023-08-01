import { useState } from "react";
import "katex/dist/katex.min.css";
import Latex from "react-latex-next";
import { supabase } from "../supabase";

export function InputComponent({
  quiz,
  handleAnswerSubmission,
  flagged,
  handleFlagUpdate,
  nextActiveTab,
}) {
  const [inputValue, setInputValue] = useState("");
  return (
    <>
      <li className="list-none">
        {quiz.isLatex ? (
          <Latex>{quiz.questionTitle}</Latex>
        ) : (
          <strong>{quiz.questionTitle}</strong>
        )}
        <p>Attempts: {quiz.attempts}</p>
        <input
          type="text"
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />
      </li>
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
