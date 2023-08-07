import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Bookmark } from "react-feather";
import { Loader } from "./Icons/Loader";
import "katex/dist/katex.min.css";
import Latex from "react-latex-next";

export function ArrangeBasedQuiz({
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
  const [items, setItems] = useState(() => {
    return quiz.option;
  });
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedItems = Array.from(items);
    const [removed] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, removed);
    setItems(reorderedItems);
  };
  return (
    <div
      className={`w-[90%] lg:w-[940px] relative bg-white h-[480px] lg:h-[360px] shadow-lg rounded-lg mt-20 p-4 ${
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

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="numberList">
          {(provided) => (
            <ul ref={provided.innerRef} {...provided.droppableProps}>
              {items.map((item, index) => (
                <Draggable
                  key={item}
                  draggableId={item.toString()}
                  index={index}
                  isDragDisabled={flagged || quiz.isAttempted}
                >
                  {(provided) => (
                    <li
                      className="border-2 1px solid gray mt-2 w-[50%] text-center text-lg"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      {item}
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>

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
                JSON.stringify(items),
                setIsModalVisible,
                setModalMessage,
                soundRef,
                value,
              );
            }}
          >
            {loading ? <Loader /> : "check"}
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
