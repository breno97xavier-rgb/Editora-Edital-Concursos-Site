/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import '../app/globals.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RootLayout from '../app/layout';
import HomePage from '../app/page';
import SobrePage from '../app/sobre/SobrePage';
import ContatoPage from '../app/contato/ContatoPage';
import TesteBook3DPage from '../app/teste-book3d/page';
import TesteCardsPage from '../app/teste-cards/page';
import ApostilasPage from '../app/apostilas/page';
import DetalheProdutoPage from '../app/apostila/DetalheProdutoPage';
import LandingPage from '../app/lp/LandingPage';

export default function App() {
  return (
    <BrowserRouter>
      <RootLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sobre" element={<SobrePage />} />
          <Route path="/contato" element={<ContatoPage />} />
          <Route path="/apostilas" element={<ApostilasPage />} />
          <Route path="/lp/:slug" element={<LandingPage />} />
          <Route path="/apostila/:slug" element={<DetalheProdutoPage />} />
          <Route path="/teste-book3d" element={<TesteBook3DPage />} />
          <Route path="/teste-cards" element={<TesteCardsPage />} />
        </Routes>
      </RootLayout>
    </BrowserRouter>
  );
}
