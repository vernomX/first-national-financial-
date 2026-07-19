import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { addPendingPayment } from '../lib/pendingPayments';

// Format any amount string as 1,234.56
const formatMoney = (raw: string | number) => {
    const n = parseFloat(String(raw).replace(/[^0-9.]/g, ''));
    if (isNaN(n)) return '0.00';
    return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

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

    // Persist as a pending payment so it shows on the Dashboard and survives refresh
    useEffect(() => {
        addPendingPayment({
            id: transactionId,
            date,
            description: `Transfer to ${recipientBankName}`,
            category: 'Transfer',
            amount: `-$${formatMoney(amount)}`,
            type: 'debit',
            status: 'Pending',
            transactionId,
        });
    }, [amount, recipientBankName, date, transactionId]);

    const formatAccountNumber = (accountNumber: string) => {
        if (!accountNumber) return '*****';
        return `***** ${accountNumber.slice(-3)}`;
    };

    const estimatedDelivery = (() => {
        const d = new Date(date);
        if (isNaN(d.getTime())) return date;
        return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    })();

    const rows: [string, string][] = [
        ['Recipient', `${recipientBankName} — ${formatAccountNumber(recipientAccountNumber)}`],
        ['Amount', `$${formatMoney(amount)}`],
        ['Payment type', 'Electronic'],
        ['Pay with', 'Checking Account ****3614'],
        ['Send on', date],
        ['Estimated delivery', estimatedDelivery],
    ];

    const overlay = (
        <div style={{
            position: 'fixed', inset: 0, zIndex: 2147483647,
            backgroundColor: '#f6f4ef',
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            overflowY: 'auto', WebkitOverflowScrolling: 'touch',
            paddingTop: 'max(24px, env(safe-area-inset-top))',
            paddingRight: 'max(16px, env(safe-area-inset-right))',
            paddingBottom: 'max(24px, env(safe-area-inset-bottom))',
            paddingLeft: 'max(16px, env(safe-area-inset-left))',
            boxSizing: 'border-box',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
            color: '#1a202c',
        }}>
            <div style={{
                backgroundColor: '#ffffff',
                borderRadius: '14px',
                padding: 'clamp(24px, 5vw, 36px)',
                maxWidth: '520px', width: '100%', textAlign: 'center',
                boxShadow: '0 1px 3px 0 rgba(0,0,0,0.1), 0 10px 30px rgba(0,0,0,0.08)',
                border: '1px solid #e2e8f0',
                margin: 'auto 0',
            }}>
                {/* Success check */}
                <div style={{
                    width: 'clamp(64px, 17vw, 76px)', height: 'clamp(64px, 17vw, 76px)',
                    backgroundColor: '#dcfce7',
                    borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 20px',
                }}>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6 9 17l-5-5" />
                    </svg>
                </div>

                <h1 style={{
                    fontSize: 'clamp(22px, 5.5vw, 28px)', fontWeight: 700,
                    margin: '0 0 6px', color: '#1a1a2e', letterSpacing: '-0.2px',
                }}>
                    Payment Scheduled
                </h1>
                <p style={{
                    color: '#64748b', fontSize: '13px', fontWeight: 600,
                    letterSpacing: '1.2px', textTransform: 'uppercase', margin: '0 0 26px',
                }}>
                    Confirmation #{transactionId.slice(-6)}
                </p>

                {/* Details */}
                <div style={{
                    border: '1px solid #e2e8f0',
                    borderRadius: '10px',
                    padding: '2px 18px',
                    marginBottom: '22px',
                    textAlign: 'left',
                    backgroundColor: '#fbfcfd',
                }}>
                    {rows.map(([label, value], i) => (
                        <div key={label} style={{
                            display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '16px',
                            padding: '14px 0',
                            borderBottom: i < rows.length - 1 ? '1px solid #eef2f6' : 'none',
                        }}>
                            <span style={{ color: '#64748b', fontSize: '13.5px', fontWeight: 500 }}>{label}</span>
                            <span style={{
                                color: '#1a1a2e',
                                fontSize: label === 'Amount' ? '17px' : '14px',
                                fontWeight: label === 'Amount' ? 700 : 600,
                                textAlign: 'right',
                            }}>{value}</span>
                        </div>
                    ))}
                </div>

                {/* Status pill */}
                <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    backgroundColor: '#fef9e7', border: '1px solid #f3e2b3',
                    color: '#a16207', padding: '8px 16px', borderRadius: '999px',
                    fontSize: '13px', fontWeight: 600, marginBottom: '26px',
                }}>
                    <span style={{ width: 7, height: 7, borderRadius: '50%', backgroundColor: '#ca8a04', display: 'inline-block' }} />
                    Pending — awaiting processing
                </div>

                {/* Buttons */}
                <button
                    onClick={() => navigate('/dashboard')}
                    style={{
                        width: '100%', padding: '14px', border: 'none', borderRadius: '8px',
                        fontSize: '16px', fontWeight: 600, cursor: 'pointer',
                        color: '#ffffff', backgroundColor: '#1e3a8a',
                        marginBottom: '10px', transition: 'background-color 0.2s',
                    }}
                    onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#1a326f'; }}
                    onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#1e3a8a'; }}
                >
                    Back to Dashboard
                </button>
                <button
                    onClick={() => window.print()}
                    style={{
                        width: '100%', padding: '13px', borderRadius: '8px', cursor: 'pointer',
                        fontSize: '15px', fontWeight: 600, color: '#334155',
                        backgroundColor: '#ffffff', border: '1px solid #e2e8f0',
                    }}
                >
                    Print Receipt
                </button>

                {/* Footer */}
                <div style={{
                    fontSize: '12px', color: '#94a3b8', marginTop: '24px', paddingTop: '18px',
                    borderTop: '1px solid #e2e8f0', lineHeight: 1.6,
                }}>
                    <p style={{ margin: '0 0 6px' }}>
                        For security reasons, please do not share your transaction details with anyone.
                    </p>
                    <p style={{ margin: 0 }}>
                        Questions? Contact First National Financial Support at{' '}
                        <a href="tel:+18001234567" style={{ color: '#1e3a8a', textDecoration: 'none', fontWeight: 600 }}>1-800-123-4567</a>.
                    </p>
                </div>
            </div>
        </div>
    );

    if (!isMounted) return null;
    return createPortal(overlay, document.body);
};

export default PaymentScheduled;
