'use client'

import React, { useState } from 'react';

const Quiz = ({ questions }) => {
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(null);

    const handleAnswerClick = (answerIndex, isCorrect) => {
        setSelectedAnswers((prev) => ({ ...prev, [currentQuestionIndex]: { answerIndex, isCorrect } }));

        if (isCorrect) {
            setScore((prevScore) => (prevScore || 0) + 1);
        }

        setTimeout(() => {
            if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
            } else {
                setScore((prevScore) => prevScore || 0);
            }
        }, 500);
    };

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div className="flex flex-col gap-8 p-6">
            {/* Display question number */}
            <div className="text-lg font-medium text-gray-700">
                Question {currentQuestionIndex + 1} / {questions.length}
            </div>

            <div className="mb-6">
                <h2 className="text-lg font-semibold mb-4">{currentQuestion.question}</h2>
                <div className="flex flex-col gap-3">
                    {currentQuestion.answers.map((answer, answerIndex) => (
                        <button
                            key={answerIndex}
                            onClick={() => handleAnswerClick(answerIndex, answer.isCorrect)}
                            className={`p-3 rounded-lg text-left text-lg border-2 
                  ${selectedAnswers[currentQuestionIndex]?.answerIndex === answerIndex
                                ? answer.isCorrect
                                    ? 'bg-green-100 border-green-500'
                                    : 'bg-red-100 border-red-500'
                                : 'border-gray-300'} 
                  hover:bg-gray-100 transition-colors duration-300`}
                            disabled={selectedAnswers[currentQuestionIndex] !== undefined}
                        >
                            {answer.text}
                        </button>
                    ))}
                </div>
            </div>

            {score !== null && currentQuestionIndex === questions.length - 1 && (
                <div className="mt-4 text-xl font-bold text-gray-700">
                    Your Score: {score} / {questions.length}
                </div>
            )}
        </div>
    );
};

export default Quiz;
