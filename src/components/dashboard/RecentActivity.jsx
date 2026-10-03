import {
  MessageSquare,
  Ticket,
  CheckCircle2,
  UserPlus,
} from "lucide-react";

const activities = [
  {
    id: 1,
    icon: MessageSquare,
    title: "New AI conversation",
    description: "Customer asked about account access",
    time: "2 minutes ago",
    color: "violet",
  },
  {
    id: 2,
    icon: Ticket,
    title: "Ticket #TKT-1042 created",
    description: "Payment issue reported",
    time: "18 minutes ago",
    color: "blue",
  },
  {
    id: 3,
    icon: CheckCircle2,
    title: "Ticket resolved",
    description: "Password reset request completed",
    time: "1 hour ago",
    color: "green",
  },
  {
    id: 4,
    icon: UserPlus,
    title: "New customer registered",
    description: "A new user joined the platform",
    time: "3 hours ago",
    color: "orange",
  },
];

export default function RecentActivity() {
  return (
    <section className="panel">
      <div className="panel-header">
        <div>
          <h3>Recent Activity</h3>
          <p>Latest workspace updates</p>
        </div>

        <button className="text-button">
          View all
        </button>
      </div>

      <div className="activity-list">
        {activities.map((activity) => {
          const Icon = activity.icon;

          return (
            <div
              className="activity-item"
              key={activity.id}
            >
              <div
                className={`activity-icon ${activity.color}`}
              >
                <Icon size={17} />
              </div>

              <div className="activity-content">
                <strong>{activity.title}</strong>

                <p>{activity.description}</p>
              </div>

              <span className="activity-time">
                {activity.time}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}