import React, { useState } from 'react';
import './App.css';
import QuizComponent from './components/QuizComponent';
import ResultComponent from './components/ResultComponent';

const App: React.FC = () => {
  const [isQuizActive, setIsQuizActive] = useState(true);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);

  const handleQuizEnd = (correct: number, incorrect: number) => {
    setCorrectAnswers(correct);
    setIncorrectAnswers(incorrect);
    setIsQuizActive(false);
  };

  const handleRestart = () => {
    setCorrectAnswers(0);
    setIncorrectAnswers(0);
    setIsQuizActive(true);
  };

  return (
    <div className="app">
      {isQuizActive ? (
        <QuizComponent onQuizEnd={handleQuizEnd} />
      ) : (
        <ResultComponent
          totalQuestions={10}
          correctAnswers={correctAnswers}
          incorrectAnswers={incorrectAnswers}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
};

export default App;
