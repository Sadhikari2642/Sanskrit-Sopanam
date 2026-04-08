'use client';
import { useState, useEffect, useCallback } from 'react';

let toastTimeout = null;

export function showToast(msg) {
  window.dispatchEvent(new CustomEvent('showToast', { detail: msg }));
}

export default function Toast() {
  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(false);

  const handleToast = useCallback((e) => {
    if (toastTimeout) clearTimeout(toastTimeout);
    setMessage(e.detail);
    setVisible(true);
    toastTimeout = setTimeout(() => setVisible(false), 2800);
  }, []);

  useEffect(() => {
    window.addEventListener('showToast', handleToast);
    return () => window.removeEventListener('showToast', handleToast);
  }, [handleToast]);

  return (
    <div className={`toast ${visible ? 'show' : ''}`}>
      {message}
    </div>
  );
}
