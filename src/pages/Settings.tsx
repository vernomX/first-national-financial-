import { useState } from 'react';
import { FiEdit2, FiChevronRight, FiBell, FiShield, FiLock, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import { Switch } from '../components/windsurf/Switch';
import Sidebar from '../components/Sidebar';

interface FormData {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState('profile');
    const [formData, setFormData] = useState<FormData>({
        fullName: 'Stephanie Kennedy',
        email: 'stephkennedy42@gmail.com',
        phone: '+1 864 341 9710',
        address: '920 W Wolfram St APT 4, Chicago, IL 60657',
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const [notifications, setNotifications] = useState({
        transactionAlerts: true,
        promotionalOffers: false,
        securityUpdates: true,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleNotificationChange = (name: string) => {
        setNotifications(prev => ({
            ...prev,
            [name]: !prev[name as keyof typeof notifications]
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission
        console.log('Form submitted:', formData);
    };

    return (
        <div className="app-shell" style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f6f4ef' }}>
            <Sidebar />
            <div className="app-main settings-page" style={{
                marginLeft: '240px',
                flex: 1,
                padding: '32px',
                maxWidth: 'calc(100% - 240px)'
            }}>
                <div className="settings-container">
                    <div className="settings-header">
                        <h1>Settings</h1>
                        <p>Manage your account preferences and security settings</p>
                    </div>

                    <div className="settings-content">
                        {/* Profile Information Card */}
                        <div className="settings-card">
                            <div className="card-header">
                                <div className="header-content">
                                    <h2>Profile Information</h2>
                                    <p>Manage your personal details.</p>
                                </div>
                                <button className="edit-button">
                                    <FiEdit2 size={16} />
                                    <span>Edit</span>
                                </button>
                            </div>

                            <div className="profile-details">
                                <div className="detail-item">
                                    <span className="detail-label">Full Name</span>
                                    <div className="detail-value">
                                        <FiMail className="detail-icon" />
                                        <span>{formData.fullName}</span>
                                    </div>
                                </div>

                                <div className="detail-item">
                                    <span className="detail-label">Email Address</span>
                                    <div className="detail-value">
                                        <FiMail className="detail-icon" />
                                        <span>{formData.email}</span>
                                    </div>
                                </div>

                                <div className="detail-item">
                                    <span className="detail-label">Phone Number</span>
                                    <div className="detail-value">
                                        <FiPhone className="detail-icon" />
                                        <span>{formData.phone}</span>
                                    </div>
                                </div>

                                <div className="detail-item">
                                    <span className="detail-label">Address</span>
                                    <div className="detail-value">
                                        <FiMapPin className="detail-icon" />
                                        <span>{formData.address}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Notification Preferences Card */}
                        <div className="settings-card">
                            <div className="card-header">
                                <div className="header-content">
                                    <h2>Notification Preferences</h2>
                                    <p>Manage how you receive alerts.</p>
                                </div>
                            </div>

                            <div className="notification-item">
                                <div className="notification-content">
                                    <h3>Transaction Alerts</h3>
                                    <p>Receive alerts for withdrawals.</p>
                                </div>
                                <Switch
                                    checked={notifications.transactionAlerts}
                                    onCheckedChange={() => handleNotificationChange('transactionAlerts')}
                                    className="flex-shrink-0"
                                />
                            </div>

                            <div className="notification-item">
                                <div className="notification-content">
                                    <h3>Promotional Offers</h3>
                                    <p>Get news and special offers.</p>
                                </div>
                                <Switch
                                    checked={notifications.promotionalOffers}
                                    onCheckedChange={() => handleNotificationChange('promotionalOffers')}
                                    className="flex-shrink-0"
                                />
                            </div>

                            <div className="notification-item">
                                <div className="notification-content">
                                    <h3>Security Updates</h3>
                                    <p>Important security notices.</p>
                                </div>
                                <Switch
                                    checked={notifications.securityUpdates}
                                    onCheckedChange={() => handleNotificationChange('securityUpdates')}
                                    className="flex-shrink-0"
                                />
                            </div>
                        </div>

                        {/* Change Password Card */}
                        <div className="settings-card">
                            <div className="card-header">
                                <div className="header-content">
                                    <h2>Change Password</h2>
                                    <p>For your security, we recommend using a strong, unique password.</p>
                                </div>
                            </div>

                            <div className="form-group grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="input-field">
                                    <label>Current Password</label>
                                    <div className="input-with-icon">
                                        <FiLock className="input-icon" />
                                        <input
                                            type="password"
                                            name="currentPassword"
                                            value={formData.currentPassword}
                                            onChange={handleInputChange}
                                            className="form-input"
                                            placeholder="Enter current password"
                                        />
                                    </div>
                                </div>

                                <div className="md:col-start-1">
                                    <div className="input-field">
                                        <label>New Password</label>
                                        <div className="input-with-icon">
                                            <FiLock className="input-icon" />
                                            <input
                                                type="password"
                                                name="newPassword"
                                                value={formData.newPassword}
                                                onChange={handleInputChange}
                                                className="form-input"
                                                placeholder="Enter new password"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="input-field">
                                    <label>Confirm New Password</label>
                                    <div className="input-with-icon">
                                        <FiLock className="input-icon" />
                                        <input
                                            type="password"
                                            name="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={handleInputChange}
                                            className="form-input"
                                            placeholder="Confirm new password"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="password-button-container">
                                <button type="button" className="update-password-btn">
                                    Update Password
                                </button>
                            </div>
                        </div>

                        {/* Security Card */}
                        <div className="settings-card">
                            <div className="card-header">
                                <div className="header-content">
                                    <h2>Security</h2>
                                    <p>Enhance your account security.</p>
                                </div>
                            </div>

                            <div className="security-item">
                                <div className="security-content">
                                    <h3>Two-Factor Authentication</h3>
                                    <p>Enabled</p>
                                </div>
                                <button className="manage-button">
                                    Manage <FiChevronRight />
                                </button>
                            </div>

                            <div className="security-item">
                                <div className="security-content">
                                    <h3>Biometric Login</h3>
                                    <p>Disabled</p>
                                </div>
                                <button className="manage-button">
                                    Configure <FiChevronRight />
                                </button>
                            </div>

                            <div className="security-item">
                                <div className="security-content">
                                    <h3>Login History</h3>
                                    <p>Review recent account activity</p>
                                </div>
                                <button className="manage-button">
                                    View <FiChevronRight />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
          margin: 0;
          padding: 0;
          background-color: #f6f4ef;
        }
        
        .settings-container {
          max-width: 100%;
          margin: 0 auto;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }

        .settings-header {
          margin-bottom: 32px;
        }

        .settings-header h1 {
          font-size: 24px;
          font-weight: 600;
          color: #1e293b;
          margin: 0 0 4px 0;
          line-height: 1.3;
        }

        .settings-header p {
          font-size: 14px;
          color: #64748b;
          margin: 0;
          font-weight: 400;
          line-height: 1.5;
        }

        .settings-content {
          display: flex;
          flex-direction: column;
          gap: 24px;
          max-width: 900px;
          margin: 0 auto;
        }

        .settings-card {
          background: white;
          border-radius: 12px;
          padding: 20px 24px;
          box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
          border: 1px solid #e2e8f0;
          margin-bottom: 24px;
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 24px;
        }

        .header-content h2 {
          font-size: 16px;
          font-weight: 600;
          color: #1e293b;
          margin: 0 0 2px 0;
          line-height: 1.4;
        }

        .header-content p {
          font-size: 13px;
          color: #64748b;
          margin: 0;
          font-weight: 400;
          line-height: 1.5;
        }

        .edit-button {
          display: flex;
          align-items: center;
          gap: 6px;
          background: transparent;
          border: 1px solid #e2e8f0;
          border-radius: 6px;
          padding: 5px 10px;
          font-size: 13px;
          font-weight: 500;
          color: #3b82f6;
          cursor: pointer;
          transition: all 0.15s ease;
          height: 32px;
        }

        .edit-button:hover {
          background: #f1f5f9;
          border-color: #cbd5e1;
        }

        .profile-details {
          display: flex;
          flex-direction: column;
          gap: 20px;
          padding: 4px 0;
        }

        .detail-item {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .detail-label {
          font-size: 13px;
          font-weight: 500;
          color: #64748b;
          margin-bottom: 2px;
        }

        .detail-value {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 14px;
          color: #1e293b;
          padding: 10px 0;
          border-bottom: 1px solid #f1f5f9;
        }

        .detail-icon {
          color: #94a3b8;
          flex-shrink: 0;
        }

        .form-group {
          display: grid;
          gap: 16px;
          margin-bottom: 24px;
        }

        .input-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .input-field label {
          font-size: 13px;
          font-weight: 500;
          color: #475569;
          margin-bottom: 4px;
        }

        .input-with-icon {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-icon {
          position: absolute;
          left: 12px;
          color: #94a3b8;
        }

        .form-input {
          width: 100%;
          padding: 8px 12px 8px 36px;
          border: 1px solid #e2e8f0;
          border-radius: 6px;
          font-size: 14px;
          color: #1e293b;
          height: 40px;
          transition: all 0.15s ease;
        }
        
        .form-input::placeholder {
          color: #94a3b8;
          font-weight: 400;
        }

        .form-input:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
        }

        .password-button-container {
          display: flex;
          justify-content: flex-end;
          margin-top: 8px;
        }

        .update-password-btn {
          background: #4F46E5;
          color: white;
          border: none;
          border-radius: 6px;
          padding: 10px 24px;
          font-size: 14px;
          font-weight: 500;
          height: 40px;
          cursor: pointer;
          transition: all 0.2s ease;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 160px;
        }

        .update-password-btn:hover {
          background: #4338CA;
        }

        .update-password-btn:active {
          transform: translateY(1px);
        }

        @media (max-width: 640px) {
          .password-button-container {
            justify-content: stretch;
          }
          
          .update-password-btn {
            width: 100%;
          }
        }

        .notification-item, .security-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 0;
          border-bottom: 1px solid #f1f5f9;
        }

        .notification-item:last-child, .security-item:last-child {
          border-bottom: none;
        }

        .notification-content h3, .security-content h3 {
          font-size: 14px;
          font-weight: 500;
          color: #1e293b;
          margin: 0 0 2px 0;
        }

        .notification-content p, .security-content p {
          font-size: 12px;
          color: #64748b;
          margin: 0;
          font-weight: 400;
        }

        .manage-button {
          display: flex;
          align-items: center;
          gap: 4px;
          background: transparent;
          border: none;
          color: #3b82f6;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          padding: 6px 0 6px 12px;
          transition: color 0.15s ease;
        }
        
        .manage-button:hover {
          color: #2563eb;
        }

        @media (max-width: 768px) {
          .settings-container {
            padding: 16px;
          }
          
          .settings-card {
            padding: 20px 16px;
          }
          
          .card-header {
            flex-direction: column;
            gap: 12px;
            align-items: flex-start;
          }
          
          .edit-button {
            margin-top: 8px;
          }
          
          .notification-item, .security-item {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }
          
          .notification-item > div:last-child, 
          .security-item > div:last-child {
            align-self: flex-end;
          }
        }
      `}</style>
        </div>
    );
}
