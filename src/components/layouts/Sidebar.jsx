
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  MessageSquare,
  Ticket,
  BookOpen,
  Settings,
  Sparkles,
  X,
} from 'lucide-react';

const navigation = [
  {
    section: 'WORKSPACE',
    items: [
      {
        name: 'Dashboard',
        path: '/',
        icon: LayoutDashboard,
      },
      {
        name: 'AI Assistant',
        path: '/chat',
        icon: MessageSquare,
        badge: 'AI',
      },
      {
        name: 'Support Tickets',
        path: '/tickets',
        icon: Ticket,
      },
      {
        name: 'Knowledge Base',
        path: '/knowledge',
        icon: BookOpen,
      },
    ],
  },
  {
    section: 'PREFERENCES',
    items: [
      {
        name: 'Settings',
        path: '/settings',
        icon: Settings,
      },
    ],
  },
];

function Sidebar({ isOpen, onClose }) {
  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-brand">
        <div className="brand-icon">
          <Sparkles size={21} />
        </div>

        <div className="brand-name">
          Assist<span>AI</span>
        </div>

        <button
          className="icon-button sidebar-close"
          onClick={onClose}
          aria-label="Close sidebar"
        >
          <X size={18} />
        </button>
      </div>

      <div className="sidebar-content">
        {navigation.map((group) => (
          <div key={group.section}>
            <p className="sidebar-section-label">
              {group.section}
            </p>

            <nav className="sidebar-nav">
              {group.items.map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.path === '/'}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `sidebar-link ${isActive ? 'active' : ''}`
                    }
                  >
                    <Icon size={18} />

                    <span>{item.name}</span>

                    {item.badge && (
                      <span className="sidebar-badge">
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                );
              })}
            </nav>
          </div>
        ))}
      </div>

      <div className="sidebar-footer">
        <div className="sidebar-profile">
          <div className="profile-avatar">SA</div>

          <div className="profile-info">
            <div className="profile-name">
              Support Admin
            </div>

            <div className="profile-role">
              Administrator
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
