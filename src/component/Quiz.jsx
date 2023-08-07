import { useState, useEffect, useRef, Fragment } from "react";
import { InputBasedQuiz } from "./InputBasesQuiz";
import { ChoiceBasedQuiz } from "./ChoiceBasedQuiz";
import { ArrangeBasedQuiz } from "./ArrangeBasedQuiz";
import { QuizFooter } from "./QuizFooter";
import { Modal } from "./Modal";

export function Quiz({
  quizzes,
  activeTab,
  handleFlagUpdate,
  nextTab,
  nextActiveTab,
  handleAnswerSubmission,
  handleQuizReset,
  loading,
}) {
  const [isEnabled, setIsEnabled] = useState(() => {
    const savedEnabledState = localStorage.getItem("isEnabled");
    return savedEnabledState ? JSON.parse(savedEnabledState) : false;
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const soundRef = useRef();

  const handleModalClose = () => {
    setIsModalVisible(false);
    setModalMessage("");
  };

  useEffect(() => {
    if (isModalVisible) {
      const timer = setTimeout(() => {
        handleModalClose();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isModalVisible]);

  useEffect(() => {
    localStorage.setItem("isEnabled", JSON.stringify(isEnabled));
  }, [isEnabled]);

  return (
    <div className="flex-[2] bg-[#F7F5F1] flex justify-center relative h-[100vh]">
      {quizzes?.map((quiz, index) =>
        activeTab === quiz.id ? (
          <Fragment key={quiz.id}>
            {quiz.type === "choice-based" && (
              <ChoiceBasedQuiz
                quiz={quiz}
                handleAnswerSubmission={handleAnswerSubmission}
                flagged={quiz.flagged}
                handleFlagUpdate={handleFlagUpdate}
                nextTab={nextTab}
                loading={loading}
                nextActiveTab={nextActiveTab}
                index={index}
                isModalVisible={isModalVisible}
                setIsModalVisible={setIsModalVisible}
                setModalMessage={setModalMessage}
                soundRef={soundRef}
                value={isEnabled}
              />
            )}

            {quiz.type === "input-based" && (
              <InputBasedQuiz
                quiz={quiz}
                handleAnswerSubmission={handleAnswerSubmission}
                flagged={quiz.flagged}
                handleFlagUpdate={handleFlagUpdate}
                nextTab={nextTab}
                loading={loading}
                nextActiveTab={nextActiveTab}
                index={index}
                isModalVisible={isModalVisible}
                setIsModalVisible={setIsModalVisible}
                setModalMessage={setModalMessage}
                soundRef={soundRef}
                value={isEnabled}
              />
            )}

            {quiz.type === "arrange-based" && (
              <ArrangeBasedQuiz
                quiz={quiz}
                handleAnswerSubmission={handleAnswerSubmission}
                flagged={quiz.flagged}
                handleFlagUpdate={handleFlagUpdate}
                nextTab={nextTab}
                loading={loading}
                nextActiveTab={nextActiveTab}
                index={index}
                isModalVisible={isModalVisible}
                setIsModalVisible={setIsModalVisible}
                setModalMessage={setModalMessage}
                soundRef={soundRef}
                value={isEnabled}
              />
            )}
          </Fragment>
        ) : null,
      )}
      <QuizFooter
        isEnabled={isEnabled}
        setIsEnabled={setIsEnabled}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        modalMessage={modalMessage}
        ref={soundRef}
        handleQuizReset={handleQuizReset}
      />
      {isModalVisible && (
        <Modal
          setIsModalVisible={handleModalClose}
          modalMessage={modalMessage}
        />
      )}
    </div>
  );
}
