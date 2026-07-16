import { useState, Suspense, lazy } from 'react';
import { userData } from '../lib/userData';

// Dynamically import the SmsVerification component
const SmsVerification = lazy(() => import('../components/SmsVerification'));

interface EmailVerificationProps {
  onVerify: () => Promise<boolean>;
  onResend: () => Promise<boolean>;
  onClose: () => void;
  onSmsVerify: (code: string) => Promise<boolean>;
  onSmsResend: () => Promise<boolean>;
  phoneNumber?: string;
}

export default function EmailVerification({
  onVerify,
  onResend,
  onClose,
  onSmsVerify,
  onSmsResend,
  phoneNumber = userData.phone
}: EmailVerificationProps) {
  const [isResending, setIsResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [currentStep, setCurrentStep] = useState<'email' | 'sms'>('email');

  // Mask the email for display
  const maskEmail = (email: string) => {
    const [username, domain] = email.split('@');
    const maskedUsername = username.slice(0, 2) + '*'.repeat(Math.max(0, username.length - 2));
    return `${maskedUsername}@${domain}`;
  };

  const handleResend = async () => {
    setIsResending(true);
    const success = await onResend();
    setResendSuccess(success);
    setIsResending(false);

    if (success) {
      setTimeout(() => setResendSuccess(false), 3000);
    }
  };

  const handleEmailVerify = async () => {
    const success = await onVerify();
    if (success) {
      setCurrentStep('sms');
    }
  };

  if (currentStep === 'sms') {
    return (
      <Suspense fallback={<div>Loading verification...</div>}>
        <SmsVerification
          onVerify={onSmsVerify}
          onResend={onSmsResend}
          onClose={onClose}
          phoneNumber={phoneNumber}
        />
      </Suspense>
    );
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px',
      backdropFilter: 'blur(4px)'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '32px',
        maxWidth: '480px',
        width: '100%',
        textAlign: 'center',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
      }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'none',
            border: 'none',
            fontSize: '24px',
            cursor: 'pointer',
            color: '#64748b',
            padding: '8px',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background-color 0.2s',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#f1f5f9';
            e.currentTarget.style.color = '#334155';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = '#64748b';
          }}
        >
          &times;
        </button>

        {/* Verification Icon */}
        <div style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          backgroundColor: '#f0fdf4',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 24px',
          border: '2px solid #bbf7d0'
        }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#22c55e"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        </div>

        <h2 style={{
          fontSize: '24px',
          fontWeight: '600',
          color: '#1a1a2e',
          marginBottom: '16px'
        }}>
          Verification Required
        </h2>

        <p style={{
          color: '#4b5563',
          marginBottom: '32px',
          lineHeight: '1.6',
          fontSize: '16px'
        }}>
          For your security, we have sent a confirmation link to your registered email address:
          <br />
          <strong>{maskEmail(userData.email)}</strong>
        </p>

        <button
          onClick={handleEmailVerify}
          style={{
            backgroundColor: '#1a1a2e',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            padding: '14px 24px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            width: '100%',
            maxWidth: '300px',
            margin: '0 auto 24px',
            transition: 'background-color 0.2s, transform 0.1s',
            display: 'block'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#2a2a3c';
            e.currentTarget.style.transform = 'translateY(-1px)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = '#1a1a2e';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.transform = 'translateY(1px)';
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.transform = 'translateY(-1px)';
          }}
        >
          Continue to SMS Verification
        </button>

        <div>
          <button
            onClick={handleResend}
            disabled={isResending}
            style={{
              background: 'none',
              border: 'none',
              color: '#3b82f6',
              cursor: 'pointer',
              fontSize: '14px',
              textDecoration: 'none',
              padding: '8px 12px',
              borderRadius: '4px',
              transition: 'background-color 0.2s',
              fontWeight: '500'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#eff6ff';
              e.currentTarget.style.textDecoration = 'underline';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.textDecoration = 'none';
            }}
          >
            {isResending ? 'Sending...' : 'Didn\'t receive the email? Resend Email'}
          </button>

          {resendSuccess && (
            <p style={{
              color: '#22c55e',
              fontSize: '14px',
              marginTop: '8px'
            }}>
              Verification email resent successfully!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
