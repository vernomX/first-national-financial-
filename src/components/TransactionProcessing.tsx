import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import PaymentScheduled from './PaymentScheduled';

// Format any amount string as 1,234.56
const formatMoney = (raw: string | number) => {
  const n = parseFloat(String(raw).replace(/[^0-9.]/g, ''));
  if (isNaN(n)) return '0.00';
  return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

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

  const generateTransactionId = () => {
    const prefixes = ['TXN', 'TRF', 'XFR', 'PMT', 'FNB'];
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const randomNum = Math.floor(1000000000 + Math.random() * 9000000000).toString();
    const formattedNum = randomNum.replace(/(\d{3})(?=\d)/g, '$1-');
    return `${prefix}${formattedNum}`;
  };

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

  useEffect(() => {
    progressInterval.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval.current);
          return 100;
        }
        return prev + 1;
      });
    }, 60);

    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, []);

  const [showScheduled, setShowScheduled] = useState(false);

  useEffect(() => {
    if (progress >= 100) {
      const timer = setTimeout(() => {
        setShowScheduled(true);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [progress]);

  if (showScheduled) {
    return (
      <PaymentScheduled
        amount={amount}
        recipientBankName={recipientBankName}
        recipientAccountNumber={recipientAccountNumber}
        date={date}
        transactionId={transactionId}
      />
    );
  }

  const formatAccountNumber = (accountNumber: string) => {
    if (!accountNumber) return '*****';
    return `***** ${accountNumber.slice(-3)}`;
  };

  const rows: [string, string][] = [
    ['Amount', `$${formatMoney(amount)}`],
    ['Recipient', `${recipientBankName} - ${formatAccountNumber(recipientAccountNumber)}`],
    ['Date', date],
  ];

  const overlay = (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      zIndex: 2147483647,
      backgroundColor: '#f6f4ef',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      overflowY: 'auto', WebkitOverflowScrolling: 'touch',
      paddingTop: 'max(24px, env(safe-area-inset-top))',
      paddingRight: 'max(16px, env(safe-area-inset-right))',
      paddingBottom: 'max(24px, env(safe-area-inset-bottom))',
      paddingLeft: 'max(16px, env(safe-area-inset-left))',
      color: '#1a202c',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      boxSizing: 'border-box',
    }}>
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '14px',
        padding: 'clamp(24px, 5vw, 36px)',
        maxWidth: '520px', width: '100%', textAlign: 'center',
        boxShadow: '0 1px 3px 0 rgba(0,0,0,0.1), 0 10px 30px rgba(0,0,0,0.08)',
        margin: 'auto 0',
        border: '1px solid #e2e8f0',
      }}>
        {/* Logo */}
        <div style={{ marginBottom: '26px' }}>
          <img
            src="/assets/logo.svg"
            alt="First National Financial"
            width={180}
            height={40}
            style={{ margin: '0 auto', maxWidth: '100%', height: 'auto' }}
          />
        </div>

        {/* Spinner */}
        <div style={{
          width: 52, height: 52, margin: '0 auto 20px',
          border: '3px solid #e2e8f0',
          borderTopColor: '#1e3a8a',
          borderRadius: '50%',
          animation: 'fnfspin 0.9s linear infinite',
        }} />
        <style>{`@keyframes fnfspin { to { transform: rotate(360deg); } }`}</style>

        <h1 style={{
          fontSize: 'clamp(20px, 5vw, 25px)', fontWeight: 700,
          marginBottom: '10px', color: '#1a1a2e', letterSpacing: '-0.2px',
        }}>
          Processing Your Transaction
        </h1>

        <p style={{ color: '#64748b', marginBottom: '28px', lineHeight: 1.55, fontSize: '14.5px' }}>
          Please do not close this window or navigate away. This may take a few moments.
        </p>

        {/* Progress */}
        <div style={{ marginBottom: '26px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13.5px', color: '#64748b' }}>
            <span>Verifying transaction...</span>
            <span style={{ color: '#1e3a8a', fontWeight: 600 }}>{progress}%</span>
          </div>
          <div style={{ width: '100%', height: '8px', backgroundColor: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{
              width: `${progress}%`, height: '100%',
              backgroundColor: '#1e3a8a',
              transition: 'width 0.2s ease-in-out', borderRadius: '4px',
            }} />
          </div>
        </div>

        {/* Details */}
        <div style={{
          border: '1px solid #e2e8f0', borderRadius: '10px',
          padding: '2px 18px', marginBottom: '20px', textAlign: 'left',
          backgroundColor: '#fbfcfd',
        }}>
          {rows.map(([label, value], i) => (
            <div key={label} style={{
              display: 'flex', justifyContent: 'space-between', gap: '16px', padding: '14px 0',
              borderBottom: i < rows.length - 1 ? '1px solid #eef2f6' : 'none',
            }}>
              <span style={{ color: '#64748b', fontSize: '13.5px', fontWeight: 500 }}>{label}</span>
              <span style={{
                color: '#1a1a2e',
                fontWeight: label === 'Amount' ? 700 : 600,
                fontSize: label === 'Amount' ? '16px' : '14px',
                textAlign: 'right',
              }}>{value}</span>
            </div>
          ))}
        </div>

        {/* Transaction ID */}
        <div style={{
          backgroundColor: '#f8fafc', borderRadius: '8px', padding: '12px 16px',
          marginBottom: '20px', fontFamily: 'monospace', fontSize: '13px', color: '#64748b',
          wordBreak: 'break-all', textAlign: 'center', border: '1px solid #e2e8f0',
        }}>
          Transaction ID: <span style={{ color: '#1a1a2e', fontWeight: 600 }}>{transactionId}</span>
        </div>

        {/* Footer */}
        <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #e2e8f0', lineHeight: 1.6 }}>
          <p style={{ marginBottom: '8px' }}>For security reasons, please do not share your transaction details with anyone.</p>
          <p style={{ margin: 0 }}>
            If you did not initiate this transaction, contact support at
            <a href="tel:+18001234567" style={{ color: '#1e3a8a', textDecoration: 'none', fontWeight: 600 }}> 1-800-123-4567</a>.
          </p>
        </div>
      </div>
    </div>
  );

  if (!isMounted) return null;
  return createPortal(overlay, document.body);
};

export default TransactionProcessing;
