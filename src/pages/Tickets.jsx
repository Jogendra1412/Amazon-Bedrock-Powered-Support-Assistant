
import { useMemo, useState } from "react";
import "./Pages.css";
import {
  Plus,
  Search,
  SlidersHorizontal,
  Ticket,
  Clock3,
  CheckCircle2,
  AlertCircle,
  MoreHorizontal,
  X,
  CalendarDays,
} from "lucide-react";
import "./Pages.css";

const initialTickets = [
  { id: "TK-1042", title: "Unable to access my account", customer: "Rahul Sharma", category: "Account", priority: "Urgent", status: "Open", date: "Oct 03, 2026" },
  { id: "TK-1041", title: "Payment confirmation missing", customer: "Priya Reddy", category: "Billing", priority: "Medium", status: "Pending", date: "Oct 02, 2026" },
  { id: "TK-1040", title: "Request for account details", customer: "Arjun Kumar", category: "Account", priority: "Low", status: "Resolved", date: "Oct 02, 2026" },
  { id: "TK-1039", title: "Application loading slowly", customer: "Sneha Rao", category: "Technical", priority: "High", status: "Open", date: "Oct 01, 2026" },
  { id: "TK-1038", title: "Unable to update profile", customer: "Kiran Reddy", category: "Account", priority: "Medium", status: "Resolved", date: "Oct 01, 2026" },
  { id: "TK-1037", title: "Subscription renewal query", customer: "Ananya Das", category: "Billing", priority: "High", status: "Pending", date: "Sep 30, 2026" },
];

