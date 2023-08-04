import { BookmarkIcon } from "./Icons/BookmarkIcon";
import { DefaultCircleIcon } from "./Icons/DefaultCircleIcon";
import { ProgressCircleIcon } from "./Icons/ProgressCircleIcon";
import { RightCheckIcon } from "./Icons/RightCheckIcon";
import { WrongCheckIcon } from "./Icons/WrongCheckIcon";

export function QuestionTab({ quizzes, handleActiveTab, activeTab }) {
  return (
    <aside className="gap-4 w-[400px] border-2 border-gray-200 h-[100vh] p-4">
      <h1 className="font-bold text-lg">Assignment Title Here</h1>
      <div className="flex justify-between items-center">
        <p className="text-[#475467] font-[600] text-xs">Questions:</p>
        <p className="text-[#475467] font-[600] text-xs bg-gray-200 px-1 py-1 rounded-md">
          {quizzes.length} questions
        </p>
      </div>
      <div className="grid grid-cols-3 gap-2 mt-4">
        {quizzes?.map((quiz, index) => {
          return (
            <button
              onClick={() => {
                handleActiveTab(quiz.id);
              }}
              className={`relative text-base font-semibold text-[#03080E] w-[117px] rounded-md h-[40px] round flex justify-center items-center border-2  border-gray-200 ${
                activeTab === quiz.id &&
                `border-2 border-primary-blue bg-[#F2F2FF] transition-[background,border] duration-[0.3s]`
              }`}
              key={quiz.id}
            >
              {quiz.isAttempted && !quiz.isCorrectlyGuessed && (
                <WrongCheckIcon className="absolute left-2" />
              )}
              {!quiz.isAttempted && quiz.flagged && (
                <BookmarkIcon className="absolute right-0" />
              )}
              {quiz.isCorrectlyGuessed && (
                <RightCheckIcon className="absolute left-1" />
              )}
              {!quiz.isAttempted && activeTab !== quiz.id ? (
                <DefaultCircleIcon className="absolute left-1" />
              ) : null}
              {activeTab === quiz.id && !quiz.isAttempted && (
                <ProgressCircleIcon className="absolute left-1" />
              )}
              <span className="absolute left-12">{index + 1}</span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
