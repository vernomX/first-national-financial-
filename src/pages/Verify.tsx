import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

export default function LoginVerification() {
    const navigate = useNavigate();
    const [code, setCode] = useState(['', '', '', '', '', '']);
    const [isLoading, setIsLoading] = useState(false);
    const [countdown, setCountdown] = useState(60);
    const [error, setError] = useState('');
    const [isResending, setIsResending] = useState(false);
    const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
    const countdownRef = useRef<NodeJS.Timeout>();

    // List of valid verification codes
    const VALID_CODES = [
        '242172',
        '086542',
        '654326',
        '679932',
        '572178',
        '341922',
        '186922',
        '020225',
        '441215',
        '089221',
        '867111',
        '009922',
        '256221'
    ];

    // Start countdown timer
    useEffect(() => {
        if (countdown > 0) {
            countdownRef.current = setTimeout(() => setCountdown(countdown - 1), 1000);
        }
        return () => {
            if (countdownRef.current) {
                clearTimeout(countdownRef.current);
            }
        };
    }, [countdown]);

    // Handle code input
    const handleCodeChange = (index: number, value: string) => {
        if (value && !/^\d*$/.test(value)) return;

        const newCode = [...code];
        newCode[index] = value.slice(-1);
        setCode(newCode);

        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        } else if (index === 5 && value) {
            handleVerify(newCode.join(''));
        }

        if (error) setError('');
    };

    // Handle backspace
    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !code[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    // Handle verification
    const handleVerify = async (verificationCode: string) => {
        if (verificationCode.length !== 6) return;

        setIsLoading(true);
        setError('');

        try {
            // Simulate API verification delay
            await new Promise(resolve => setTimeout(resolve, 800));

            // Check if the code is in our valid codes list
            const isValidCode = VALID_CODES.includes(verificationCode);

            if (isValidCode) {
                // Redirect to dashboard on successful verification
                navigate('/dashboard');
            } else {
                setError('Invalid verification code. Please try again.');
                // Clear all inputs on error
                setCode(['', '', '', '', '', '']);
                inputRefs.current[0]?.focus();
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
            console.error('Verification error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    // Handle resend code
    const handleResendCode = async () => {
        if (countdown > 0) return;

        setIsResending(true);
        try {
            // Simulate API call to resend code
            await new Promise(resolve => setTimeout(resolve, 800));
            setCountdown(60);
            setCode(['', '', '', '', '', '']);
            inputRefs.current[0]?.focus();
        } catch (err) {
            console.error('Failed to resend code:', err);
        } finally {
            setIsResending(false);
        }
    };

    // Format time for countdown
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
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
                <h2 className={styles.loginTitle}>Verify Your Identity</h2>

                <p style={{ textAlign: 'center', marginBottom: '24px', color: '#4b5563' }}>
                    We've sent a 6-digit verification code to your registered email.
                </p>

                {error && (
                    <div className={styles.errorMessage} style={{ marginBottom: '20px' }}>
                        {error}
                    </div>
                )}

                <div style={{ marginBottom: '24px' }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexWrap: 'nowrap',
                        gap: '8px',
                        width: '100%',
                        maxWidth: '22rem',
                        margin: '0 auto',
                        marginBottom: '16px'
                    }}>
                        {[0, 1, 2, 3, 4, 5].map((index) => (
                            <input
                                key={index}
                                ref={el => {
                                    if (el) {
                                        inputRefs.current[index] = el;
                                    }
                                }}
                                className={styles.otpInput}
                                type="text"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                autoComplete="one-time-code"
                                autoCorrect="off"
                                autoCapitalize="off"
                                spellCheck={false}
                                maxLength={1}
                                value={code[index]}
                                onChange={(e) => handleCodeChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                style={{
                                    width: '100%',
                                    maxWidth: '2.75rem',
                                    minWidth: 0,
                                    height: '3.5rem',
                                    textAlign: 'center',
                                    fontSize: '24px',
                                    lineHeight: '3.5rem',
                                    padding: 0,
                                    borderRadius: '8px',
                                    border: '1px solid #d1d5db',
                                    outline: 'none',
                                    transition: 'all 0.2s',
                                }}
                                disabled={isLoading}
                                autoFocus={index === 0}
                            />
                        ))}
                    </div>

                    <div style={{ textAlign: 'center', marginTop: '16px' }}>
                        {countdown > 0 ? (
                            <p style={{ color: '#6b7280', fontSize: '14px' }}>
                                Resend code in {formatTime(countdown)}
                            </p>
                        ) : (
                            <button
                                onClick={handleResendCode}
                                disabled={isResending}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    color: '#2563eb',
                                    cursor: 'pointer',
                                    fontSize: '14px',
                                    fontWeight: 500,
                                    textDecoration: 'none',
                                    opacity: isResending ? 0.7 : 1,
                                }}
                            >
                                {isResending ? 'Sending...' : 'Resend Code'}
                            </button>
                        )}
                    </div>
                </div>

                <button
                    onClick={() => handleVerify(code.join(''))}
                    disabled={isLoading || code.some(char => char === '')}
                    style={{
                        width: '100%',
                        padding: '12px',
                        backgroundColor: '#1a2c47',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '16px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'background-color 0.2s',
                        opacity: (isLoading || code.some(char => char === '')) ? 0.7 : 1,
                    }}
                >
                    {isLoading ? 'Verifying...' : 'Verify Code'}
                </button>
            </div>
        </div>
    );
}
