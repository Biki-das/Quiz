import "katex/dist/katex.min.css";
import Latex from "react-latex-next";
import { useState } from "react";

export function Option({ quiz, getSubmittedAnswer }) {
  const [selectedOption, setSelectedOption] = useState("");
  return (
    <div className="mt-4">
      {quiz.option.map((option, index) => {
        return (
          <div key={index} className="flex gap-4 items-center ">
            <input
              type="radio"
              name="quiz-options"
              value={option}
              className={`
              mt-4
              ${
                quiz.isAttempted || quiz.flagged
                  ? `cursor-not-allowed`
                  : `cursor-pointer`
              }`}
              onChange={(e) => {
                setSelectedOption(e.target.value);
                getSubmittedAnswer(e.target.value);
              }}
              checked={option === selectedOption}
              disabled={quiz.isAttempted || quiz.flagged}
            />
            {quiz.isLatex ? (
              <label className="mt-4">
                <Latex>{option}</Latex>
              </label>
            ) : (
              <label className="mt-4">
                <Latex>{option}</Latex>
              </label>
            )}
          </div>
        );
      })}
    </div>
  );
}
