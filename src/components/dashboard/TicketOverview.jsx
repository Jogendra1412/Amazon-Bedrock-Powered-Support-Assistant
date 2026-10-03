import { ArrowUpRight } from "lucide-react";

const ticketData = [
  {
    id: "TKT-1042",
    subject: "Payment not processing",
    customer: "Rahul Sharma",
    status: "Open",
    priority: "High",
    date: "Today",
  },
  {
    id: "TKT-1041",
    subject: "Unable to access account",
    customer: "Priya Reddy",
    status: "In Progress",
    priority: "Medium",
    date: "Today",
  },
  {
    id: "TKT-1040",
    subject: "Refund request",
    customer: "Arjun Kumar",
    status: "Resolved",
    priority: "Low",
    date: "Yesterday",
  },
  {
    id: "TKT-1039",
    subject: "Application crashing",
    customer: "Sneha Rao",
    status: "Open",
    priority: "High",
    date: "Yesterday",
  },
];

export default function TicketOverview() {
  return (
    <section className="panel ticket-panel">
      <div className="panel-header">
        <div>
          <h3>Recent Tickets</h3>
          <p>Monitor customer support requests</p>
        </div>

        <button className="text-button">
          View all <ArrowUpRight size={15} />
        </button>
      </div>

      <div className="table-wrapper">
        <table className="ticket-table">
          <thead>
            <tr>
              <th>Ticket</th>
              <th>Customer</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {ticketData.map((ticket) => (
              <tr key={ticket.id}>
                <td>
                  <div className="ticket-subject">
                    <strong>{ticket.subject}</strong>
                    <small>{ticket.id}</small>
                  </div>
                </td>

                <td>{ticket.customer}</td>

                <td>
                  <span
                    className={`status-badge ${ticket.status
                      .toLowerCase()
                      .replace(" ", "-")}`}
                  >
                    {ticket.status}
                  </span>
                </td>

                <td>
                  <span
                    className={`priority ${ticket.priority.toLowerCase()}`}
                  >
                    <i />
                    {ticket.priority}
                  </span>
                </td>

                <td>{ticket.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}