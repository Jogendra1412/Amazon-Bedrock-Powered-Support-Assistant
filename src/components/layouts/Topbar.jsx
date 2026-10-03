
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Menu,
  Sun,
  Moon,
  Bell,
  Search,
} from 'lucide-react';

const pageDetails = {
  '/': {
    title: 'Dashboard',
    subtitle: 'Your support operations at a glance',
  },
  '/chat': {
    title: 'AI Assistant',
    subtitle: 'Interact with your intelligent support assistant',
  },
  '/tickets': {
    title: 'Support Tickets',
    subtitle: 'Manage and track customer requests',
  },
  '/knowledge': {
    title: 'Knowledge Base',
    subtitle: 'Explore your support resources',
  },
  '/settings': {
    title: 'Settings',
    subtitle: 'Manage your workspace preferences',
  },
};

function Topbar({ onMenuClick }) {
  const location = useLocation();

  const [theme, setTheme] = useState(
    () => localStorage.getItem('assistai-theme') || 'dark'
  );

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('assistai-theme', theme);
  }, [theme]);

  const currentPage =
    pageDetails[location.pathname] || pageDetails['/'];

  const toggleTheme = () => {
    setTheme((previous) =>
      previous === 'dark' ? 'light' : 'dark'
    );
  };

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button
          className="icon-button menu-toggle"
          onClick={onMenuClick}
          aria-label="Open navigation"
        >
          <Menu size={20} />
        </button>

        <div>
          <div className="topbar-title">
            {currentPage.title}
          </div>

          <div className="topbar-subtitle">
            {currentPage.subtitle}
          </div>
        </div>
      </div>

      <div className="topbar-actions">
        <div className="topbar-search">
          <Search size={15} />

          <input
            type="text"
            placeholder="Search workspace..."
            aria-label="Search workspace"
          />

          <span className="text-muted">⌘ K</span>
        </div>

        <button
          className="icon-button"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          title="Toggle theme"
        >
          {theme === 'dark' ? (
            <Sun size={18} />
          ) : (
            <Moon size={18} />
          )}
        </button>

        <button
          className="icon-button"
          aria-label="Notifications"
          title="Notifications"
        >
          <Bell size={18} />
        </button>
      </div>
    </header>
  );
}

export default Topbar;
