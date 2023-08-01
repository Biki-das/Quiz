import { useState, useEffect } from "react";
import { QuestionTab } from "./component/QuestionTab";
import { MCQComponent } from "./component/MCQComponent";
import { InputComponent } from "./component/InputComponent";
import { supabase } from "./supabase";

export function App() {
  const [quizzes, setQuizzes] = useState([]);
  const [activeTab, setActiveTab] = useState(0);

  function handleActiveTab(quizId) {
    setActiveTab(quizId);
  }

  function nextActiveTab(quizId) {
    setActiveTab(quizId + 1);
  }

  async function handleAnswerSubmission(quizId, submittedAnswer) {
    const { data } = await supabase
      .from("quizzes")
      .select("*")
      .eq("id", quizId)
      .limit(1);

    console.log(data[0].answer, submittedAnswer);
    if (data[0].answer === submittedAnswer) {
      console.log("correct answer");
    }
  }

  async function handleFlagUpdate(quizId) {
    await supabase
      .from("quizzes")
      .update({ flagged: !getQuizById(quizId).flagged }) // Toggle the flagged status
      .eq("id", quizId)
      .select();

    // Update the flagged state for the specific quiz without causing a re-render
    setQuizzes((prevQuizzes) => {
      return prevQuizzes.map((quiz) => {
        if (quiz.id === quizId) {
          return { ...quiz, flagged: !quiz.flagged };
        }
        return quiz;
      });
    });
  }

  function getQuizById(quizId) {
    return quizzes.find((quiz) => quiz.id === quizId);
  }

  async function getQuizzes() {
    const { data } = await supabase.from("quizzes").select("*").order("id");
    let currTab = data.find((item) => item.isAttempted === false)?.id || 0;
    setQuizzes(data);
    setActiveTab(currTab);
  }

  useEffect(() => {
    getQuizzes();
  }, []);

  return (
    <div className="w-full mx-auto flex">
      <QuestionTab
        handleActiveTab={handleActiveTab}
        activeTab={activeTab}
        quizzes={quizzes}
      />
      <div className="flex-[2] border border-red-600">
        {quizzes?.map((quiz) =>
          activeTab === quiz.id ? (
            quiz.type === "choice-based" ? (
              <MCQComponent
                key={quiz.id}
                quiz={quiz}
                handleAnswerSubmission={handleAnswerSubmission}
                flagged={quiz.flagged}
                handleFlagUpdate={handleFlagUpdate}
                nextActiveTab={nextActiveTab}
              />
            ) : (
              <InputComponent
                key={quiz.id}
                quiz={quiz}
                handleAnswerSubmission={handleAnswerSubmission}
                flagged={quiz.flagged}
                handleFlagUpdate={handleFlagUpdate}
                nextActiveTab={nextActiveTab}
              />
            )
          ) : null,
        )}
      </div>
    </div>
  );
}
