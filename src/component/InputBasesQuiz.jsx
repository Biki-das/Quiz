import { useState } from "react";
import "katex/dist/katex.min.css";
import Latex from "react-latex-next";
import { Bookmark } from "react-feather";

export function InputBasedQuiz({
  quiz,
  handleAnswerSubmission,
  flagged,
  handleFlagUpdate,
  nextTab,
  index,
  isModalVisible,
  setIsModalVisible,
  setModalMessage,
  loading,
  soundRef,
  value,
}) {
  const [inputValue, setInputValue] = useState("");

  return (
    <div
      className={`w-[940px] relative bg-white h-[360px] shadow-lg rounded-lg mt-20 p-4 ${
        isModalVisible && `blur-sm`
      }`}
    >
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-2xl">Question {index + 1}</h2>
        <button
          onClick={() => {
            handleFlagUpdate(quiz.id);
          }}
          className="block"
        >
          {!quiz.isAttempted && (
            <span className="flex text-gray-500 text-sm items-center font-normal gap-2">
              {flagged ? (
                <>
                  <Bookmark size={24} strokeWidth={0} fill={"#F6B14D"} />
                  Unflag
                </>
              ) : (
                <>
                  <Bookmark />
                  Flag for later
                </>
              )}
            </span>
          )}
        </button>
      </div>
      {quiz.isLatex ? (
        <Latex>{quiz.questionTitle}</Latex>
      ) : (
        <p className="mt-2">{quiz.questionTitle}</p>
      )}
      <p className="font-normal text-[#03080E] mt-2">{quiz.question}</p>
      <p className="mt-2 text-gray-700 text-sm font-medium">Answer</p>
      <input
        type="text"
        className={`mt-4 w-[720px] h-[44px] rounded-lg border-1 border-gray-300  ${
          quiz.isAttempted || quiz.flagged
            ? `cursor-not-allowed`
            : `cursor-pointer`
        }`}
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
        disabled={quiz.isAttempted || quiz.flagged}
      />
      <div className="absolute bottom-4 right-4 flex flex-col items-center">
        {quiz.isAttempted || quiz.flagged ? (
          <button
            className="w-[160px] h-[44px] text-white bg-primary-blue rounded-lg"
            onClick={() => {
              nextTab(quiz.id);
            }}
          >
            Next
          </button>
        ) : (
          <button
            className="w-[160px] h-[44px] text-white bg-primary-blue rounded-lg"
            disabled={loading}
            onClick={() => {
              handleAnswerSubmission(
                quiz.id,
                inputValue,
                setIsModalVisible,
                setModalMessage,
                soundRef,
                value,
              );
            }}
          >
            Check
          </button>
        )}
        {!quiz.isAttempted && (
          <span className="mt-2 font-normal text-sm text-primary-blue">
            {quiz.attempts} attempts left
          </span>
        )}
      </div>
    </div>
  );
}
