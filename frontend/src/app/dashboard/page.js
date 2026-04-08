'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { vowels, consonants } from '../../data/alphabet';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({ score: '—', attempts: 0, letters: 0, words: 0 });

  useEffect(() => {
    const saved = localStorage.getItem('sk_current');
    if (!saved) {
      router.push('/login');
      return;
    }
    try {
      setUser(JSON.parse(saved));
    } catch {
      router.push('/login');
      return;
    }

    const totalLetters = vowels.length + consonants.length;
    const totalWords = 32;
    const savedScore = localStorage.getItem('sk_quiz_score') || '—';
    const savedAttempts = localStorage.getItem('sk_quiz_attempts') || '0';
    const savedLetters = localStorage.getItem('sk_letters') || '0';
    const savedWords = localStorage.getItem('sk_words') || '0';

    setStats({
      score: savedScore,
      attempts: parseInt(savedAttempts),
      letters: parseInt(savedLetters),
      words: parseInt(savedWords),
      lettersPct: Math.min(100, Math.round((parseInt(savedLetters) / totalLetters) * 100)),
      wordsPct: Math.min(100, Math.round((parseInt(savedWords) / totalWords) * 100)),
      quizPct: savedScore !== '—' ? parseInt(savedScore) : 0,
    });
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('sk_current');
    window.dispatchEvent(new Event('authChange'));
    router.push('/');
  };

  if (!user) return null;

  return (
    <div className="container">
      <div className="card fade-in">
        <div className="dashboard-welcome">
          <span style={{ fontSize: '2.8rem' }}>🙏</span>
          <h2>Welcome back, {user.name}!</h2>
          <p>Joined: <span style={{ color: 'var(--saffron-light)' }}>{user.joined || 'Recently'}</span></p>
          <div className="lotus-divider">❧ ✿ ❧</div>
        </div>

        {/* Stats */}
        <div className="dash-stats">
          <div className="stat-box">
            <span className="stat-num">{stats.score !== '—' ? stats.score + '%' : '—'}</span>
            <div className="stat-lbl">Best Quiz Score</div>
          </div>
          <div className="stat-box">
            <span className="stat-num">{stats.attempts}</span>
            <div className="stat-lbl">Quiz Attempts</div>
          </div>
          <div className="stat-box">
            <span className="stat-num">{stats.letters}</span>
            <div className="stat-lbl">Letters Studied</div>
          </div>
          <div className="stat-box">
            <span className="stat-num">{stats.words}</span>
            <div className="stat-lbl">Words Explored</div>
          </div>
        </div>

        {/* Progress Bars */}
        <div className="progress-section">
          <h3>Your Progress</h3>
          <div className="prog-item">
            <label>Alphabet</label>
            <div className="prog-bar-bg">
              <div className="prog-bar-fill" style={{ width: `${stats.lettersPct || 0}%` }}></div>
            </div>
            <span className="prog-pct">{stats.lettersPct || 0}%</span>
          </div>
          <div className="prog-item">
            <label>Vocabulary</label>
            <div className="prog-bar-bg">
              <div className="prog-bar-fill" style={{ width: `${stats.wordsPct || 0}%` }}></div>
            </div>
            <span className="prog-pct">{stats.wordsPct || 0}%</span>
          </div>
          <div className="prog-item">
            <label>Quiz</label>
            <div className="prog-bar-bg">
              <div className="prog-bar-fill" style={{ width: `${stats.quizPct || 0}%` }}></div>
            </div>
            <span className="prog-pct">{stats.quizPct || 0}%</span>
          </div>
        </div>

        {/* Quick Links */}
        <h3 style={{ marginTop: '1.8rem', marginBottom: '.9rem', color: 'var(--saffron-light)', fontSize: '1.05rem' }}>
          Continue Learning
        </h3>
        <div className="dash-grid">
          <Link href="/alphabet" className="dash-card"><span className="dash-icon">🔤</span><h3>Alphabet</h3></Link>
          <Link href="/vocabulary" className="dash-card"><span className="dash-icon">📖</span><h3>Vocabulary</h3></Link>
          <Link href="/grammar" className="dash-card"><span className="dash-icon">📜</span><h3>Grammar</h3></Link>
          <Link href="/quiz" className="dash-card"><span className="dash-icon">✅</span><h3>Take Quiz</h3></Link>
          <div className="dash-card" onClick={handleLogout}><span className="dash-icon">🚪</span><h3>Logout</h3></div>
        </div>
      </div>
    </div>
  );
}
