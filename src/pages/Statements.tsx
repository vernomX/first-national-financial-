import { useState } from 'react';
import Sidebar from '../components/Sidebar';

const REGISTERED_EMAIL = 'stephkennedy42@gmail.com';

export default function StatementsPage() {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const formatDisplay = (d: string) => {
        if (!d) return '';
        const dt = new Date(d);
        if (isNaN(dt.getTime())) return d;
        return dt.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    };

    const canSubmit = Boolean(startDate && endDate && !isProcessing);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!canSubmit) return;
        setIsProcessing(true);
        await new Promise(r => setTimeout(r, 2200));
        setIsProcessing(false);
        setShowModal(true);
    };

    const inputStyle: React.CSSProperties = {
        width: '100%',
        padding: '12px 16px',
        border: '1px solid #e2e8f0',
        borderRadius: '8px',
        fontSize: '16px',
        color: '#1a202c',
        outline: 'none',
        backgroundColor: '#fff',
        transition: 'border-color 0.2s',
        cursor: 'pointer',
        fontFamily: 'inherit',
    };

    const labelStyle: React.CSSProperties = {
        display: 'block',
        marginBottom: '8px',
        color: '#4a5568',
        fontWeight: 500,
        fontSize: '14px',
    };

    return (
        <div className="app-shell" style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f6f4ef' }}>
            <Sidebar />
            <div className="app-main statements-page" style={{
                flex: 1,
                marginLeft: '240px',
                backgroundColor: '#f6f4ef',
                minHeight: '100vh',
                padding: '32px 40px',
            }}>
                <style>{`
                    @keyframes stmt-spin { to { transform: rotate(360deg); } }
                    @keyframes stmt-fade { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
                    .stmt-input:focus { border-color: #1e3a8a !important; box-shadow: 0 0 0 3px rgba(30,58,138,0.10); }
                    .stmt-btn:hover:not(:disabled) { background-color: #1a326f !important; }
                    @media (max-width: 900px) {
                        .statements-page { margin-left: 0 !important; padding: 20px 16px 48px !important; }
                        .stmt-dates { grid-template-columns: 1fr !important; }
                    }
                `}</style>

                {/* Page Header */}
                <div style={{
                    marginBottom: '32px',
                    paddingBottom: '24px',
                    borderBottom: '1px solid #e2e8f0',
                }}>
                    <h1 style={{ fontSize: '24px', fontWeight: 600, color: '#1a1a2e', margin: '0 0 8px' }}>
                        Account Statements
                    </h1>
                    <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>
                        Request a statement for any period of your account history
                    </p>
                </div>

                <div style={{ maxWidth: '800px', margin: '32px auto', padding: '0 8px' }}>
                    {/* Instruction card */}
                    <div style={{
                        backgroundColor: 'white',
                        borderRadius: '12px',
                        boxShadow: '0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px 0 rgba(0,0,0,0.06)',
                        padding: '28px',
                        marginBottom: '24px',
                        borderLeft: '4px solid #1e3a8a',
                    }}>
                        <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                            <div style={{
                                width: 40, height: 40, borderRadius: '10px', flexShrink: 0,
                                backgroundColor: '#eef2ff', color: '#1e3a8a',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                            }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                    <polyline points="14 2 14 8 20 8" />
                                    <line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
                                </svg>
                            </div>
                            <div>
                                <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#1a1a2e', margin: '0 0 6px' }}>
                                    How to request your statement
                                </h2>
                                <p style={{ fontSize: '14px', color: '#4a5568', margin: 0, lineHeight: 1.6 }}>
                                    Select the <strong>beginning date</strong> and the <strong>ending date</strong> of the period
                                    you'd like to review, then choose <strong>Get Statement</strong>. Your statement will be
                                    generated as a secure PDF and delivered to the email address registered to this account.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Form card */}
                    <div style={{
                        backgroundColor: 'white',
                        borderRadius: '12px',
                        boxShadow: '0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px 0 rgba(0,0,0,0.06)',
                        padding: '28px',
                    }}>
                        <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#1a1a2e', margin: '0 0 4px' }}>
                            Statement Period
                        </h2>
                        <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 24px' }}>
                            Statements are available for the last 7 years
                        </p>

                        <form onSubmit={handleSubmit}>
                            <div className="stmt-dates" style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr',
                                gap: '20px',
                                marginBottom: '24px',
                            }}>
                                <div>
                                    <label style={labelStyle} htmlFor="startDate">Beginning Date</label>
                                    <input
                                        id="startDate"
                                        className="stmt-input"
                                        type="date"
                                        value={startDate}
                                        max={endDate || undefined}
                                        onChange={(e) => setStartDate(e.target.value)}
                                        required
                                        style={inputStyle}
                                    />
                                </div>
                                <div>
                                    <label style={labelStyle} htmlFor="endDate">Ending Date</label>
                                    <input
                                        id="endDate"
                                        className="stmt-input"
                                        type="date"
                                        value={endDate}
                                        min={startDate || undefined}
                                        onChange={(e) => setEndDate(e.target.value)}
                                        required
                                        style={inputStyle}
                                    />
                                </div>
                            </div>

                            {/* Delivery note */}
                            <div style={{
                                backgroundColor: '#f8fafc',
                                border: '1px solid #e2e8f0',
                                borderRadius: '8px',
                                padding: '14px 16px',
                                marginBottom: '24px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                            }}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                                    <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 6L2 7" />
                                </svg>
                                <span style={{ fontSize: '13.5px', color: '#4a5568' }}>
                                    Delivered to <strong style={{ color: '#1a1a2e' }}>{REGISTERED_EMAIL}</strong>
                                </span>
                            </div>

                            <button
                                type="submit"
                                className="stmt-btn"
                                disabled={!canSubmit}
                                style={{
                                    width: '100%',
                                    padding: '14px',
                                    backgroundColor: canSubmit ? '#1e3a8a' : '#94a3b8',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '8px',
                                    fontSize: '16px',
                                    fontWeight: 600,
                                    cursor: canSubmit ? 'pointer' : 'not-allowed',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '10px',
                                    transition: 'background-color 0.2s',
                                }}
                            >
                                {isProcessing ? (
                                    <>
                                        <span style={{
                                            width: 16, height: 16, borderRadius: '50%',
                                            border: '2px solid rgba(255,255,255,0.35)',
                                            borderTopColor: '#fff',
                                            animation: 'stmt-spin 0.8s linear infinite',
                                            display: 'inline-block',
                                        }} />
                                        Generating statement...
                                    </>
                                ) : (
                                    <>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                            <polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
                                        </svg>
                                        Get Statement
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Success modal */}
            {showModal && (
                <div
                    onClick={() => setShowModal(false)}
                    style={{
                        position: 'fixed', inset: 0, zIndex: 9999,
                        backgroundColor: 'rgba(15,23,42,0.55)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        padding: '20px',
                    }}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            backgroundColor: '#fff',
                            borderRadius: '14px',
                            maxWidth: '440px',
                            width: '100%',
                            padding: '32px 28px',
                            textAlign: 'center',
                            boxShadow: '0 20px 50px rgba(0,0,0,0.25)',
                            animation: 'stmt-fade 0.25s ease-out',
                        }}
                    >
                        <div style={{
                            width: 64, height: 64, borderRadius: '50%',
                            backgroundColor: '#dcfce7',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            margin: '0 auto 18px',
                        }}>
                            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20 6 9 17l-5-5" />
                            </svg>
                        </div>

                        <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#1a1a2e', margin: '0 0 12px' }}>
                            Statement Sent
                        </h3>

                        <p style={{ fontSize: '14.5px', color: '#4a5568', lineHeight: 1.65, margin: '0 0 22px' }}>
                            Your statement for <strong style={{ color: '#1a1a2e' }}>{formatDisplay(startDate)}</strong> to{' '}
                            <strong style={{ color: '#1a1a2e' }}>{formatDisplay(endDate)}</strong> has been sent to{' '}
                            <strong style={{ color: '#1a1a2e' }}>{REGISTERED_EMAIL}</strong>.
                        </p>

                        <p style={{ fontSize: '12.5px', color: '#94a3b8', margin: '0 0 22px', lineHeight: 1.55 }}>
                            Please allow a few minutes for delivery. Check your spam folder if it doesn't arrive.
                        </p>

                        <button
                            onClick={() => setShowModal(false)}
                            style={{
                                width: '100%',
                                padding: '13px',
                                backgroundColor: '#1e3a8a',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '8px',
                                fontSize: '15px',
                                fontWeight: 600,
                                cursor: 'pointer',
                            }}
                        >
                            Done
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
