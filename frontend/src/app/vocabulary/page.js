'use client';
import { useState, useRef, useEffect } from 'react';
import { vocabData } from '../../data/vocabulary';

export default function VocabularyPage() {
  const categories = Object.keys(vocabData);
  const [activeCat, setActiveCat] = useState(categories[0]);
  const [expanded, setExpanded] = useState(null);
  const voiceRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    if ('speechSynthesis' in window) {
      const pickVoice = () => {
        const voices = window.speechSynthesis.getVoices();
        voiceRef.current =
          voices.find(v => v.lang === 'hi-IN') ||
          voices.find(v => v.lang && v.lang.toLowerCase().startsWith('hi')) ||
          null;
      };
      pickVoice();
      window.speechSynthesis.onvoiceschanged = pickVoice;
    }
  }, []);

  const speakWord = (word) => {
    if (!word) return;
    if (!('speechSynthesis' in window) || !voiceRef.current) {
      if (!audioRef.current) audioRef.current = new Audio();
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.src = `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=hi&q=${encodeURIComponent(word.d)}`;
      audioRef.current.play().catch(() => {});
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(word.d);
    utterance.voice = voiceRef.current;
    utterance.lang = voiceRef.current.lang || 'hi-IN';
    utterance.rate = 0.72;
    window.speechSynthesis.speak(utterance);
  };

  const handleCardClick = (word, index) => {
    speakWord(word);
    setExpanded(expanded === index ? null : index);
    const current = parseInt(localStorage.getItem('sk_words') || '0');
    localStorage.setItem('sk_words', Math.min(32, current + 1).toString());
  };

  return (
    <div className="container">
      <div className="page-header">
        <span className="om-symbol">ॐ</span>
        <h1>Vocabulary</h1>
        <p className="subtitle">शब्दकोशः — Build your word treasure</p>
      </div>

      {/* Introduction */}
      <div className="card fade-in">
        <h2 style={{ textAlign: 'center', fontSize: '1.4rem' }}>Understanding Sanskrit Words</h2>
        <div className="lotus-divider">❧</div>
        <p>
          Sanskrit vocabulary is built on a system of <strong>dhātus</strong> (धातु) — verbal roots from 
          which all words derive. Pāṇini catalogued roughly <strong>2,000 verbal roots</strong>, and from 
          each root, dozens of nouns, adjectives, and verbs can be formed through prefixes (upasargas) and 
          suffixes (pratyayas). This makes Sanskrit vocabulary deeply logical and interconnected.
        </p>
        <p>
          For example, the root <strong>√gam</strong> (गम् — to go) produces: <em>gacchati</em> (he goes), 
          <em>āgacchati</em> (he comes), <em>gati</em> (movement), <em>gamana</em> (journey), and 
          <em>saṅgama</em> (confluence). Once you learn a root, you can intuit the meaning of many new words.
        </p>
        <p>
          Sanskrit words carry <strong>grammatical gender</strong> (masculine, feminine, or neuter), and 
          their endings change based on <strong>case</strong> (vibhakti) and <strong>number</strong> (singular, 
          dual, or plural). Every noun you learn here includes its base form, transliteration, meaning, and 
          a usage note to help you see how it works in context.
        </p>
        <p style={{ color: 'var(--text-dim)', fontSize: '.93rem', textAlign: 'center', marginBottom: 0 }}>
          👆 Click any word card below to hear its pronunciation and see an example sentence.
        </p>
      </div>

      <div className="card fade-in" style={{ animationDelay: '.08s' }}>
        {/* Tabs */}
        <div className="vocab-tabs">
          {categories.map(cat => (
            <button
              key={cat}
              className={`vocab-tab ${activeCat === cat ? 'active' : ''}`}
              onClick={() => { setActiveCat(cat); setExpanded(null); }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Category Description */}
        <div style={{ marginBottom: '1rem' }}>
          {activeCat === 'Basic Words' && (
            <p style={{ fontSize: '.9rem', color: 'var(--text-dim)' }}>
              Essential everyday words — greetings, responses, and common nouns. These are the first words 
              you&apos;ll use in any Sanskrit conversation. Many of these, like <em>namaḥ</em> and 
              <em>dhanyavādaḥ</em>, are already used across India in daily life.
            </p>
          )}
          {activeCat === 'Numbers' && (
            <p style={{ fontSize: '.9rem', color: 'var(--text-dim)' }}>
              The Sanskrit numeral system is the ancestor of the modern decimal system. Notice the striking 
              similarities with English: <em>sapta</em> (seven), <em>nava</em> (nine), <em>daśa</em> (ten). 
              These cognates reveal the shared Proto-Indo-European origin of both languages.
            </p>
          )}
          {activeCat === 'Nature' && (
            <p style={{ fontSize: '.9rem', color: 'var(--text-dim)' }}>
              Nature vocabulary reflects Sanskrit&apos;s deep connection to the physical world. In Vedic 
              philosophy, the universe is made of five elements (<em>pañcabhūta</em>): earth (<em>pṛthvī</em>), 
              water (<em>jala</em>), fire (<em>agni</em>), air (<em>vāyu</em>), and sky (<em>ākāśa</em>).
            </p>
          )}
          {activeCat === 'Daily Life' && (
            <p style={{ fontSize: '.9rem', color: 'var(--text-dim)' }}>
              Words for daily activities, learning, and time. Many of these words have entered modern Indian 
              languages almost unchanged — <em>pustakaṃ</em> (book), <em>samayaḥ</em> (time), and 
              <em>jñānaṃ</em> (knowledge) are used daily in Hindi, Marathi, and Bengali.
            </p>
          )}
        </div>

        {/* Word Grid */}
        <div className="vocab-grid">
          {vocabData[activeCat].map((w, i) => (
            <div
              key={i}
              className={`vocab-card ${expanded === i ? 'expanded' : ''}`}
              onClick={() => handleCardClick(w, i)}
            >
              <span className="vocab-audio" aria-hidden="true">🔊</span>
              <span className="vocab-deva">{w.d}</span>
              <span className="vocab-roman">{w.r}</span>
              <span className="vocab-meaning">{w.m}</span>
              <span className="vocab-hint">Click to hear pronunciation</span>
              {w.e && <div className="vocab-extra">{w.e}</div>}
            </div>
          ))}
        </div>
      </div>

      {/* Word Formation Tip */}
      <div className="card fade-in" style={{ animationDelay: '.12s' }}>
        <h3 style={{ color: 'var(--saffron-light)', marginBottom: '.6rem' }}>💡 How Sanskrit Words Are Formed</h3>
        <p style={{ fontSize: '.93rem' }}>
          Sanskrit uses a root-based word formation system called <strong>prakriyā</strong> (प्रक्रिया). 
          Each word is built from three components:
        </p>
        <div className="example-block">
          <div className="sanskrit devanagari">उपसर्ग + धातु + प्रत्यय = शब्द</div>
          <div className="meaning">Prefix + Root + Suffix = Word</div>
        </div>
        <p style={{ fontSize: '.93rem' }}>
          <strong>Example:</strong> The root <em>√kṛ</em> (कृ — to do/make) creates:
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '.6rem' }}>
          <div className="example-block">
            <div className="sanskrit devanagari">कर्म</div>
            <div className="meaning">karma — action, deed</div>
          </div>
          <div className="example-block">
            <div className="sanskrit devanagari">कारणम्</div>
            <div className="meaning">kāraṇam — cause, reason</div>
          </div>
          <div className="example-block">
            <div className="sanskrit devanagari">संस्कृतम्</div>
            <div className="meaning">saṃskṛtam — refined (sam + kṛ)</div>
          </div>
          <div className="example-block">
            <div className="sanskrit devanagari">प्रकृतिः</div>
            <div className="meaning">prakṛtiḥ — nature (pra + kṛ)</div>
          </div>
        </div>
      </div>

      <div className="lotus-divider" style={{ marginTop: '1.5rem' }}>
        ॥ शब्दो ब्रह्म ॥
      </div>
    </div>
  );
}
