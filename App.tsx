import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Live from './pages/Live';
import Schedule from './pages/Schedule';
import Library from './pages/Library';
import NewsDetail from './pages/NewsDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import Search from './pages/Search';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <HashRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/live" element={<Live />} />
              <Route path="/schedule" element={<Schedule />} />
              <Route path="/library" element={<Library />} />
              <Route path="/news/:id" element={<NewsDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/search" element={<Search />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Layout>
        </HashRouter>
      </ThemeProvider>
    </LanguageProvider>
  );
};

export default App;