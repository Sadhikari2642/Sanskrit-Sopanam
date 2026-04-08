'use client';
import { useState, useRef, useEffect } from 'react';
import { vowels, consonants } from '../../data/alphabet';

export default function AlphabetPage() {
  const [selected, setSelected] = useState(null);
  const panelRef = useRef(null);
  const voiceRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    if ('speechSynthesis' in window) {
      const pickVoice = () => {
        const voices = window.speechSynthesis.getVoices();
        voiceRef.current =
          voices.find(v => v.lang === 'sa-IN') ||
          voices.find(v => v.lang === 'hi-IN') ||
          voices.find(v => v.lang && v.lang.toLowerCase().startsWith('hi')) ||
          voices.find(v => v.lang && v.lang.toLowerCase().startsWith('sa')) ||
          null;
      };
      pickVoice();
      window.speechSynthesis.onvoiceschanged = pickVoice;
    }
  }, []);

  const speak = (letter) => {
    if (!letter) return;

    if (!('speechSynthesis' in window) || !voiceRef.current) {
      // Fallback to Google TTS
      if (!audioRef.current) audioRef.current = new Audio();
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.src = `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=hi&q=${encodeURIComponent(letter.d)}`;
      audioRef.current.play().catch(() => {});
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(letter.d);
    utterance.voice = voiceRef.current;
    utterance.lang = voiceRef.current.lang || 'hi-IN';
    utterance.rate = 0.78;
    utterance.pitch = 1;
    utterance.onerror = () => {
      if (!audioRef.current) audioRef.current = new Audio();
      audioRef.current.src = `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=hi&q=${encodeURIComponent(letter.d)}`;
      audioRef.current.play().catch(() => {});
    };
    window.speechSynthesis.speak(utterance);
  };

  const handleSelect = (letter) => {
    setSelected(letter);
    speak(letter);
    // Track progress
    const current = parseInt(localStorage.getItem('sk_letters') || '0');
    const total = vowels.length + consonants.length;
    localStorage.setItem('sk_letters', Math.min(total, current + 1).toString());
    setTimeout(() => {
      panelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 50);
  };

  return (
    <div className="container">
      <div className="page-header">
        <span className="om-symbol">ॐ</span>
        <h1>Sanskrit Alphabet</h1>
        <p className="subtitle">वर्णमाला — The Garland of Letters</p>
      </div>

      <div className="card fade-in">
        <p style={{ textAlign: 'center', marginBottom: '1.5rem', color: 'var(--text-dim)' }}>
          Click any letter to reveal its pronunciation, transliteration, and description.
        </p>

        {/* Vowels */}
        <div className="alpha-group">
          <div className="alpha-group-label">Vowels — स्वर (Svara)</div>
          <div className="alpha-grid">
            {vowels.map((l, i) => (
              <div
                key={i}
                className={`letter-btn ${selected === l ? 'selected' : ''}`}
                onClick={() => handleSelect(l)}
              >
                {l.d}
                <small>{l.r}</small>
              </div>
            ))}
          </div>
        </div>

        <div className="lotus-divider">❧</div>

        {/* Consonants */}
        <div className="alpha-group">
          <div className="alpha-group-label">Consonants — व्यञ्जन (Vyañjana)</div>
          <div className="alpha-grid">
            {consonants.map((l, i) => (
              <div
                key={i}
                className={`letter-btn ${selected === l ? 'selected' : ''}`}
                onClick={() => handleSelect(l)}
              >
                {l.d}
                <small>{l.r}</small>
              </div>
            ))}
          </div>
        </div>

        {/* Detail Panel */}
        {selected && (
          <div className="letter-panel" ref={panelRef}>
            <div className="letter-big devanagari">{selected.d}</div>
            <div className="letter-info">
              <h3>{selected.t}</h3>
              <p className="transliteration">Transliteration: {selected.r}</p>
              <p>{selected.desc}</p>
              <button type="button" className="audio-btn" onClick={() => speak(selected)}>
                🔊 Play pronunciation
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
