
import {
  Ticket,
  Clock3,
  CheckCircle2,
  MessageSquare,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Bot,
  UserRound,
  FileText,
  Activity,
} from 'lucide-react';

const stats = [
  {
    title: 'Total Tickets',
    value: '1,284',
    change: '+12.8%',
    description: 'Compared to last month',
    positive: true,
    icon: Ticket,
  },
  {
    title: 'Open Tickets',
    value: '248',
    change: '+5.2%',
    description: 'Currently awaiting resolution',
    positive: false,
    icon: Clock3,
  },
  {
    title: 'Resolved Tickets',
    value: '936',
    change: '+18.4%',
    description: 'Compared to last month',
    positive: true,
    icon: CheckCircle2,
  },
  {
    title: 'AI Conversations',
    value: '3,642',
    change: '+24.6%',
    description: 'Compared to last month',
    positive: true,
    icon: MessageSquare,
  },
];

const tickets = [
  {
    id: '#TK-1042',
    subject: 'Unable to access my account',
    customer: 'Rahul Sharma',
    priority: 'Urgent',
    status: 'Open',
    date: 'Oct 03, 2026',
  },
  {
    id: '#TK-1041',
    subject: 'Payment confirmation missing',
    customer: 'Priya Reddy',
    priority: 'Medium',
    status: 'Pending',
    date: 'Oct 03, 2026',
  },
  {
    id: '#TK-1040',
    subject: 'Request for account details',
    customer: 'Arjun Kumar',
    priority: 'Low',
    status: 'Resolved',
    date: 'Oct 02, 2026',
  },
  {
    id: '#TK-1039',
    subject: 'Application loading slowly',
    customer: 'Sneha Rao',
    priority: 'High',
    status: 'Open',
    date: 'Oct 02, 2026',
  },
  {
    id: '#TK-1038',
    subject: 'Unable to update profile',
    customer: 'Kiran Reddy',
    priority: 'Medium',
    status: 'Resolved',
    date: 'Oct 01, 2026',
  },
];

const activities = [
  {
    icon: CheckCircle2,
    text: 'Ticket #TK-1038 was marked as resolved',
    time: '12 minutes ago',
  },
  {
    icon: Bot,
    text: 'AI Assistant handled a customer query',
    time: '28 minutes ago',
  },
  {
    icon: UserRound,
    text: 'New customer Rahul Sharma submitted a ticket',
    time: '45 minutes ago',
  },
  {
    icon: FileText,
    text: 'Knowledge article was updated',
    time: '1 hour ago',
  },
];

function Dashboard() {
  return (
    <div className="dashboard-page">
      <section className="page-header">
        <div>
          <h1 className="page-heading">
            Welcome back, Admin <span>👋</span>
          </h1>

          <p className="page-description">
            Here's what's happening with your support workspace today.
          </p>
        </div>

        <div className="page-actions">
          <button className="btn btn-secondary">
            <Activity size={15} />
            View Reports
          </button>

          <button className="btn btn-primary">
            <Plus size={16} />
            New Ticket
          </button>
        </div>
      </section>

      <section className="stats-grid">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const TrendIcon = stat.positive
            ? ArrowUpRight
            : ArrowDownRight;

          return (
            <article className="stat-card" key={stat.title}>
              <div className="stat-top">
                <span className="stat-label">
                  {stat.title}
                </span>

                <div className="stat-icon">
                  <Icon size={18} />
                </div>
              </div>

              <div className="stat-value">
                {stat.value}
              </div>

              <div className="stat-footer">
                <span
                  className={
                    stat.positive
                      ? 'stat-trend'
                      : 'text-danger'
                  }
                >
                  <TrendIcon
                    size={13}
                    style={{
                      display: 'inline',
                      verticalAlign: 'middle',
                    }}
                  />
                  {' '}{stat.change}
                </span>

                <span>{stat.description}</span>
              </div>
            </article>
          );
        })}
      </section>

      <section className="dashboard-grid">
        <div className="card">
          <div className="card-header">
            <div>
              <h2 className="card-title">
                Recent Support Tickets
              </h2>

              <p className="card-description">
                Latest customer support requests
              </p>
            </div>

            <button className="btn btn-ghost">
              View all
              <ArrowUpRight size={14} />
            </button>
          </div>

          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>TICKET</th>
                  <th>CUSTOMER</th>
                  <th>PRIORITY</th>
                  <th>STATUS</th>
                </tr>
              </thead>

              <tbody>
                {tickets.map((ticket) => (
                  <tr key={ticket.id}>
                    <td>
                      <div className="table-primary">
                        {ticket.id}
                      </div>

                      <div className="text-muted">
                        {ticket.subject}
                      </div>
                    </td>

                    <td>{ticket.customer}</td>

                    <td>
                      <span
                        className={`priority-${ticket.priority.toLowerCase()}`}
                      >
                        {ticket.priority}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`status-badge status-${ticket.status.toLowerCase()}`}
                      >
                        {ticket.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="dashboard-column">
          <div className="card">
            <div className="card-header">
              <div>
                <h2 className="card-title">
                  Recent Activity
                </h2>

                <p className="card-description">
                  Latest workspace updates
                </p>
              </div>

              <Activity
                size={17}
                color="var(--text-muted)"
              />
            </div>

            <div className="card-body">
              <div className="activity-list">
                {activities.map((activity, index) => {
                  const Icon = activity.icon;

                  return (
                    <div
                      className="activity-item"
                      key={index}
                    >
                      <div className="activity-icon">
                        <Icon size={15} />
                      </div>

                      <div>
                        <div className="activity-text">
                          {activity.text}
                        </div>

                        <div className="activity-time">
                          {activity.time}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="card ai-promo">
            <div className="card-body">
              <div className="ai-promo-icon">
                <Bot size={22} />
              </div>

              <h3 className="ai-promo-title">
                Meet your AI Assistant
              </h3>

              <p className="ai-promo-description">
                Get intelligent answers, automate support
                workflows, and assist customers faster.
              </p>

              <button
                className="btn btn-primary w-full"
                onClick={() => {
                  window.location.href = '/chat';
                }}
              >
                <MessageSquare size={15} />
                Start a conversation
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
