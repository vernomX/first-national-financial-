import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/Landing';
import LoginPage from './pages/Login';
import VerifyPage from './pages/Verify';
import DashboardPage from './pages/Dashboard';
import TransfersPage from './pages/Transfers';
import BillPayPage from './pages/BillPay';
import SettingsPage from './pages/Settings';
import SupportChat from './components/SupportChat';
import StatementsPage from './pages/Statements';
import DepositPage from './pages/Deposit';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/verify" element={<VerifyPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/transfers" element={<TransfersPage />} />
                <Route path="/billpay" element={<BillPayPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/statements" element={<StatementsPage />} />
                <Route path="/deposit" element={<DepositPage />} />
                {/* Fallback route */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            <SupportChat />
        </Router>
    );
}

export default App;
