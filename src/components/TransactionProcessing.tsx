import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import TransactionFailed from './TransactionFailed';

interface TransactionProcessingProps {
  amount: string;
  recipientBankName: string;
  recipientAccountNumber: string;
  date: string;
}

const TransactionProcessing = ({
  amount,
  recipientBankName,
  recipientAccountNumber,
  date,
}: TransactionProcessingProps) => {
  const [progress, setProgress] = useState(0);
  const [transactionId, setTransactionId] = useState('');
  const progressInterval = useRef<NodeJS.Timeout>();
  const [isMounted, setIsMounted] = useState(false);

  // Generate random transaction IDs
  const generateTransactionId = () => {
    const prefixes = ['TXN', 'TRF', 'XFR', 'PMT', 'FNB'];
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const randomNum = Math.floor(1000000000 + Math.random() * 9000000000).toString();
    const formattedNum = randomNum.replace(/(\d{3})(?=\d)/g, '$1-');
    return `${prefix}${formattedNum}`;
  };

  // Generate transaction IDs on component mount
  useEffect(() => {
    setTransactionId(generateTransactionId());
  }, []);

  useEffect(() => {
    setIsMounted(true);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  // Handle progress bar animation
  useEffect(() => {
    progressInterval.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval.current);
          return 100;
        }
        return prev + 1;
      });
    }, 500); // Adjust timing for 45-60s completion

    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, []);

  // Handle completion
  const [showFailed, setShowFailed] = useState(false);

  useEffect(() => {
    if (progress >= 100) {
      // Show failed state after a short delay
      const timer = setTimeout(() => {
        setShowFailed(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [progress]);

  // Show failed page if needed
  if (showFailed) {
    return (
      <TransactionFailed
        amount={amount}
        recipientBankName={recipientBankName}
        recipientAccountNumber={recipientAccountNumber}
        date={date}
        transactionId={transactionId}
      />
    );
  }

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
      background: 'radial-gradient(1200px 700px at 50% 0%, rgba(79, 70, 229, 0.25) 0%, rgba(26, 26, 46, 1) 55%, rgba(11, 18, 36, 1) 100%)',
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
        {/* Logo */}
        <div style={{ marginBottom: '32px' }}>
          <img
            src="/assets/logo.svg"
            alt="First National Financial"
            width={180}
            height={40}
            style={{ margin: '0 auto', maxWidth: '100%', height: 'auto' }}
          />
        </div>

        {/* Title */}
        <h1 style={{
          fontSize: 'clamp(20px, 5vw, 26px)',
          fontWeight: '700',
          marginBottom: '16px',
          color: '#fff',
        }}>
          Processing Your Transaction
        </h1>

        {/* Instruction Text */}
        <p style={{
          color: '#a1a1aa',
          marginBottom: '32px',
          lineHeight: '1.5',
        }}>
          Please do not close this window or navigate away. This may take a few moments.
        </p>

        {/* Progress Bar */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '8px',
            fontSize: '14px',
            color: '#a1a1aa',
          }}>
            <span>Verifying Transaction...</span>
            <span>{progress}%</span>
          </div>
          <div style={{
            width: '100%',
            height: '8px',
            backgroundColor: '#2d3748',
            borderRadius: '4px',
            overflow: 'hidden',
          }}>
            <div style={{
              width: `${progress}%`,
              height: '100%',
              backgroundColor: '#4f46e5',
              transition: 'width 0.5s ease-in-out',
              borderRadius: '4px',
            }} />
          </div>
        </div>

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
            marginBottom: '8px',
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

        {/* Footer */}
        <div style={{
          fontSize: '12px',
          color: '#6b7280',
          marginTop: '24px',
          paddingTop: '16px',
          borderTop: '1px solid #2d3748',
        }}>
          <p style={{ marginBottom: '8px' }}>
            For security reasons, please do not share your transaction details with anyone.
          </p>
          <p>
            If you did not initiate this transaction, please contact our support team immediately at
            <a href="tel:+18001234567" style={{ color: '#4f46e5', textDecoration: 'none' }}> 1-800-123-4567</a>.
          </p>
        </div>
      </div>
    </div>

  );

  if (!isMounted) return null;
  return createPortal(overlay, document.body);
};

export default TransactionProcessing;

