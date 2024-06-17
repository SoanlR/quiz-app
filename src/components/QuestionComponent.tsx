import React, { useState } from 'react';
import { Question } from '../types';

interface QuestionComponentProps {
  question: Question;
  onAnswer: (answer: string) => void;
}

const QuestionComponent: React.FC<QuestionComponentProps> = ({ question, onAnswer }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const handleSubmit = () => {
    if (selectedAnswer) {
      onAnswer(selectedAnswer);
    }
  };

  const answers = [...question.incorrect_answers, question.correct_answer].sort();

  return (
    <div className="question-box">
      <h2>{question.question}</h2>
      <ul>
        {answers.map((answer) => (
          <li key={answer}>
            <label>
              <input
                type="radio"
                value={answer}
                checked={selectedAnswer === answer}
                onChange={() => setSelectedAnswer(answer)}
              />
              {answer}
            </label>
          </li>
        ))}
      </ul>
      <button onClick={handleSubmit} disabled={!selectedAnswer}>
        Submit
      </button>
    </div>
  );
};

export default QuestionComponent;
