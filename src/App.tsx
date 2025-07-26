import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import AccountDetailPage from './pages/AccountDetailPage';
import CaseDetailPage from './pages/CaseDetailPage';
import CasesPage from './pages/CasesPage';
import DashboardPage from './pages/DashboardPage';
import ModelMetricsPage from './pages/ModelMetricsPage';
import ReportsPage from './pages/ReportsPage';
import SuspiciousAccountsPage from './pages/SuspiciousAccountsPage';
import SuspiciousTransactionsPage from './pages/SuspiciousTransactionsPage';
import TransactionDetailPage from './pages/TransactionDetailPage';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/metrics" element={<ModelMetricsPage />} />
          <Route
            path="/transactions"
            element={<SuspiciousTransactionsPage />}
          />
          <Route
            path="/transactions/:transactionId"
            element={<TransactionDetailPage />}
          />
          <Route path="/accounts" element={<SuspiciousAccountsPage />} />
          <Route path="/accounts/:accountId" element={<AccountDetailPage />} />
          <Route path="/cases" element={<CasesPage />} />
          <Route path="/cases/:caseId" element={<CaseDetailPage />} />
          <Route path="/reports" element={<ReportsPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
