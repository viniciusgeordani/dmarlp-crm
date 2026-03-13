import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import CRM from './pages/CRM';
import Dashboard from './pages/Dashboard';
import Institutional from './pages/Institutional';
import Gallery from './pages/Gallery';
import { CRMProvider } from './context/CRMContext';

export default function App() {
  return (
    <CRMProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Institutional />} />
          <Route path="/galeria" element={<Gallery />} />
          <Route path="/lp" element={<LandingPage />} />
          <Route path="/admin-painel-crm-dmar" element={<CRM />} />
          <Route path="/admin-painel-crm-dmar/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>

    </CRMProvider>
  );
}
