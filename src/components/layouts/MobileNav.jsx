import { NavLink } from "react-router-dom";

import {
  LayoutDashboard,
  MessageSquare,
  Ticket,
  BookOpen,
  Settings,
} from "lucide-react";

const items = [
  ["/dashboard", "Home", LayoutDashboard],
  ["/chat", "Chat", MessageSquare],
  ["/tickets", "Tickets", Ticket],
  ["/knowledge", "Library", BookOpen],
  ["/settings", "Settings", Settings],
];

export default function MobileNav() {
  return (
    <nav className="mobile-nav">
      {items.map(([to, label, Icon]) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            isActive ? "mobile-link active" : "mobile-link"
          }
        >
          <Icon size={19} />
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}