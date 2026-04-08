import Link from 'next/link';

export default function FeatureCard({ icon, title, description, href, delay }) {
  return (
    <Link href={href} className="module-card fade-in" style={{ animationDelay: delay || '0s', textDecoration: 'none' }}>
      <span className="mod-icon">{icon}</span>
      <h3>{title}</h3>
      <p>{description}</p>
    </Link>
  );
}
