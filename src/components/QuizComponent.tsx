import React, { useEffect, useState } from 'react';
import { Question, Answer } from '../types';
import { fetchQuestion } from '../services/quizService';
import QuestionComponent from './QuestionComponent';

interface QuizComponentProps {
  onQuizEnd: (correctAnswers: number, incorrectAnswers: number) => void;
}

const QuizComponent: React.FC<QuizComponentProps> = ({ onQuizEnd }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [answer, setAnswer] = useState<Answer | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  useEffect(() => {
    const loadQuestion = async () => {
      try {
        const newQuestion = await fetchQuestion();
        setQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
      } catch (err) {
        setError('Failed to fetch question. Please try again later.');
      }
    };

    loadQuestion();
  }, [currentQuestionIndex]);

  const handleAnswer = (selectedAnswer: string) => {
    if (isAnswered) return;  

    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.correct_answer;

    setAnswer({
      answer: selectedAnswer,
      isCorrect,
      correctAnswer: currentQuestion.correct_answer,
    });

    if (isCorrect) {
      setCorrectAnswers((prev) => prev + 1);
    } else {
      setIncorrectAnswers((prev) => prev + 1);
    }

    setIsAnswered(true);
  };

  const handleNextQuestion = () => {
    setAnswer(null);
    setIsAnswered(false);

    if (currentQuestionIndex + 1 < 10) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      onQuizEnd(correctAnswers, incorrectAnswers);
    }
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (questions.length <= currentQuestionIndex) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <QuestionComponent question={questions[currentQuestionIndex]} onAnswer={handleAnswer} />
      {answer && (
        <div>
          <p>{answer.isCorrect ? 'Correct!' : 'Incorrect!'}</p>
          {!answer.isCorrect && <p>The correct answer was: {answer.correctAnswer}</p>}
          <button onClick={handleNextQuestion}>Next</button>
        </div>
      )}
    </div>
  );
};

export default QuizComponent;
