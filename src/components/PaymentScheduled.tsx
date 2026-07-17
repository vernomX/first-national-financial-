import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { addPendingPayment } from '../lib/pendingPayments';

interface PaymentScheduledProps {
    amount: string;
    recipientBankName: string;
    recipientAccountNumber: string;
    date: string;
    transactionId: string;
}

const PaymentScheduled = ({
    amount,
    recipientBankName,
    recipientAccountNumber,
    date,
    transactionId,
}: PaymentScheduledProps) => {
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

    // Persist this as a pending payment so it shows on the Dashboard and survives refresh
    useEffect(() => {
        const cleanAmount = (amount || '0').toString().replace(/[^0-9.]/g, '');
        addPendingPayment({
            id: transactionId,
            date,
            description: `Transfer to ${recipientBankName}`,
            category: 'Transfer',
            amount: `-$${cleanAmount}`,
            type: 'debit',
            status: 'Pending',
            transactionId,
        });
    }, [amount, recipientBankName, date, transactionId]);

    const formatAccountNumber = (accountNumber: string) => {
        if (!accountNumber) return '*****';
        return `***** ${accountNumber.slice(-3)}`;
    };

    // Estimated delivery: date + 2 days, formatted
    const estimatedDelivery = (() => {
        const d = new Date(date);
        if (isNaN(d.getTime())) return date;
        d.setDate(d.getDate() + 2);
        return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    })();

    const overlay = (
        <div style={{
            position: 'fixed', inset: 0, zIndex: 2147483647,
            background: 'radial-gradient(1200px 700px at 50% 0%, rgba(201,162,74,0.18) 0%, #0e1f3d 52%, #0a1730 100%)',
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            overflowY: 'auto', WebkitOverflowScrolling: 'touch',
            paddingTop: 'max(24px, env(safe-area-inset-top))',
            paddingRight: 'max(16px, env(safe-area-inset-right))',
            paddingBottom: 'max(24px, env(safe-area-inset-bottom))',
            paddingLeft: 'max(16px, env(safe-area-inset-left))',
            color: '#fff', boxSizing: 'border-box',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        }}>
            <div style={{
                backgroundColor: '#14274a',
                borderRadius: '18px',
                padding: 'clamp(24px, 5vw, 40px)',
                maxWidth: '540px', width: '100%', textAlign: 'center',
                boxShadow: '0 18px 44px rgba(0,0,0,0.34)',
                border: '1px solid rgba(201,162,74,0.22)',
                margin: 'auto 0',
            }}>
                {/* Success check */}
                <div style={{
                    width: 'clamp(66px, 18vw, 84px)', height: 'clamp(66px, 18vw, 84px)',
                    background: 'rgba(16,121,74,0.16)',
                    borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 22px', border: '1px solid rgba(34,197,94,0.35)',
                }}>
                    <svg width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" /><path d="m9 12 2 2 4-4" />
                    </svg>
                </div>

                {/* Title */}
                <h1 style={{
                    fontFamily: 'Georgia, "Times New Roman", serif',
                    fontSize: 'clamp(24px, 6vw, 32px)', fontWeight: 700,
                    margin: '0 0 8px', color: '#fff', letterSpacing: '-0.3px',
                }}>
                    Payment Scheduled
                </h1>
                <p style={{ color: '#e2c47f', fontSize: '13px', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', margin: '0 0 28px' }}>
                    Confirmation #{transactionId.slice(-6)}
                </p>

                {/* Details */}
                <div style={{
                    backgroundColor: 'rgba(255,255,255,0.04)',
                    borderRadius: '14px', padding: '4px 20px', marginBottom: '24px', textAlign: 'left',
                    border: '1px solid rgba(255,255,255,0.06)',
                }}>
                    {[
                        ['Recipient', `${recipientBankName} — ${formatAccountNumber(recipientAccountNumber)}`],
                        ['Amount', `$${amount}`],
                        ['Payment type', 'Electronic'],
                        ['Pay with', 'Checking Account ****3614'],
                        ['Send on', date],
                        ['Estimated delivery', estimatedDelivery],
                    ].map(([label, value], i, arr) => (
                        <div key={label} style={{
                            display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '16px',
                            padding: '15px 0',
                            borderBottom: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none',
                        }}>
                            <span style={{ color: '#9aa6b8', fontSize: '13.5px' }}>{label}</span>
                            <span style={{
                                color: label === 'Amount' ? '#fff' : '#e6e9ee',
                                fontSize: label === 'Amount' ? '17px' : '14px',
                                fontWeight: label === 'Amount' ? 700 : 500,
                                fontFamily: label === 'Amount' ? 'Georgia, serif' : 'inherit',
                                textAlign: 'right',
                            }}>{value}</span>
                        </div>
                    ))}
                </div>

                {/* Status pill */}
                <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    background: 'rgba(201,162,74,0.14)', border: '1px solid rgba(201,162,74,0.4)',
                    color: '#e2c47f', padding: '8px 16px', borderRadius: '999px',
                    fontSize: '13px', fontWeight: 600, marginBottom: '28px',
                }}>
                    <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#e2c47f', display: 'inline-block' }} />
                    Pending — awaiting processing
                </div>

                {/* Buttons */}
                <button
                    onClick={() => navigate('/dashboard')}
                    style={{
                        width: '100%', padding: '15px', border: 'none', borderRadius: '10px',
                        fontSize: '16px', fontWeight: 700, letterSpacing: '0.3px', cursor: 'pointer',
                        color: '#1a1300', background: 'linear-gradient(180deg, #e2c47f 0%, #c9a24a 100%)',
                        boxShadow: '0 8px 22px rgba(201,162,74,0.3)', marginBottom: '12px',
                    }}
                >
                    Back to Dashboard
                </button>
                <button
                    onClick={() => window.print()}
                    style={{
                        width: '100%', padding: '13px', borderRadius: '10px', cursor: 'pointer',
                        fontSize: '15px', fontWeight: 600, color: '#fff',
                        background: 'transparent', border: '1px solid rgba(255,255,255,0.22)',
                    }}
                >
                    Print Receipt
                </button>

                {/* Footer */}
                <div style={{
                    fontSize: '12px', color: '#7f8ba0', marginTop: '26px', paddingTop: '18px',
                    borderTop: '1px solid rgba(255,255,255,0.08)', lineHeight: 1.6,
                }}>
                    <p style={{ margin: '0 0 6px' }}>
                        For security reasons, please do not share your transaction details with anyone.
                    </p>
                    <p style={{ margin: 0 }}>
                        Questions? Contact First National Financial Support at{' '}
                        <a href="tel:+18001234567" style={{ color: '#e2c47f', textDecoration: 'none', fontWeight: 500 }}>1-800-123-4567</a>.
                    </p>
                </div>
            </div>
        </div>
    );

    if (!isMounted) return null;
    return createPortal(overlay, document.body);
};

export default PaymentScheduled;
