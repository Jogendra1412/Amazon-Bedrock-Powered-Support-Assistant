
import { useState } from "react";
import "./Pages.css";
import {
  User,
  Bell,
  ShieldCheck,
  Palette,
  Database,
  Save,
  Camera,
  Check,
} from "lucide-react";
import "./Pages.css";

function Settings() {
  const [activeTab, setActiveTab] = useState("Profile");
  const [name, setName] = useState("Support Admin");
  const [email, setEmail] = useState("admin@assistai.com");
  const [role, setRole] = useState("Administrator");
  const [organization, setOrganization] = useState("AssistAI Workspace");
  const [saved, setSaved] = useState(false);

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    ticketUpdates: true,
    aiSuggestions: true,
    weeklyReport: false,
    twoFactor: true,
    activityLog: true,
  });

  const tabs = [
    { name: "Profile", icon: User },
    { name: "Notifications", icon: Bell },
    { name: "Security", icon: ShieldCheck },
    { name: "Appearance", icon: Palette },
    { name: "Workspace", icon: Database },
  ];

  const togglePreference = (key) => {
    setPreferences((previous) => ({
      ...previous,
      [key]: !previous[key],
    }));
    setSaved(false);
  };

  const handleSave = (event) => {
    event.preventDefault();
    setSaved(true);
  };

  return (
    <div className="workspace-page">
      <div className="workspace-heading">
        <div>
          <span className="workspace-eyebrow">PREFERENCES</span>
          <h1>Settings</h1>
          <p>Manage your account, workspace, and application preferences.</p>
        </div>
      </div>

      <div className="settings-layout">
        <aside className="settings-sidebar">
          <span className="settings-nav-label">GENERAL</span>

          {tabs.map((tab) => {
            const Icon = tab.icon;

            return (
              <button
                key={tab.name}
                className={`settings-nav-item ${activeTab === tab.name ? "settings-nav-active" : ""}`}
                onClick={() => {
                  setActiveTab(tab.name);
                  setSaved(false);
                }}
                type="button"
              >
                <Icon size={17} />
                {tab.name}
              </button>
            );
          })}
        </aside>

        <form className="settings-content" onSubmit={handleSave}>
          {activeTab === "Profile" && (
            <>
              <div className="settings-panel-heading">
                <div>
                  <h2>Profile Information</h2>
                  <p>Update your personal details and account information.</p>
                </div>
              </div>

              <div className="profile-avatar-section">
                <div className="profile-avatar-large">SA</div>
                <div>
                  <strong>Profile Picture</strong>
                  <p>Manage your workspace identity.</p>
                  <button className="secondary-action" type="button">
                    <Camera size={15} />
                    Change Avatar
                  </button>
                </div>
              </div>

              <div className="settings-form-grid">
                <label>
                  Full Name
                  <input value={name} onChange={(event) => setName(event.target.value)} />
                </label>

                <label>
                  Email Address
                  <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
                </label>

                <label>
                  Role
                  <input value={role} onChange={(event) => setRole(event.target.value)} />
                </label>

                <label>
                  Organization
                  <input value={organization} onChange={(event) => setOrganization(event.target.value)} />
                </label>
              </div>
            </>
          )}

          {activeTab === "Notifications" && (
            <>
              <div className="settings-panel-heading">
                <div>
                  <h2>Notification Preferences</h2>
                  <p>Choose which updates you want to receive.</p>
                </div>
              </div>

              <div className="settings-option-list">
                <SettingToggle
                  title="Email Notifications"
                  description="Receive important account updates by email."
                  checked={preferences.emailNotifications}
                  onChange={() => togglePreference("emailNotifications")}
                />

                <SettingToggle
                  title="Ticket Updates"
                  description="Get notified when support tickets change status."
                  checked={preferences.ticketUpdates}
                  onChange={() => togglePreference("ticketUpdates")}
                />

                <SettingToggle
                  title="AI Suggestions"
                  description="Receive updates about AI assistant recommendations."
                  checked={preferences.aiSuggestions}
                  onChange={() => togglePreference("aiSuggestions")}
                />

                <SettingToggle
                  title="Weekly Reports"
                  description="Receive a weekly summary of workspace activity."
                  checked={preferences.weeklyReport}
                  onChange={() => togglePreference("weeklyReport")}
                />
              </div>
            </>
          )}

          {activeTab === "Security" && (
            <>
              <div className="settings-panel-heading">
                <div>
                  <h2>Security Settings</h2>
                  <p>Manage account protection and security preferences.</p>
                </div>
              </div>

              <div className="security-status">
                <div className="security-status-icon">
                  <ShieldCheck size={23} />
                </div>
                <div>
                  <strong>Account Protection</strong>
                  <p>Review your security configuration.</p>
                </div>
                <span className="security-status-badge">Configured</span>
              </div>

              <div className="settings-option-list">
                <SettingToggle
                  title="Two-Factor Authentication"
                  description="Add an additional verification step to your account."
                  checked={preferences.twoFactor}
                  onChange={() => togglePreference("twoFactor")}
                />

                <SettingToggle
                  title="Activity Log"
                  description="Keep track of account activity and sign-in events."
                  checked={preferences.activityLog}
                  onChange={() => togglePreference("activityLog")}
                />
              </div>

              <div className="settings-info-box">
                Password management and authentication changes
                require backend authentication integration.
              </div>
            </>
          )}

          {activeTab === "Appearance" && (
            <>
              <div className="settings-panel-heading">
                <div>
                  <h2>Appearance</h2>
                  <p>Customize the look and feel of your workspace.</p>
                </div>
              </div>

              <div className="appearance-preview">
                <div className="appearance-preview-sidebar">
                  <div />
                  <div />
                  <div />
                </div>
                <div className="appearance-preview-main">
                  <div />
                  <div />
                  <div />
                  <div />
                </div>
              </div>

              <div className="settings-option-list">
                <div className="settings-option">
                  <div>
                    <strong>Color Theme</strong>
                    <p>AssistAI currently uses the dark workspace theme.</p>
                  </div>
                  <span className="theme-selected">Dark <Check size={13} /></span>
                </div>

                <div className="settings-option">
                  <div>
                    <strong>Accent Color</strong>
                    <p>Violet is used for primary actions and highlights.</p>
                  </div>
                  <span className="accent-swatch" />
                </div>
              </div>
            </>
          )}

          {activeTab === "Workspace" && (
            <>
              <div className="settings-panel-heading">
                <div>
                  <h2>Workspace Configuration</h2>
                  <p>Manage basic workspace information.</p>
                </div>
              </div>

              <div className="settings-form-grid">
                <label>
                  Workspace Name
                  <input value={organization} onChange={(event) => setOrganization(event.target.value)} />
                </label>

                <label>
                  Workspace Type
                  <select defaultValue="Support Workspace">
                    <option>Support Workspace</option>
                    <option>Development</option>
                    <option>Testing</option>
                  </select>
                </label>
              </div>

              <div className="settings-info-box">
                AWS Bedrock connection, model configuration,
                and knowledge base settings will be managed
                through the backend integration.
              </div>
            </>
          )}

          <div className="settings-save-row">
            <span className={saved ? "save-success" : "save-hint"}>
              {saved ? <><Check size={15} /> Changes saved locally</> : "Changes are stored in the current session only."}
            </span>

            <button className="primary-action" type="submit">
              <Save size={16} />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function SettingToggle({ title, description, checked, onChange }) {
  return (
    <div className="settings-option">
      <div>
        <strong>{title}</strong>
        <p>{description}</p>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        className={`toggle-switch ${checked ? "toggle-enabled" : ""}`}
        onClick={onChange}
      >
        <span />
      </button>
    </div>
  );
}

export default Settings;
