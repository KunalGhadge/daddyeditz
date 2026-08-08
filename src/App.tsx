import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Home from '@/pages/Home';

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* We will add Service Pages here next */}
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
