'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { showToast } from '../../components/Toast';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const isValidEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!isValidEmail(email)) newErrors.email = 'Please enter a valid email address.';
    if (!password) newErrors.password = 'Password cannot be empty.';

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);

    try {
      // Try Express backend first
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem('sk_current', JSON.stringify(data.user));
        window.dispatchEvent(new Event('authChange'));
        showToast(`Welcome back, ${data.user.name}! 🙏`);
        router.push('/dashboard');
        return;
      }

      const errData = await res.json();
      setErrors({ general: errData.error || 'Login failed.' });
    } catch {
      // Fallback to localStorage-based auth
      const users = JSON.parse(localStorage.getItem('sk_users') || '[]');
      const user = users.find(u => u.email === email && u.pass === password);
      if (user) {
        localStorage.setItem('sk_current', JSON.stringify(user));
        window.dispatchEvent(new Event('authChange'));
        showToast(`Welcome back, ${user.name}! 🙏`);
        router.push('/dashboard');
      } else {
        setErrors({ general: 'Incorrect email or password.' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="page-header">
        <span className="om-symbol">ॐ</span>
        <h1>Login</h1>
        <p className="subtitle">Welcome back, dear learner</p>
      </div>

      <div className="card auth-card fade-in">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="loginEmail">Email Address</label>
            <input
              type="email"
              id="loginEmail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              autoComplete="email"
            />
            {errors.email && <div className="form-error">{errors.email}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="loginPass">Password</label>
            <input
              type="password"
              id="loginPass"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password"
              autoComplete="current-password"
            />
            {errors.password && <div className="form-error">{errors.password}</div>}
          </div>

          {errors.general && (
            <div className="form-error" style={{ textAlign: 'center', marginBottom: '.8rem' }}>
              {errors.general}
            </div>
          )}

          <button type="submit" className="btn" style={{ width: '100%' }} disabled={loading}>
            {loading ? 'Logging in...' : 'Login →'}
          </button>
        </form>

        <p className="auth-link" style={{ marginTop: '1rem' }}>
          Don&apos;t have an account?{' '}
          <Link href="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
}
