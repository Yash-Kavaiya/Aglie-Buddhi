/**
 * Main App component with routing
 * Requirements: 1.1, 1.3, 11.2
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { DashboardPage } from './pages/DashboardPage';
import { AgentPage } from './pages/AgentPage';
import { ChatProvider } from './context/ChatContext';
import { MCPProvider } from './context/MCPContext';

/**
 * NotFoundPage component - Displays 404 message and redirects to dashboard
 */
function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-6" data-testid="not-found-page">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
      <p className="text-gray-600 mb-6">Page not found</p>
      <a 
        href="/" 
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Return to Dashboard
      </a>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <MCPProvider>
        <ChatProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/agent/:agentId" element={<AgentPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Layout>
        </ChatProvider>
      </MCPProvider>
    </BrowserRouter>
  );
}

export default App;
