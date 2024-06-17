import React from 'react';

interface ResultComponentProps {
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  onRestart: () => void;
}

const ResultComponent: React.FC<ResultComponentProps> = ({ totalQuestions, correctAnswers, incorrectAnswers, onRestart }) => {
  return (
    <div>
      <h1>Quiz Results</h1>
      <p>Total Questions Served: {totalQuestions}</p>
      <p>Total Correct Questions: {correctAnswers}</p>
      <p>Total Incorrect Questions: {incorrectAnswers}</p>
      <button onClick={onRestart}>Start Again</button>
    </div>
  );
};

export default ResultComponent;
