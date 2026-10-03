import {
  TrendingUp,
  TrendingDown,
} from "lucide-react";

export default function StatCard({
  title,
  value,
  change,
  description,
  icon: Icon,
  trend = "up",
}) {
  return (
    <div className="stat-card">
      <div className="stat-card-top">
        <div className="stat-icon">
          <Icon size={21} />
        </div>

        <span
          className={`stat-trend ${
            trend === "up" ? "positive" : "negative"
          }`}
        >
          {trend === "up" ? (
            <TrendingUp size={14} />
          ) : (
            <TrendingDown size={14} />
          )}

          {change}
        </span>
      </div>

      <div className="stat-value">
        {value}
      </div>

      <div className="stat-title">
        {title}
      </div>

      <p className="stat-description">
        {description}
      </p>
    </div>
  );
}