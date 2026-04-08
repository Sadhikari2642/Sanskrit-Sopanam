import './globals.css';
import Navbar from '../components/Navbar';
import Toast from '../components/Toast';

export const metadata = {
  title: 'Sanskrit Learning Portal — संस्कृतम्',
  description: 'Learn Sanskrit from scratch — alphabet, vocabulary, grammar, and quizzes. A modern interactive portal for the world\'s most refined classical language.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="page-wrap">
          {children}
        </main>
        <Toast />
      </body>
    </html>
  );
}
