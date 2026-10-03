
import { Navigate, Route, Routes } from 'react-router-dom';

import MainLayout from './components/layouts/MainLayout';

import Dashboard from './pages/Dashboard';
import Chat from './pages/Chat';
import Tickets from './pages/Tickets';
import KnowledgeBase from './pages/KnowledgeBase';
import Settings from './pages/Settings';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="chat" element={<Chat />} />
        <Route path="tickets" element={<Tickets />} />
        <Route path="knowledge" element={<KnowledgeBase />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
