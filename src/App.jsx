import { useState, useEffect } from "react";
import { QuestionTab } from "./component/QuestionTab";
import { Quiz } from "./component/Quiz";
import { supabase } from "./supabase";

export function App() {
  const [quizzes, setQuizzes] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setisLoading] = useState(false);

  function handleActiveTab(quizId) {
    setActiveTab(quizId);
  }

  function nextTab(quizId) {
    setActiveTab(quizId + 1);
  }

  function nextActiveTab(quizId) {
    if (!quizId) {
      setActiveTab(1);
      return;
    }
    const currentIndex = quizzes.findIndex((quiz) => quiz.id === quizId);
    let nextIndex = currentIndex + 1;
    while (nextIndex < quizzes.length) {
      const nextQuiz = quizzes[nextIndex];
      if (!nextQuiz.isAttempted && !nextQuiz.flagged) {
        setActiveTab(nextQuiz.id);
        return;
      }
      nextIndex++;
    }
    setActiveTab(quizId);
  }

  async function handleAnswerSubmission(
    quizId,
    submittedAnswer,
    setIsModalVisible,
    setModalMessage,
    soundRef,
    value,
  ) {
    if (submittedAnswer !== "" && submittedAnswer !== "0") {
      const quiz = getQuizById(quizId);
      setisLoading(true);
      if (quiz.attempts > 0) {
        const { data } = await supabase
          .from("quizzes")
          .update({ attempts: quiz.attempts - 1 })
          .eq("id", quizId)
          .select();
        if (data) {
          setisLoading(false);
          setQuizzes((prevQuizzes) => {
            return prevQuizzes.map((quiz) => {
              if (quiz.id === quizId && quiz.attempts > 0) {
                return { ...quiz, attempts: quiz.attempts - 1 };
              }
              return quiz;
            });
          });
        }
      }
      if (quiz.answer === submittedAnswer) {
        setIsModalVisible(true);
        setModalMessage("success");
        setisLoading(true);
        const { data } = await supabase
          .from("quizzes")
          .update({ isCorrectlyGuessed: true, isAttempted: true })
          .eq("id", quizId)
          .select();
        if (data) {
          setisLoading(false);
          if (value) {
            soundRef.current.play();
          }
          setQuizzes((prevQuizzes) => {
            return prevQuizzes.map((quiz) => {
              if (quiz.id === quizId) {
                return { ...quiz, isCorrectlyGuessed: true, isAttempted: true };
              }
              return quiz;
            });
          });
        }

        setTimeout(() => {
          nextActiveTab(quizId);
        }, 2000);
      } else {
        setIsModalVisible(true);
        setModalMessage("incorrect");
        if (value) {
          soundRef.current.play();
        }
        if (quiz.attempts === 1) {
          setisLoading(true);
          const { data } = await supabase
            .from("quizzes")
            .update({ isCorrectlyGuessed: false, isAttempted: true })
            .eq("id", quizId)
            .select();
          if (data) {
            setisLoading(false);
            setQuizzes((prevQuizzes) => {
              return prevQuizzes.map((quiz) => {
                if (quiz.id === quizId) {
                  return {
                    ...quiz,
                    isCorrectlyGuessed: false,
                    isAttempted: true,
                  };
                }
                return quiz;
              });
            });
            setTimeout(() => {
              nextActiveTab(quizId);
            }, 2000);
          }
        }
      }
    } else {
      setIsModalVisible(true);
      setModalMessage("empty");
    }
  }

  async function handleFlagUpdate(quizId) {
    await supabase
      .from("quizzes")
      .update({ flagged: !getQuizById(quizId).flagged })
      .eq("id", quizId)
      .select();

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
    let currTab = data.find(
      (item) => !item.isAttempted && !item.flagged && item.isCurrentlyActive,
    )?.id;

    // If there's no such item, set currTab to the first item in the list
    if (!currTab) {
      currTab = data.find((item) => !item.isAttempted && !item.flagged)?.id;
    }
    setQuizzes(data);
    setActiveTab(currTab);
  }

  async function setCurrentActiveTab(quizId, quiz) {
    if (!quiz.isAttempted || !quiz.isflagged) {
      try {
        const updatePromises = quizzes.map((quiz) => {
          const updatedQuiz = {
            ...quiz,
            isCurrentlyActive: quiz.id === quizId,
          };
          return supabase.from("quizzes").update(updatedQuiz).eq("id", quiz.id);
        });

        await Promise.all(updatePromises);

        setQuizzes((prevQuizzes) => {
          return prevQuizzes.map((quiz) => {
            return {
              ...quiz,
              isCurrentlyActive: quiz.id === quizId,
            };
          });
        });
      } catch (error) {
        console.error("Error setting current active tab:", error);
      }
    }
  }

  const handleQuizReset = () => {
    const quizzesWithAttempts = quizzes.map((quiz) => ({
      ...quiz,
      attempts: quiz.option?.length ? quiz.option.length - 1 : 6,
    }));

    const updatePromises = quizzesWithAttempts.map((quiz) =>
      supabase
        .from("quizzes")
        .update({
          attempts: quiz.attempts,
          isAttempted: false,
          isCorrectlyGuessed: false,
          flagged: false,
        })
        .eq("id", quiz.id),
    );

    Promise.all(updatePromises)
      .then((data) => {
        setQuizzes((prevQuizzes) => {
          return prevQuizzes.map((quiz) => {
            return {
              ...quiz,
              attempts: quiz.option?.length ? quiz.option.length - 1 : 6,
              isAttempted: false,
              isCorrectlyGuessed: false,
              flagged: false,
            };
          });
        });
        nextActiveTab();
      })
      .catch((error) => {
        // Handle errors while resetting the quiz attempts
        console.error("Error resetting quiz attempts:", error);
      });
  };

  useEffect(() => {
    getQuizzes();
  }, []);

  return (
    <div className="w-full mx-auto flex">
      <div className="hidden md:block">
        <QuestionTab
          handleActiveTab={handleActiveTab}
          activeTab={activeTab}
          quizzes={quizzes}
          setCurrentActiveTab={setCurrentActiveTab}
        />
      </div>
      <Quiz
        quizzes={quizzes}
        activeTab={activeTab}
        handleAnswerSubmission={handleAnswerSubmission}
        handleFlagUpdate={handleFlagUpdate}
        nextActiveTab={nextActiveTab}
        nextTab={nextTab}
        loading={loading}
        handleQuizReset={handleQuizReset}
      />
    </div>
  );
}
