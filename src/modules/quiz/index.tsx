import { useEffect } from "react";
import gsap from "gsap";
import Lottie from "lottie-react";
import * as Loader from "../../assets/animations";

import Container from "../../components/Container";
import Option from "../../components/Option";
import Navbar from "../../components/Navbar";
import Button from "../../components/Button";

import { useQuizService } from "./useQuizService";

interface AnswersTypes {
  option: string;
  label: string;
  answer: string;
}

interface Quiz {
  question: string;
  answers: { [key: string]: string };
  correct_answer: string;
}

interface AnswerButtonProps {
  answers: AnswersTypes[];
  correctAnswer: string;
}

function QuizModule() {
  const {
    quizList,
    isLight,
    page,
    selectedAnswer,
    isNextPage,
    handleAnswer,
    handleSubmit,
    handleNext,
  } = useQuizService();

  useEffect(() => {
    gsap.fromTo(
      ".questionNo",
      { scale: 2, y: 200 },
      { scale: 1, y: 0, duration: 2, ease: "power2.inOut" }
    );

    gsap.fromTo(
      ".questionTitle",
      { opacity: 0 },
      { delay: 1.5, stagger: 0.25, opacity: 1, duration: 2 }
    );

    gsap.fromTo(
      ".answerBtn",
      { duration: 10, opacity: 0 },
      { delay: 2.5, stagger: 0.25, opacity: 1, duration: 2 }
    );

    gsap.fromTo(
      ".optionBtn",
      { opacity: 0 },
      {
        delay: 2,
        duration: 1,
        opacity: 1,
        stagger: 0.25,
      }
    );

    gsap.fromTo(
      ".nextBtn",
      { duration: 18, opacity: 0 },
      { delay: 2.5, stagger: 0.25, opacity: 1, duration: 2 }
    );
  }, [page]);

  const mapAnswers = (answers: { [key: string]: string }): AnswersTypes[] => {
    const options = ["A", "B", "C", "D", "E", "F"];

    return Object.keys(answers)
      .map((key, index) => {
        const answer = `answer_${options[index].toLowerCase()}`;
        return {
          option: options[index],
          label: answers[key],
          answer: answer,
        };
      })
      .filter((answer) => answer.label !== null && answer.label !== undefined);
  };

  const AnswerButtons: React.FC<AnswerButtonProps> = ({
    answers,
    correctAnswer,
  }) => {
    return (
      <div className="flex flex-col items-center gap-4 mb-[34px] mx-auto w-fit">
        {answers.map((val, index) => {
          return (
            <div className="optionBtn relative w-full">
              <Option
                key={index}
                onClick={() => {
                  handleAnswer(val);
                }}
                option={val.option}
                label={val.label}
                isLight={isLight}
                active={JSON.stringify(selectedAnswer) === JSON.stringify(val)}
                disabled={isNextPage}
              />
              {isNextPage && correctAnswer === val.answer && (
                <Lottie
                  loop={false}
                  animationData={Loader.correct}
                  className="absolute top-0 right-[-60px] bottom-0 h-full w-[50px]"
                />
              )}

              {isNextPage &&
                selectedAnswer.answer === val.answer &&
                selectedAnswer.answer !== correctAnswer && (
                  <Lottie
                    loop={false}
                    animationData={Loader.wrong}
                    className="absolute top-0 right-[-60px] bottom-0 h-full w-[50px]"
                  />
                )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <Container isLight={isLight}>
      <Navbar />
      {quizList
        .filter((_: Quiz, index: number) => index === page - 1)
        .map((val: Quiz, item: number) => (
          <div key={item} className="container mx-auto px-28">
            <div className="questionNo">
              <p className="font-bebas text-[96px] leading-[115.2px] uppercase">
                Question {page}/10
              </p>
            </div>

            <p className="questionTitle mx-auto w-3/4 font-sora text-[24px] mb-[50px]">
              {val.question}
            </p>

            <div className="answerBtn">
              <AnswerButtons
                answers={mapAnswers(val.answers)}
                correctAnswer={val.correct_answer}
              />
            </div>

            <div className="nextBtn">
              {!isNextPage ? (
                <Button
                  isLight={isLight}
                  onClick={() => handleSubmit(val.correct_answer)}
                  disabled={Object.keys(selectedAnswer).length === 0}
                >
                  Submit
                </Button>
              ) : (
                <Button isLight={isLight} onClick={() => handleNext()}>
                  Next
                </Button>
              )}
            </div>
          </div>
        ))}
    </Container>
  );
}

export default QuizModule;
