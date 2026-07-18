import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoadingSpinner } from '../components/LoadingSpinner';
import styles from './Login.module.css';
import { clearPendingPayments } from '../lib/pendingPayments';

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        clearPendingPayments();
    }, []);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // Basic validation
        if (!formData.username || !formData.password) {
            setError('Please enter both username and password');
            return;
        }

        setIsLoading(true);

        try {
            // Simulate API call with a delay
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Check credentials (for demo purposes only - in production, this would be done server-side)
            if (formData.username === 'PrettyStephy' && formData.password === 'stephanie007') {
                // Redirect to verification page after successful login
                navigate('/verify');
            } else {
                setError('Invalid username or password');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
            console.error('Login error:', err);
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div className={styles.loginContainer}>
            <div className={styles.logoContainer}>
                <div className={styles.logoIcon}>
                    <img src="/assets/logo.svg" alt="First National Financial" className={styles.logoImage} />
                </div>
                <h1 className={styles.logoText}>First National Financial</h1>
            </div>

            <div className={styles.loginCard}>
                <h2 className={styles.loginTitle}>Secure Client Login</h2>

                <form className={styles.loginForm} onSubmit={handleSubmit}>
                    {error && (
                        <div className={styles.errorMessage}>
                            {error}
                        </div>
                    )}
                    <div className={styles.formGroup}>
                        <label htmlFor="username" className={styles.inputLabel}>Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            className={styles.inputField}
                            placeholder="Enter your username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <div className={styles.passwordHeader}>
                            <label htmlFor="password" className={styles.inputLabel}>Password</label>
                            <a href="#" className={styles.forgotPassword}>Forgot Password?</a>
                        </div>
                        <div className={styles.passwordInputContainer}>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                name="password"
                                className={`${styles.inputField} ${styles.passwordInput}`}
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                            <button
                                type="button"
                                className={styles.togglePassword}
                                onClick={togglePasswordVisibility}
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                            >
                                {showPassword ? (
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-4 .7l2.17 2.17c.57-.23 1.18-.37 1.83-.37zm-10-2.83L4.27 6.15 1.11 3l1.28-1.27 19.72 19.73-1.27 1.27-3.07-3.07c-1.42.9-3.04 1.57-4.77 1.92-5.21.88-9.55-2.43-10.44-7.08-.88-5.21 2.43-9.55 7.08-10.44 1.73-.35 3.35-.52 4.77.38L10.17 7c-.7-.18-1.43-.28-2.17-.28-2.76 0-5 2.24-5 5 0 .74.1 1.47.28 2.15L2.06 12c-.2-.64-.3-1.3-.3-2 0-1.17.26-2.29.7-3.33-1.49.7-2.81 1.63-3.9 2.77l-1.4-1.4c1.33-1.46 2.96-2.64 4.83-3.45z" fill="currentColor" />
                                    </svg>
                                ) : (
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 5C5.371 5 2 12 2 12s3.371 7 10 7 10-7 10-7-3.371-7-10-7zm0 11.25A4.25 4.25 0 1 1 16.25 12 4.26 4.26 0 0 1 12 16.25z" fill="currentColor" />
                                        <path d="M12 8.75A3.25 3.25 0 1 0 15.25 12 3.25 3.25 0 0 0 12 8.75z" fill="currentColor" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>

                    <button type="submit" className={styles.loginButton}>
                        Sign In Securely
                    </button>

                </form>

                <div className={styles.securityBadges}>
                    <div className={styles.badge}>
                        <span className={styles.badgeIcon}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" fill="#1a2c47" />
                            </svg>
                        </span>
                        <span>256-bit SSL Encryption</span>
                    </div>
                    <div className={styles.badge}>
                        <span className={styles.badgeIcon}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4.59-12.42L10 14.17l-2.59-2.58L6 13l4 4 8-8z" fill="#4CAF50" />
                            </svg>
                        </span>
                        <span>Trusted Worldwide</span>
                    </div>
                </div>

                <div className={styles.helpLink}>
                    <a href="#">Need Help?</a>
                </div>

                {isLoading && <LoadingSpinner />}
            </div>

            <footer className={styles.footer}>
                <div className={styles.footerContent}>
                    <div> 2024 First National Financial. All rights reserved.</div>
                    <div className={styles.footerLinks}>
                        <a href="#">Privacy Policy</a>
                        <span className={styles.divider}>|</span>
                        <a href="#">Terms of Service</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
