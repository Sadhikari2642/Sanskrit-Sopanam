'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('sk_current');
    if (saved) {
      try { setUser(JSON.parse(saved)); } catch (e) {}
    }
    const handler = () => {
      const s = localStorage.getItem('sk_current');
      setUser(s ? JSON.parse(s) : null);
    };
    window.addEventListener('storage', handler);
    window.addEventListener('authChange', handler);
    return () => {
      window.removeEventListener('storage', handler);
      window.removeEventListener('authChange', handler);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('sk_current');
    setUser(null);
    window.dispatchEvent(new Event('authChange'));
  };

  const links = [
    { href: '/', label: 'Home' },
    { href: '/alphabet', label: 'Alphabet' },
    { href: '/vocabulary', label: 'Vocabulary' },
    { href: '/grammar', label: 'Grammar' },
    { href: '/quiz', label: 'Quiz' },
  ];

  const isActive = (href) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <nav className="navbar">
      <div className="nav-inner">
        <Link href="/" className="nav-logo" onClick={() => setMobileOpen(false)}>
          <span className="om">ॐ</span> Sanskrit Portal
        </Link>
        <div className="nav-links">
          {links.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={isActive(link.href) ? 'active-link' : ''}
            >
              {link.label}
            </Link>
          ))}
          {user ? (
            <>
              <Link href="/dashboard" className={`nav-btn ${isActive('/dashboard') ? 'active-link' : ''}`}>Dashboard</Link>
              <button onClick={handleLogout} className="nav-btn nav-btn-logout">Logout</button>
            </>
          ) : (
            <>
              <Link href="/login" className={`nav-btn ${isActive('/login') ? 'active-link' : ''}`}>Login</Link>
              <Link href="/register" className={`nav-btn ${isActive('/register') ? 'active-link' : ''}`}>Register</Link>
            </>
          )}
        </div>
        <div className="hamburger" onClick={() => setMobileOpen(!mobileOpen)}>
          <span></span><span></span><span></span>
        </div>
      </div>
      <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`}>
        {links.map(link => (
          <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)}>
            {link.label}
          </Link>
        ))}
        {user ? (
          <>
            <Link href="/dashboard" onClick={() => setMobileOpen(false)}>Dashboard</Link>
            <a href="#" onClick={(e) => { e.preventDefault(); handleLogout(); setMobileOpen(false); }}>Logout</a>
          </>
        ) : (
          <>
            <Link href="/login" onClick={() => setMobileOpen(false)}>Login</Link>
            <Link href="/register" onClick={() => setMobileOpen(false)}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
