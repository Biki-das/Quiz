import "katex/dist/katex.min.css";
import Latex from "react-latex-next";
import { useState } from "react";

export function Option({ quiz, getSubmittedAnswer }) {
  console.log(quiz);
  const [selectedOption, setSelectedOption] = useState("");
  return quiz.isLatex ? (
    <div>
      {quiz.option.map((option, index) => {
        return (
          <div key={index} className="flex gap-4 items-center ">
            <input
              type="radio"
              name="quiz-options"
              value={option}
              className={
                quiz.isAttempted || quiz.flagged
                  ? `cursor-not-allowed`
                  : `cursor-pointer`
              }
              onChange={(e) => {
                setSelectedOption(e.target.value);
                getSubmittedAnswer(e.target.value);
              }}
              checked={option === selectedOption}
              disabled={quiz.isAttempted}
            />
            <label>
              <Latex>{option}</Latex>
            </label>
          </div>
        );
      })}
    </div>
  ) : (
    <div>
      <>
        {quiz.option.map((option, index) => {
          return (
            <div
              key={index}
              className={`flex gap-4 items-center 
                }`}
            >
              <input
                type="radio"
                name="quiz-options"
                className={
                  quiz.isAttempted ? `cursor-not-allowed` : `cursor-pointer`
                }
                value={option}
                checked={option === selectedOption}
                onChange={(e) => {
                  setSelectedOption(e.target.value);
                  getSubmittedAnswer(e.target.value);
                }}
                disabled={quiz.isAttempted}
              />
              <label>{option}</label>
            </div>
          );
        })}
      </>
    </div>
  );
}
