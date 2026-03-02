import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import CRM from './pages/CRM';
import { CRMProvider } from './context/CRMContext';

export default function App() {
  return (
    <CRMProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/crm" element={<CRM />} />
        </Routes>
      </Router>
    </CRMProvider>
  );
}