function Tickets() {
  const [tickets, setTickets] = useState(initialTickets);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("Technical");
  const [newPriority, setNewPriority] = useState("Medium");

  const filteredTickets = useMemo(() => {
    return tickets.filter((ticket) => {
      const matchesSearch =
        `${ticket.id} ${ticket.title} ${ticket.customer}`
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || ticket.status === statusFilter;

      const matchesPriority =
        priorityFilter === "All" || ticket.priority === priorityFilter;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [tickets, search, statusFilter, priorityFilter]);

  const counts = {
    total: tickets.length,
    open: tickets.filter((t) => t.status === "Open").length,
    pending: tickets.filter((t) => t.status === "Pending").length,
    resolved: tickets.filter((t) => t.status === "Resolved").length,
  };

  const createTicket = (event) => {
    event.preventDefault();

    if (!newTitle.trim()) return;

    const ticket = {
      id: `TK-${1043 + tickets.length - initialTickets.length}`,
      title: newTitle.trim(),
      customer: "Workspace User",
      category: newCategory,
      priority: newPriority,
      status: "Open",
      date: "Today",
    };

    setTickets((previous) => [ticket, ...previous]);
    setNewTitle("");
    setShowModal(false);
  };

  const updateStatus = (id, status) => {
    setTickets((previous) =>
      previous.map((ticket) =>
        ticket.id === id ? { ...ticket, status } : ticket
      )
    );
  };

  return (
    <div className="workspace-page">
      <div className="workspace-heading">
        <div>
          <span className="workspace-eyebrow">SUPPORT MANAGEMENT</span>
          <h1>Support Tickets</h1>
          <p>Track, organize, and manage customer support requests.</p>
        </div>

        <button
          className="primary-action"
          onClick={() => setShowModal(true)}
          type="button"
        >
          <Plus size={17} />
          Create Ticket
        </button>
      </div>

      <div className="ticket-stats">
        <div className="ticket-stat-card">
          <div className="ticket-stat-icon purple"><Ticket size={19} /></div>
          <span>Total Tickets</span>
          <strong>{counts.total}</strong>
          <small>All support requests</small>
        </div>

        <div className="ticket-stat-card">
          <div className="ticket-stat-icon blue"><AlertCircle size={19} /></div>
          <span>Open</span>
          <strong>{counts.open}</strong>
          <small>Awaiting action</small>
        </div>

        <div className="ticket-stat-card">
          <div className="ticket-stat-icon orange"><Clock3 size={19} /></div>
          <span>Pending</span>
          <strong>{counts.pending}</strong>
          <small>In progress</small>
        </div>

        <div className="ticket-stat-card">
          <div className="ticket-stat-icon green"><CheckCircle2 size={19} /></div>
          <span>Resolved</span>
          <strong>{counts.resolved}</strong>
          <small>Successfully completed</small>
        </div>
      </div>

      <section className="workspace-panel">
        <div className="panel-heading">
          <div>
            <h2>All Support Requests</h2>
            <p>View and manage customer issues</p>
          </div>

          <span className="result-count">
            {filteredTickets.length} tickets
          </span>
        </div>

        <div className="ticket-toolbar">
          <div className="workspace-search">
            <Search size={17} />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search tickets or customers..."
            />
          </div>

          <div className="filter-control">
            <SlidersHorizontal size={16} />
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
            >
              <option value="All">All statuses</option>
              <option value="Open">Open</option>
              <option value="Pending">Pending</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>

          <div className="filter-control">
            <select
              value={priorityFilter}
              onChange={(event) => setPriorityFilter(event.target.value)}
            >
              <option value="All">All priorities</option>
              <option value="Urgent">Urgent</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>

        <div className="table-scroll">
          <table className="workspace-table">
            <thead>
              <tr>
                <th>TICKET</th>
                <th>CUSTOMER</th>
                <th>CATEGORY</th>
                <th>PRIORITY</th>
                <th>STATUS</th>
                <th>CREATED</th>
                <th>ACTION</th>
              </tr>
            </thead>

            <tbody>
              {filteredTickets.map((ticket) => (
                <tr key={ticket.id}>
                  <td>
                    <strong className="ticket-id">{ticket.id}</strong>
                    <span className="ticket-description">{ticket.title}</span>
                  </td>
                  <td>{ticket.customer}</td>
                  <td>{ticket.category}</td>
                  <td>
                    <span className={`priority-tag priority-${ticket.priority.toLowerCase()}`}>
                      {ticket.priority}
                    </span>
                  </td>
                  <td>
                    <select
                      className={`status-select status-${ticket.status.toLowerCase()}`}
                      value={ticket.status}
                      onChange={(event) =>
                        updateStatus(ticket.id, event.target.value)
                      }
                      aria-label={`Status for ${ticket.id}`}
                    >
                      <option value="Open">Open</option>
                      <option value="Pending">Pending</option>
                      <option value="Resolved">Resolved</option>
                    </select>
                  </td>
                  <td>
                    <span className="date-cell">
                      <CalendarDays size={14} />
                      {ticket.date}
                    </span>
                  </td>
                  <td>
                    <button className="table-icon-button" type="button" title="More actions">
                      <MoreHorizontal size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredTickets.length === 0 && (
            <div className="empty-state">
              <Search size={25} />
              <strong>No tickets found</strong>
              <p>Try changing your search or filters.</p>
            </div>
          )}
        </div>
      </section>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <form
            className="workspace-modal"
            onSubmit={createTicket}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="modal-heading">
              <div>
                <h2>Create Support Ticket</h2>
                <p>Add a new customer support request.</p>
              </div>
              <button type="button" className="table-icon-button" onClick={() => setShowModal(false)}>
                <X size={19} />
              </button>
            </div>

            <label>
              Issue title
              <input
                required
                value={newTitle}
                onChange={(event) => setNewTitle(event.target.value)}
                placeholder="Describe the issue..."
              />
            </label>

            <label>
              Category
              <select value={newCategory} onChange={(event) => setNewCategory(event.target.value)}>
                <option>Technical</option>
                <option>Account</option>
                <option>Billing</option>
                <option>General</option>
              </select>
            </label>

            <label>
              Priority
              <select value={newPriority} onChange={(event) => setNewPriority(event.target.value)}>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
                <option>Urgent</option>
              </select>
            </label>

            <div className="modal-actions">
              <button type="button" className="secondary-action" onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button type="submit" className="primary-action">
                <Plus size={16} />
                Create Ticket
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Tickets;
