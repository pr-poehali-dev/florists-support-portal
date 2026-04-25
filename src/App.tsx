import { useState } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HomePage from '@/pages/HomePage';
import CatalogPage from '@/pages/CatalogPage';
import AboutPage from '@/pages/AboutPage';
import ContactsPage from '@/pages/ContactsPage';
import FaqPage from '@/pages/FaqPage';
import ChatPage from '@/pages/ChatPage';

type Page = 'home' | 'catalog' | 'about' | 'contacts' | 'faq' | 'chat';

const App = () => {
  const [page, setPage] = useState<Page>('home');

  const navigate = (p: string) => {
    setPage(p as Page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showFooter = page !== 'chat';

  return (
    <TooltipProvider>
      <Toaster />
      <div className="min-h-screen bg-background">
        <Header activePage={page} onNavigate={navigate} />
        <main key={page} className="animate-fade-in">
          {page === 'home' && <HomePage onNavigate={navigate} />}
          {page === 'catalog' && <CatalogPage />}
          {page === 'about' && <AboutPage />}
          {page === 'contacts' && <ContactsPage />}
          {page === 'faq' && <FaqPage />}
          {page === 'chat' && <ChatPage />}
        </main>
        {showFooter && <Footer onNavigate={navigate} />}
      </div>
    </TooltipProvider>
  );
};

export default App;
