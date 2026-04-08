'use client';
import { useState, useCallback } from 'react';
import Link from 'next/link';
import { quizQuestions } from '../../data/quiz';

export default function QuizPage() {
  const [qIdx, setQIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [chosen, setChosen] = useState(null);
  const [showResults, setShowResults] = useState(false);

  const totalQuestions = quizQuestions.length; // 20

  const handleAnswer = useCallback((option) => {
    if (answered) return;
    setAnswered(true);
    setChosen(option);

    const isCorrect = option === quizQuestions[qIdx].correct;
    if (isCorrect) setScore(prev => prev + 1);

    setTimeout(() => {
      if (qIdx + 1 >= totalQuestions) {
        // Save results
        const finalScore = isCorrect ? score + 1 : score;
        const pct = Math.round((finalScore / totalQuestions) * 100);
        localStorage.setItem('sk_quiz_score', pct.toString());
        const attempts = parseInt(localStorage.getItem('sk_quiz_attempts') || '0') + 1;
        localStorage.setItem('sk_quiz_attempts', attempts.toString());
        setShowResults(true);
      } else {
        setQIdx(prev => prev + 1);
        setAnswered(false);
        setChosen(null);
      }
    }, 1700);
  }, [answered, qIdx, score, totalQuestions]);

  const restart = () => {
    setQIdx(0);
    setScore(0);
    setAnswered(false);
    setChosen(null);
    setShowResults(false);
  };

  if (showResults) {
    const pct = Math.round((score / totalQuestions) * 100);
    let msg = pct >= 90 ? 'Outstanding! You have mastered the basics! 🏆'
            : pct >= 70 ? 'Excellent work! Keep practising to perfect your Sanskrit. 🙏'
            : pct >= 50 ? 'Good effort! Review the lessons and try again. 📖'
            : 'Keep going — every great scholar began as a beginner. 🌱';

    return (
      <div className="container">
        <div className="page-header">
          <span className="om-symbol">ॐ</span>
          <h1>Knowledge Quiz</h1>
          <p className="subtitle">परीक्षा — Test what you have learned</p>
        </div>
        <div className="card quiz-container fade-in">
          <div className="quiz-results">
            <h2>Quiz Complete!</h2>
            <div className="score-circle">
              <span className="score-num">{score}</span>
              <span className="score-total">out of {totalQuestions}</span>
            </div>
            <p className="result-msg">{msg}</p>
            <p style={{ color: 'var(--text-dim)', marginBottom: '1.3rem' }}>
              You scored <strong style={{ color: 'var(--saffron-light)' }}>{pct}%</strong>
            </p>
            <button className="btn" onClick={restart}>Try Again</button>
            <Link href="/alphabet" className="btn btn-outline" style={{ marginLeft: '.7rem' }}>
              Review Lessons
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const q = quizQuestions[qIdx];
  const progressPct = Math.round((qIdx / totalQuestions) * 100);

  return (
    <div className="container">
      <div className="page-header">
        <span className="om-symbol">ॐ</span>
        <h1>Knowledge Quiz</h1>
        <p className="subtitle">परीक्षा — Test what you have learned</p>
      </div>

      <div className="card quiz-container fade-in">
        {/* Progress */}
        <div className="quiz-progress">
          <span className="qnum">Q {qIdx + 1} / {totalQuestions}</span>
          <div className="progress-bar-wrap">
            <div className="progress-bar" style={{ width: `${progressPct}%` }}></div>
          </div>
          <span className="quiz-score-badge">Score: {score}</span>
        </div>

        {/* Question */}
        <div className="question-card">
          <p className="question-text">{q.q}</p>
          <span className="question-word devanagari">{q.w}</span>

          <div className="options-grid">
            {q.opts.map((opt, i) => {
              let cls = 'option-btn';
              if (answered) {
                if (opt === q.correct) cls += ' correct';
                else if (opt === chosen) cls += ' wrong';
              }
              return (
                <button
                  key={i}
                  className={cls}
                  onClick={() => handleAnswer(opt)}
                  disabled={answered}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {/* Feedback */}
          {answered && (
            <div className={`feedback-msg ${chosen === q.correct ? 'correct' : 'wrong'}`}>
              {chosen === q.correct
                ? '✓ Correct! Well done!'
                : `✗ Incorrect — the answer is: ${q.correct}`
              }
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
