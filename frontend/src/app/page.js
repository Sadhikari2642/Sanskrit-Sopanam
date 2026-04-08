import Link from 'next/link';
import FeatureCard from '../components/FeatureCard';

export default function HomePage() {
  return (
    <div className="container">
      {/* Hero Section */}
      <div className="hero fade-in">
        <span className="om-symbol">ॐ</span>
        <h1>Sanskrit Learning Portal</h1>
        <span className="hero-deva devanagari">संस्कृत अध्ययन केन्द्रम्</span>
        <p className="tagline">
          Discover the beauty of the world&apos;s most refined classical language — 
          over 3,500 years of wisdom, poetry, and knowledge await you.
        </p>
        <div className="hero-buttons">
          <Link href="/alphabet" className="btn">
            Start Learning →
          </Link>
          <Link href="/quiz" className="btn btn-outline">
            Take Quiz
          </Link>
        </div>
      </div>

      {/* Introduction */}
      <div className="card intro-card fade-in" style={{ animationDelay: '.1s' }}>
        <h2>What is Sanskrit?</h2>
        <div className="lotus-divider">❧ ✿ ❧</div>
        <p>
          Sanskrit (संस्कृतम्) — meaning &ldquo;refined&rdquo; or &ldquo;perfected&rdquo; — is one of the 
          world&apos;s oldest classical languages, with over 3,500 years of recorded history. It is 
          the primary liturgical language of Hinduism, the philosophical language of Buddhism and 
          Jainism, and the foundation upon which countless modern languages across Asia and Europe are built.
        </p>
        <p>
          Often called <strong>Devabhāṣā</strong> (देवभाषा) — &ldquo;the language of the gods&rdquo; — 
          Sanskrit is renowned for its scientific precision, poetic beauty, and unmatched philosophical depth.
          It was used to compose the Vedas, Upanishads, Bhagavad Gita, Rāmāyaṇa, and Mahābhārata — texts that 
          have shaped the thought and culture of billions of people across millennia.
        </p>
        <p>
          Its grammar, codified by the great linguist <strong>Pāṇini</strong> (पाणिनि) around 400 BCE in his 
          masterwork <em>Aṣṭādhyāyī</em> (अष्टाध्यायी — &ldquo;Eight Chapters&rdquo;), contains 3,959 rules 
          that describe the entire language with mathematical precision. Pāṇini&apos;s system inspired modern 
          computational linguistics and is considered one of the greatest intellectual achievements in human history.
        </p>
      </div>

      {/* History & Significance */}
      <div className="card fade-in" style={{ animationDelay: '.15s' }}>
        <h2 style={{ textAlign: 'center' }}>A Living Heritage</h2>
        <div className="lotus-divider">❧</div>
        <p>
          Sanskrit belongs to the <strong>Indo-European language family</strong>, sharing deep roots with 
          Latin, Greek, Persian, and all modern European languages. The word for &ldquo;mother&rdquo; 
          in Sanskrit is <em>mātṛ</em> (मातृ), strikingly similar to Latin <em>mater</em>, Greek 
          <em> mētēr</em>, and English <em>mother</em> — evidence of a shared linguistic ancestry 
          stretching back over 5,000 years.
        </p>
        <p>
          Unlike many ancient languages, Sanskrit is not dead. It continues to be spoken in parts of India — 
          the village of <strong>Mattur</strong> in Karnataka is famous for everyday Sanskrit conversation. 
          It remains the language of Hindu rituals, Vedic chanting, yoga philosophy, and classical Indian 
          music. Universities across the world — from Harvard to Oxford to Jawaharlal Nehru University — 
          offer Sanskrit studies programs.
        </p>
        <p>
          Sanskrit literature encompasses every domain of human knowledge: astronomy (<em>Jyotiṣa</em>), 
          medicine (<em>Āyurveda</em>), mathematics (<em>Gaṇita</em>), law (<em>Dharmaśāstra</em>), 
          logic (<em>Nyāya</em>), grammar (<em>Vyākaraṇa</em>), poetics (<em>Alaṅkāra</em>), and 
          philosophy (<em>Darśana</em>). The concept of <strong>zero</strong>, the decimal system, and 
          early algebra all emerged from Sanskrit mathematical texts.
        </p>
      </div>

      {/* Why Learn Sanskrit */}
      <div className="card fade-in" style={{ animationDelay: '.2s' }}>
        <h2 style={{ textAlign: 'center' }}>Why Learn Sanskrit?</h2>
        <div className="lotus-divider">❧</div>
        <div className="why-grid">
          <div className="why-item">
            <span className="why-icon">📚</span>
            <h3>Access Ancient Texts</h3>
            <p>
              Read the Vedas, Upanishads, Bhagavad Gita, Rāmāyaṇa, and Mahābhārata in their 
              original language. Experience philosophy, science, and literature as they were meant 
              to be understood — without the filter of translation.
            </p>
          </div>
          <div className="why-item">
            <span className="why-icon">🧠</span>
            <h3>Sharpen Your Mind</h3>
            <p>
              Sanskrit&apos;s complex grammar — with eight cases, three genders, three numbers, and 
              ten verb classes — builds exceptional analytical thinking. Studies suggest it improves 
              memory, concentration, and linguistic ability.
            </p>
          </div>
          <div className="why-item">
            <span className="why-icon">🌍</span>
            <h3>Connect Languages</h3>
            <p>
              As a mother of Indo-European languages, knowing Sanskrit reveals connections between 
              Hindi, Bengali, Marathi, Latin, Greek, English, German, and dozens of modern tongues.
            </p>
          </div>
          <div className="why-item">
            <span className="why-icon">🕉️</span>
            <h3>Spiritual Depth</h3>
            <p>
              Understanding Sanskrit unlocks mantras, shlokas, stotras, and sacred chants in their
              true form — deepening meditation, yoga practice, and spiritual understanding.
            </p>
          </div>
        </div>
      </div>

      {/* Learning Path Overview */}
      <div className="card fade-in" style={{ animationDelay: '.25s' }}>
        <h2 style={{ textAlign: 'center' }}>Your Learning Path</h2>
        <div className="lotus-divider">❧</div>
        <div className="learning-path">
          <div className="path-step">
            <span className="path-num">1</span>
            <div>
              <h3>Master the Alphabet</h3>
              <p>
                Start with the <strong>Devanagari script</strong> — learn 13 vowels (स्वर) and 36 consonants 
                (व्यञ्जन). Sanskrit is perfectly phonetic: every letter has exactly one sound, and every 
                sound has exactly one letter. Once you know the alphabet, you can read any Sanskrit text aloud.
              </p>
            </div>
          </div>
          <div className="path-step">
            <span className="path-num">2</span>
            <div>
              <h3>Build Vocabulary</h3>
              <p>
                Learn essential words across categories — greetings, numbers, nature, and daily life. 
                Sanskrit words are built from <strong>dhātus</strong> (verbal roots), so learning one root 
                unlocks dozens of related words. For example, the root <em>√vid</em> (to know) gives us 
                <em>vidyā</em> (knowledge), <em>vidvān</em> (scholar), and <em>Veda</em> (sacred knowledge).
              </p>
            </div>
          </div>
          <div className="path-step">
            <span className="path-num">3</span>
            <div>
              <h3>Understand Grammar</h3>
              <p>
                Dive into Sanskrit&apos;s elegant grammar system — cases (विभक्ति), gender (लिङ्ग), 
                number (वचन), and verb conjugation (धातुरूप). Sanskrit word order is flexible because 
                case endings tell you exactly who does what — making it simultaneously precise and poetic.
              </p>
            </div>
          </div>
          <div className="path-step">
            <span className="path-num">4</span>
            <div>
              <h3>Test Your Knowledge</h3>
              <p>
                Take our <strong>20-question quiz</strong> covering alphabet recognition, vocabulary 
                translation, and grammar concepts. Get immediate feedback on each answer and track 
                your progress over time through the dashboard.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Cards */}
      <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>Explore the Modules</h2>
      <div className="modules-grid">
        <FeatureCard
          icon="🔤"
          title="Alphabet"
          description="Learn Devanagari vowels & consonants with pronunciation"
          href="/alphabet"
          delay=".3s"
        />
        <FeatureCard
          icon="📖"
          title="Vocabulary"
          description="Build your Sanskrit word bank across categories"
          href="/vocabulary"
          delay=".32s"
        />
        <FeatureCard
          icon="📜"
          title="Grammar"
          description="Master cases, gender, number & verb conjugation"
          href="/grammar"
          delay=".34s"
        />
        <FeatureCard
          icon="✅"
          title="Quiz"
          description="Test your knowledge with 20 questions"
          href="/quiz"
          delay=".36s"
        />
      </div>

      {/* Sanskrit Fun Facts */}
      <div className="card fade-in" style={{ animationDelay: '.38s', marginTop: '2rem' }}>
        <h2 style={{ textAlign: 'center' }}>Did You Know?</h2>
        <div className="lotus-divider">❧</div>
        <div className="facts-grid">
          <div className="fact-item">
            <strong>🔢 Oldest grammar ever written</strong>
            <p>Pāṇini&apos;s <em>Aṣṭādhyāyī</em> (c. 400 BCE) is the earliest known formal grammar of any language — predating Greek grammar by centuries.</p>
          </div>
          <div className="fact-item">
            <strong>💻 Computer-friendly language</strong>
            <p>NASA researcher Rick Briggs wrote in 1985 that Sanskrit is the most suitable natural language for computer processing, due to its unambiguous grammar.</p>
          </div>
          <div className="fact-item">
            <strong>📖 Largest body of literature</strong>
            <p>The Mahābhārata, written in Sanskrit, is the longest epic poem in the world — over 200,000 verses, roughly 10 times the length of the Iliad and Odyssey combined.</p>
          </div>
          <div className="fact-item">
            <strong>🌐 Mother of many languages</strong>
            <p>Hindi, Bengali, Marathi, Gujarati, Punjabi, Nepali, Sinhala, and many more languages directly descend from Sanskrit. Even English shares hundreds of cognates.</p>
          </div>
        </div>
      </div>

      {/* Quote */}
      <div className="card fade-in" style={{ animationDelay: '.42s', textAlign: 'center', marginTop: '2rem' }}>
        <blockquote className="sanskrit-quote">
          <span className="devanagari" style={{ fontSize: '1.4rem', color: 'var(--saffron)', display: 'block', marginBottom: '.4rem' }}>
            विद्या ददाति विनयं विनयाद् याति पात्रताम्।
          </span>
          <span className="devanagari" style={{ fontSize: '1.4rem', color: 'var(--saffron)', display: 'block', marginBottom: '.8rem' }}>
            पात्रत्वात् धनमाप्नोति धनात् धर्मं ततः सुखम्॥
          </span>
          <p style={{ fontStyle: 'italic', color: 'var(--text-dim)', fontSize: '1rem', marginBottom: '.2rem' }}>
            &ldquo;Education gives humility, humility gives worthiness, worthiness brings wealth, 
            wealth enables righteousness, and that leads to happiness.&rdquo;
          </p>
          <p style={{ color: 'var(--text-dim)', fontSize: '.85rem', marginBottom: 0 }}>
            — Hitopadesha
          </p>
        </blockquote>
      </div>

      <div className="lotus-divider" style={{ marginTop: '2.5rem' }}>
        ॥ सर्वे भवन्तु सुखिनः ॥
      </div>
    </div>
  );
}
