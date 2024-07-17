import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateApp } from "../../store/app.slice";
import { useNavigate } from "react-router-dom";

interface selectedAnswerTypes {
  option?: string;
  label?: string;
  answer?: string;
}

const correctSound = new Audio("src/assets/audio/correct.mp3");
const wrongSound = new Audio("src/assets/audio/wrong.mp3");

export const useQuizService = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { app } = useSelector((state: any) => state);
  const {
    quizList,
    selectedAnswer,
    page,
    total,
    totalCorrect,
    isNextPage,
    themeMode,
  } = app;

  const [isLight, setIsLight] = useState(themeMode === "light");

  const handleAnswer = (answer: selectedAnswerTypes) => {
    dispatch(updateApp({ selectedAnswer: answer }));
  };

  const handleSubmit = (correctAnswer: string) => {
    if (correctAnswer === selectedAnswer.answer) {
      dispatch(updateApp({ totalCorrect: totalCorrect + 1 }));
      correctSound.play();
    } else {
      wrongSound.play();
    }

    dispatch(updateApp({ isNextPage: true }));
  };

  const handleNext = () => {
    dispatch(updateApp({ isNextPage: false }));

    if (page === total) {
      dispatch(updateApp({ page: 1 }));
      dispatch(updateApp({ quizList: [] }));
      navigate("/result");
    } else {
      dispatch(updateApp({ page: page + 1 }));
    }

    dispatch(updateApp({ selectedAnswer: {} }));
  };

  useEffect(() => {
    setIsLight(themeMode === "light");
  }, [themeMode]);

  useEffect(() => {
    localStorage.setItem("app", JSON.stringify(app));
  }, [app]);

  return {
    quizList,
    page,
    isLight,
    selectedAnswer,
    isNextPage,
    handleAnswer,
    handleSubmit,
    handleNext,
  };
};
