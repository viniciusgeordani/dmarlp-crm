import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import CRM from './pages/CRM';
import Dashboard from './pages/Dashboard';
import Institutional from './pages/Institutional';
import { CRMProvider } from './context/CRMContext';

export default function App() {
  return (
    <CRMProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Institutional />} />
          <Route path="/lp" element={<LandingPage />} />
          <Route path="/admin-painel-crm-dmar" element={<CRM />} />
          <Route path="/admin-painel-crm-dmar/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>

    </CRMProvider>
  );
}
