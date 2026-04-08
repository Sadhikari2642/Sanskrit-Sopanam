'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { showToast } from '../../components/Toast';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const isValidEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!name.trim()) newErrors.name = 'Name is required.';
    if (!isValidEmail(email)) newErrors.email = 'Please enter a valid email address.';
    if (password.length < 6) newErrors.password = 'Password must be at least 6 characters.';
    if (password !== password2) newErrors.password2 = 'Passwords do not match.';

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);

    try {
      // Try Express backend first
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      if (res.ok) {
        showToast('Account created! Please login. ✓');
        router.push('/login');
        return;
      }

      const errData = await res.json();
      setErrors({ general: errData.error || 'Registration failed.' });
    } catch {
      // Fallback to localStorage
      const users = JSON.parse(localStorage.getItem('sk_users') || '[]');
      if (users.find(u => u.email === email)) {
        setErrors({ email: 'This email is already registered.' });
      } else {
        users.push({ name: name.trim(), email, pass: password, joined: new Date().toLocaleDateString() });
        localStorage.setItem('sk_users', JSON.stringify(users));
        showToast('Account created! Please login. ✓');
        router.push('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="page-header">
        <span className="om-symbol">ॐ</span>
        <h1>Create Account</h1>
        <p className="subtitle">Join thousands of Sanskrit learners</p>
      </div>

      <div className="card auth-card fade-in">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="regName">Full Name</label>
            <input
              type="text"
              id="regName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              autoComplete="name"
            />
            {errors.name && <div className="form-error">{errors.name}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="regEmail">Email Address</label>
            <input
              type="email"
              id="regEmail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              autoComplete="email"
            />
            {errors.email && <div className="form-error">{errors.email}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="regPass">Password</label>
            <input
              type="password"
              id="regPass"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
              autoComplete="new-password"
            />
            {errors.password && <div className="form-error">{errors.password}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="regPass2">Confirm Password</label>
            <input
              type="password"
              id="regPass2"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              placeholder="Repeat your password"
              autoComplete="new-password"
            />
            {errors.password2 && <div className="form-error">{errors.password2}</div>}
          </div>

          {errors.general && (
            <div className="form-error" style={{ textAlign: 'center', marginBottom: '.8rem' }}>
              {errors.general}
            </div>
          )}

          <button type="submit" className="btn" style={{ width: '100%' }} disabled={loading}>
            {loading ? 'Creating account...' : 'Create Account →'}
          </button>
        </form>

        <p className="auth-link" style={{ marginTop: '1rem' }}>
          Already have an account?{' '}
          <Link href="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
}
