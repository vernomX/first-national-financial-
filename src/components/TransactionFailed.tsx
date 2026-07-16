import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPortal } from 'react-dom';

interface TransactionFailedProps {
  amount: string;
  recipientBankName: string;
  recipientAccountNumber: string;
  date: string;
  transactionId: string;
  reason?: string;
}

const TransactionFailed = ({
  amount,
  recipientBankName,
  recipientAccountNumber,
  date,
  transactionId,
  reason = 'Due to Account Restrictions',
}: TransactionFailedProps) => {
  const navigate = useNavigate();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  // Format account number to show only last 3 digits
  const formatAccountNumber = (accountNumber: string) => {
    if (!accountNumber) return '*****';
    const lastThree = accountNumber.slice(-3);
    return `***** ${lastThree}`;
  };

  const overlay = (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 2147483647,
      backgroundColor: '#1a1a2e',
      background: 'radial-gradient(1200px 700px at 50% 0%, rgba(239, 68, 68, 0.18) 0%, rgba(26, 26, 46, 1) 55%, rgba(11, 18, 36, 1) 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      overflowY: 'auto',
      WebkitOverflowScrolling: 'touch',
      paddingTop: 'max(20px, env(safe-area-inset-top))',
      paddingRight: 'max(16px, env(safe-area-inset-right))',
      paddingBottom: 'max(24px, env(safe-area-inset-bottom))',
      paddingLeft: 'max(16px, env(safe-area-inset-left))',
      color: '#fff',
      fontFamily: 'ui-sans-serif, system-ui, -apple-system, "SF Pro Text", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      boxSizing: 'border-box',
    }}>
      <div style={{
        backgroundColor: '#16213e',
        borderRadius: '16px',
        padding: 'clamp(20px, 5vw, 40px)',
        maxWidth: '560px',
        width: '100%',
        textAlign: 'center',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
        margin: 'auto 0',
        border: '1px solid rgba(255,255,255,0.06)',
      }}>
        {/* Error Icon */}
        <div style={{
          width: 'clamp(64px, 18vw, 80px)',
          height: 'clamp(64px, 18vw, 80px)',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 24px',
        }}>
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ef4444"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
        </div>

        {/* Title */}
        <h1 style={{
          fontSize: 'clamp(22px, 6vw, 30px)',
          fontWeight: '700',
          margin: '0 0 16px 0',
          color: '#fff',
          lineHeight: '1.3',
        }}>
          Transfer Failed
        </h1>

        {/* Error Reason */}
        <p style={{
          color: '#ef4444',
          fontSize: 'clamp(15px, 4.5vw, 18px)',
          fontWeight: '600',
          margin: '0 0 32px 0',
        }}>
          {reason}
        </p>

        {/* Transaction Details */}
        <div style={{
          backgroundColor: '#1e293b',
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '32px',
          textAlign: 'left',
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '16px',
            paddingBottom: '16px',
            borderBottom: '1px solid #2d3748',
          }}>
            <span style={{ color: '#a1a1aa', fontSize: '14px' }}>Amount</span>
            <span style={{ fontWeight: '600', fontSize: '16px', color: '#f0f0f0' }}>${amount}</span>
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '16px',
            paddingBottom: '16px',
            borderBottom: '1px solid #2d3748',
          }}>
            <span style={{ color: '#a1a1aa', fontSize: '14px' }}>Recipient</span>
            <span style={{ color: '#e0e0e0', fontSize: '14px' }}>{recipientBankName} - {formatAccountNumber(recipientAccountNumber)}</span>
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '0',
          }}>
            <span style={{ color: '#a1a1aa', fontSize: '14px' }}>Date</span>
            <span style={{ color: '#e0e0e0', fontSize: '14px' }}>{date}</span>
          </div>
        </div>

        {/* Transaction ID */}
        <div style={{
          backgroundColor: '#1e293b',
          borderRadius: '8px',
          padding: '12px 16px',
          marginBottom: '32px',
          fontFamily: 'monospace',
          fontSize: '13px',
          color: '#b0b0b0',
          wordBreak: 'break-all',
          textAlign: 'center',
        }}>
          Transaction ID: <span style={{ color: '#e0e0e0' }}>{transactionId}</span>
        </div>

        {/* Instruction Text */}
        <p style={{
          color: '#a1a1aa',
          margin: '0 0 32px 0',
          lineHeight: '1.6',
          fontSize: '16px',
        }}>
          Please contact First National Financial Support for assistance with your account.
        </p>

        {/* Return to Dashboard Button */}
        <button
          onClick={() => navigate('/dashboard')}
          style={{
            backgroundColor: '#4f46e5',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            padding: '14px 28px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            width: '100%',
            transition: 'background-color 0.2s',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#4338ca';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = '#4f46e5';
          }}
        >
          Return to Dashboard
        </button>

        {/* Footer */}
        <div style={{
          fontSize: '12px',
          color: '#6b7280',
          marginTop: '32px',
          paddingTop: '16px',
          borderTop: '1px solid #2d3748',
          lineHeight: '1.5',
        }}>
          <p style={{ margin: '0 0 8px 0' }}>
            For security reasons, please do not share your transaction details with anyone.
          </p>
          <p style={{ margin: 0 }}>
            If you did not initiate this transaction, please contact our support team immediately at{' '}
            <a
              href="tel:+18001234567"
              style={{
                color: '#4f46e5',
                textDecoration: 'none',
                fontWeight: '500',
              }}
            >
              1-800-123-4567
            </a>.
          </p>
        </div>
      </div>
    </div>

  );

  if (!isMounted) return null;
  return createPortal(overlay, document.body);
};

export default TransactionFailed;

