import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import PaymentScheduled from './PaymentScheduled';

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
    }, 400); // ~40s to fill

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
    const lastThree = accountNumber.slice(-3);
    return `***** ${lastThree}`;
  };

  const overlay = (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      zIndex: 2147483647,
      background: 'radial-gradient(1200px 700px at 50% 0%, rgba(201,162,74,0.18) 0%, #0e1f3d 52%, #0a1730 100%)',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      overflowY: 'auto', WebkitOverflowScrolling: 'touch',
      paddingTop: 'max(20px, env(safe-area-inset-top))',
      paddingRight: 'max(16px, env(safe-area-inset-right))',
      paddingBottom: 'max(24px, env(safe-area-inset-bottom))',
      paddingLeft: 'max(16px, env(safe-area-inset-left))',
      color: '#fff',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      boxSizing: 'border-box',
    }}>
      <div style={{
        backgroundColor: '#14274a',
        borderRadius: '18px',
        padding: 'clamp(24px, 5vw, 40px)',
        maxWidth: '540px', width: '100%', textAlign: 'center',
        boxShadow: '0 18px 44px rgba(0,0,0,0.34)',
        margin: 'auto 0',
        border: '1px solid rgba(201,162,74,0.22)',
      }}>
        {/* Logo */}
        <div style={{ marginBottom: '28px' }}>
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
          width: 54, height: 54, margin: '0 auto 22px',
          border: '3px solid rgba(201,162,74,0.2)',
          borderTopColor: '#c9a24a',
          borderRadius: '50%',
          animation: 'fnfspin 0.9s linear infinite',
        }} />
        <style>{`@keyframes fnfspin { to { transform: rotate(360deg); } }`}</style>

        {/* Title */}
        <h1 style={{
          fontFamily: 'Georgia, "Times New Roman", serif',
          fontSize: 'clamp(22px, 5vw, 28px)', fontWeight: 700,
          marginBottom: '12px', color: '#fff', letterSpacing: '-0.3px',
        }}>
          Processing Your Transaction
        </h1>

        <p style={{ color: '#9aa6b8', marginBottom: '30px', lineHeight: 1.5 }}>
          Please do not close this window or navigate away. This may take a few moments.
        </p>

        {/* Progress */}
        <div style={{ marginBottom: '30px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px', color: '#9aa6b8' }}>
            <span>Verifying transaction...</span>
            <span style={{ color: '#e2c47f', fontWeight: 600 }}>{progress}%</span>
          </div>
          <div style={{ width: '100%', height: '8px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{
              width: `${progress}%`, height: '100%',
              background: 'linear-gradient(90deg, #e2c47f, #c9a24a)',
              transition: 'width 0.2s ease-in-out', borderRadius: '4px',
            }} />
          </div>
        </div>

        {/* Details */}
        <div style={{
          backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: '14px',
          padding: '4px 20px', marginBottom: '24px', textAlign: 'left',
          border: '1px solid rgba(255,255,255,0.06)',
        }}>
          {[
            ['Amount', `$${amount}`],
            ['Recipient', `${recipientBankName} - ${formatAccountNumber(recipientAccountNumber)}`],
            ['Date', date],
          ].map(([label, value], i, arr) => (
            <div key={label} style={{
              display: 'flex', justifyContent: 'space-between', gap: '16px', padding: '15px 0',
              borderBottom: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none',
            }}>
              <span style={{ color: '#9aa6b8', fontSize: '14px' }}>{label}</span>
              <span style={{
                color: label === 'Amount' ? '#fff' : '#e6e9ee',
                fontWeight: label === 'Amount' ? 700 : 500,
                fontSize: label === 'Amount' ? '16px' : '14px',
                fontFamily: label === 'Amount' ? 'Georgia, serif' : 'inherit',
                textAlign: 'right',
              }}>{value}</span>
            </div>
          ))}
        </div>

        {/* Transaction ID */}
        <div style={{
          backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: '8px', padding: '12px 16px',
          marginBottom: '24px', fontFamily: 'monospace', fontSize: '13px', color: '#9aa6b8',
          wordBreak: 'break-all', textAlign: 'center', border: '1px solid rgba(255,255,255,0.06)',
        }}>
          Transaction ID: <span style={{ color: '#e2c47f' }}>{transactionId}</span>
        </div>

        {/* Footer */}
        <div style={{ fontSize: '12px', color: '#7f8ba0', marginTop: '22px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.08)', lineHeight: 1.6 }}>
          <p style={{ marginBottom: '8px' }}>For security reasons, please do not share your transaction details with anyone.</p>
          <p style={{ margin: 0 }}>
            If you did not initiate this transaction, contact support at
            <a href="tel:+18001234567" style={{ color: '#e2c47f', textDecoration: 'none' }}> 1-800-123-4567</a>.
          </p>
        </div>
      </div>
    </div>
  );

  if (!isMounted) return null;
  return createPortal(overlay, document.body);
};

export default TransactionProcessing;
