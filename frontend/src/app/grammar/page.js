import { grammarLessons } from '../../data/grammar';

export default function GrammarPage() {
  return (
    <div className="container">
      <div className="page-header">
        <span className="om-symbol">ॐ</span>
        <h1>Grammar Basics</h1>
        <p className="subtitle">व्याकरणम् — The Science of Language</p>
      </div>

      {/* Grammar Introduction */}
      <div className="card fade-in">
        <h2 style={{ textAlign: 'center', fontSize: '1.4rem' }}>Understanding Sanskrit Grammar</h2>
        <div className="lotus-divider">❧ ✿ ❧</div>
        <p>
          Sanskrit grammar (<strong>Vyākaraṇa</strong> — व्याकरणम्) is one of the six Vedāṅgas — the 
          auxiliary disciplines essential for understanding the Vedas. It is considered the &ldquo;mouth&rdquo; 
          of the Vedic body, as correct speech was paramount in ritual and philosophical discourse.
        </p>
        <p>
          The earliest and most celebrated Sanskrit grammar is <strong>Pāṇini&apos;s Aṣṭādhyāyī</strong> 
          (अष्टाध्यायी — &ldquo;Eight Chapters&rdquo;), composed around 400 BCE. In just 3,959 sūtras 
          (aphoristic rules), Pāṇini described the entire structure of the language with a precision that 
          modern linguists compare to a programming language. His use of meta-rules, variables, and 
          recursion predated computer science by over two millennia.
        </p>
        <p>
          Sanskrit grammar is <strong>inflectional</strong> — meaning that the form of a word changes to 
          express its grammatical role. Unlike English, which relies heavily on word order (&ldquo;The dog 
          bites the man&rdquo; vs. &ldquo;The man bites the dog&rdquo;), Sanskrit uses <strong>case 
          endings</strong> (vibhaktis) so that meaning is preserved regardless of word order. This makes 
          Sanskrit extraordinarily flexible for both prose and poetry.
        </p>

        <h3 style={{ color: 'var(--saffron-light)', marginTop: '1.5rem', marginBottom: '.6rem' }}>
          Key Grammatical Concepts at a Glance
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '.8rem' }}>
          <div className="example-block" style={{ textAlign: 'center' }}>
            <div className="sanskrit devanagari" style={{ fontSize: '1rem' }}>लिङ्गम् (Liṅgam)</div>
            <div className="meaning" style={{ fontWeight: 600 }}>3 Genders</div>
            <div className="meaning">Masculine · Feminine · Neuter</div>
          </div>
          <div className="example-block" style={{ textAlign: 'center' }}>
            <div className="sanskrit devanagari" style={{ fontSize: '1rem' }}>वचनम् (Vacanam)</div>
            <div className="meaning" style={{ fontWeight: 600 }}>3 Numbers</div>
            <div className="meaning">Singular · Dual · Plural</div>
          </div>
          <div className="example-block" style={{ textAlign: 'center' }}>
            <div className="sanskrit devanagari" style={{ fontSize: '1rem' }}>विभक्तिः (Vibhaktiḥ)</div>
            <div className="meaning" style={{ fontWeight: 600 }}>8 Cases</div>
            <div className="meaning">Nominative to Locative</div>
          </div>
          <div className="example-block" style={{ textAlign: 'center' }}>
            <div className="sanskrit devanagari" style={{ fontSize: '1rem' }}>लकारः (Lakāraḥ)</div>
            <div className="meaning" style={{ fontWeight: 600 }}>10 Tenses/Moods</div>
            <div className="meaning">Present to Benedictive</div>
          </div>
        </div>
      </div>

      {/* The 8 Cases Detail */}
      <div className="card fade-in" style={{ animationDelay: '.08s' }}>
        <h2 style={{ textAlign: 'center', fontSize: '1.35rem' }}>The Eight Cases (अष्ट विभक्तयः)</h2>
        <div className="lotus-divider">❧</div>
        <p>
          Every Sanskrit noun takes one of <strong>eight case endings</strong> depending on its function in 
          the sentence. This is why word order in Sanskrit is free — the ending tells you the role. Here are 
          all eight cases using <em>rāma</em> (राम — masculine) as an example:
        </p>
        <div style={{ overflowX: 'auto' }}>
          <table className="grammar-table">
            <thead>
              <tr>
                <th>Case</th>
                <th>Sanskrit Name</th>
                <th>Function</th>
                <th>Example</th>
                <th>Meaning</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>1st</td><td className="devanagari">प्रथमा</td><td>Subject (who?)</td><td className="devanagari">रामः</td><td>Rāma (does)</td></tr>
              <tr><td>2nd</td><td className="devanagari">द्वितीया</td><td>Object (whom?)</td><td className="devanagari">रामम्</td><td>(sees) Rāma</td></tr>
              <tr><td>3rd</td><td className="devanagari">तृतीया</td><td>Instrument (by)</td><td className="devanagari">रामेण</td><td>by Rāma</td></tr>
              <tr><td>4th</td><td className="devanagari">चतुर्थी</td><td>Dative (for)</td><td className="devanagari">रामाय</td><td>for Rāma</td></tr>
              <tr><td>5th</td><td className="devanagari">पञ्चमी</td><td>Ablative (from)</td><td className="devanagari">रामात्</td><td>from Rāma</td></tr>
              <tr><td>6th</td><td className="devanagari">षष्ठी</td><td>Possessive (of)</td><td className="devanagari">रामस्य</td><td>of Rāma</td></tr>
              <tr><td>7th</td><td className="devanagari">सप्तमी</td><td>Locative (in/on)</td><td className="devanagari">रामे</td><td>in Rāma</td></tr>
              <tr><td>8th</td><td className="devanagari">सम्बोधन</td><td>Vocative (O!)</td><td className="devanagari">हे राम!</td><td>O Rāma!</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Lessons */}
      <div className="card fade-in" style={{ animationDelay: '.14s' }}>
        <h2 style={{ textAlign: 'center', fontSize: '1.35rem' }}>Detailed Lessons</h2>
        <div className="lotus-divider">❧</div>
        {grammarLessons.map((lesson, i) => (
          <div key={i}>
            <div className="grammar-lesson" style={i > 0 ? { borderTop: '1px solid rgba(212,165,32,0.18)', paddingTop: '1.5rem' } : {}}>
              <h3>{lesson.title}</h3>
              <p>{lesson.body}</p>
              {lesson.examples.map((ex, j) => (
                <div key={j} className="example-block">
                  <div className="sanskrit devanagari">{ex.s}</div>
                  <div className="meaning">{ex.m}</div>
                </div>
              ))}
            </div>
            {i < grammarLessons.length - 1 && (
              <div className="lotus-divider">❧</div>
            )}
          </div>
        ))}
      </div>

      {/* Sandhi Introduction */}
      <div className="card fade-in" style={{ animationDelay: '.2s' }}>
        <h3 style={{ color: 'var(--saffron-light)', marginBottom: '.6rem' }}>🔗 Sandhi — The Art of Sound Combination</h3>
        <p>
          One of Sanskrit&apos;s most distinctive features is <strong>Sandhi</strong> (सन्धि — 
          &ldquo;joining&rdquo;) — the systematic rules by which sounds change when words or morphemes 
          come together. Sandhi makes Sanskrit flow smoothly in speech and verse, but it can be challenging 
          for beginners because word boundaries disappear.
        </p>
        <div className="example-block">
          <div className="sanskrit devanagari">न + अस्ति = नास्ति</div>
          <div className="meaning">na + asti = nāsti (does not exist) — Vowel Sandhi: a + a = ā</div>
        </div>
        <div className="example-block">
          <div className="sanskrit devanagari">सत् + चित् = सच्चित्</div>
          <div className="meaning">sat + cit = saccit (truth-consciousness) — Consonant Sandhi: t + c = cc</div>
        </div>
        <div className="example-block">
          <div className="sanskrit devanagari">महा + ईश्वरः = महेश्वरः</div>
          <div className="meaning">mahā + īśvaraḥ = maheśvaraḥ (great lord) — Vowel Sandhi: ā + ī = e</div>
        </div>
        <p style={{ fontSize: '.92rem', color: 'var(--text-dim)' }}>
          There are three types of Sandhi: <strong>Svara Sandhi</strong> (vowel + vowel), 
          <strong> Vyañjana Sandhi</strong> (consonant changes), and <strong>Visarga Sandhi</strong> 
          (visarga + following sound). Mastering Sandhi is essential for reading continuous Sanskrit prose and poetry.
        </p>
      </div>

      {/* Verb Conjugation Quick Reference */}
      <div className="card fade-in" style={{ animationDelay: '.25s' }}>
        <h3 style={{ color: 'var(--saffron-light)', marginBottom: '.6rem' }}>📊 Verb Conjugation — Present Tense (लट् लकार)</h3>
        <p style={{ fontSize: '.93rem' }}>
          Sanskrit verbs conjugate for <strong>person</strong> (first, second, third), 
          <strong> number</strong> (singular, dual, plural), and <strong>voice</strong> (active/parasmaipada, 
          middle/ātmanepada). Here is the full present tense of <em>√gam</em> (गम् — to go):
        </p>
        <div style={{ overflowX: 'auto' }}>
          <table className="grammar-table">
            <thead>
              <tr>
                <th>Person</th>
                <th>Singular</th>
                <th>Dual</th>
                <th>Plural</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>3rd (he/they)</td><td className="devanagari">गच्छति</td><td className="devanagari">गच्छतः</td><td className="devanagari">गच्छन्ति</td></tr>
              <tr><td>2nd (you)</td><td className="devanagari">गच्छसि</td><td className="devanagari">गच्छथः</td><td className="devanagari">गच्छथ</td></tr>
              <tr><td>1st (I/we)</td><td className="devanagari">गच्छामि</td><td className="devanagari">गच्छावः</td><td className="devanagari">गच्छामः</td></tr>
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: '.88rem', color: 'var(--text-dim)', marginTop: '.6rem', marginBottom: 0 }}>
          Note: Sanskrit lists 3rd person first (unlike English), because the 3rd person is the most 
          commonly encountered form in texts.
        </p>
      </div>

      <div className="lotus-divider" style={{ marginTop: '1.5rem' }}>
        ॥ व्याकरणं शास्त्राणां शास्त्रम् ॥
      </div>
    </div>
  );
}
