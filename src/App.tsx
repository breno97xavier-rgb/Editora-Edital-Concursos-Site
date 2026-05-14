/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import './index.css';
import { Routes, Route } from 'react-router-dom';
import RootLayout from './layout';
import HomePage from './pages/HomePage';
import SobrePage from './pages/SobrePage';
import ContatoPage from './pages/ContatoPage';
import TesteBook3DPage from './pages/TesteBook3DPage';
import TesteCardsPage from './pages/TesteCardsPage';
import ApostilasPage from './pages/ApostilasPage';
import DetalheProdutoPage from './pages/ApostilaIndividualPage';
import LandingPage from './pages/LandingPage';
import TermosPage from './pages/TermosPage';
import PrivacidadePage from './pages/PrivacidadePage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <RootLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sobre" element={<SobrePage />} />
        <Route path="/contato" element={<ContatoPage />} />
        <Route path="/apostilas" element={<ApostilasPage />} />
        <Route path="/lp/:slug" element={<LandingPage />} />
        <Route path="/apostila/:slug" element={<DetalheProdutoPage />} />
        <Route path="/termos" element={<TermosPage />} />
        <Route path="/privacidade" element={<PrivacidadePage />} />
        <Route path="/teste-book3d" element={<TesteBook3DPage />} />
        <Route path="/teste-cards" element={<TesteCardsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </RootLayout>
  );
}
