import { useState } from 'react';
import Sidebar from '../components/Sidebar';

const WIRE_DETAILS = [
    { label: 'Beneficiary Name', value: 'Stephanie Kennedy' },
    { label: 'Account Number', value: '09713614' },
    { label: 'Bank Name', value: 'First National Financial' },
    { label: 'Account Type', value: 'Checking — Personal' },
    { label: 'Bank Address', value: '1200 Sterling Avenue, Wilmington, DE 19801' },
    { label: 'SWIFT / BIC', value: 'FNFIUS33' },
];

export default function DepositPage() {
    const [copied, setCopied] = useState<string | null>(null);

    const copy = async (label: string, value: string) => {
        try {
            await navigator.clipboard.writeText(value);
            setCopied(label);
            setTimeout(() => setCopied(null), 1600);
        } catch {
            /* clipboard unavailable — ignore */
        }
    };

    return (
        <div className="app-shell" style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f6f4ef' }}>
            <Sidebar />
            <div className="app-main deposit-page" style={{
                flex: 1,
                marginLeft: '240px',
                backgroundColor: '#f6f4ef',
                minHeight: '100vh',
                padding: '32px 40px',
            }}>
                <style>{`
                    .dep-row:hover { background-color: #f8fafc; }
                    .dep-copy:hover { color: #1e3a8a !important; border-color: #cbd5e1 !important; }
                    @media (max-width: 900px) {
                        .deposit-page { margin-left: 0 !important; padding: 20px 16px 48px !important; }
                        .dep-row { flex-direction: column !important; align-items: flex-start !important; gap: 6px !important; }
                        .dep-value-wrap { width: 100%; justify-content: space-between !important; }
                    }
                `}</style>

                {/* Page Header */}
                <div style={{
                    marginBottom: '32px',
                    paddingBottom: '24px',
                    borderBottom: '1px solid #e2e8f0',
                }}>
                    <h1 style={{ fontSize: '24px', fontWeight: 600, color: '#1a1a2e', margin: '0 0 8px' }}>
                        Deposit Funds
                    </h1>
                    <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>
                        Fund your account securely by domestic or international wire
                    </p>
                </div>

                <div style={{ maxWidth: '800px', margin: '32px auto', padding: '0 8px' }}>
                    {/* Notice */}
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
                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                </svg>
                            </div>
                            <div>
                                <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#1a1a2e', margin: '0 0 6px' }}>
                                    Wire transfer deposits only
                                </h2>
                                <p style={{ fontSize: '14px', color: '#4a5568', margin: 0, lineHeight: 1.65 }}>
                                    For your security, deposits to this account have been set up to accept
                                    <strong> incoming wire transfers only</strong>. Mobile check deposits, cash
                                    deposits and third-party transfers are not enabled on this account.
                                    Please provide the details below to the sending institution exactly as shown.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Wire details */}
                    <div style={{
                        backgroundColor: 'white',
                        borderRadius: '12px',
                        boxShadow: '0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px 0 rgba(0,0,0,0.06)',
                        padding: '28px',
                        marginBottom: '24px',
                    }}>
                        <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#1a1a2e', margin: '0 0 4px' }}>
                            Wire Instructions
                        </h2>
                        <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 20px' }}>
                            Provide these details to the sender
                        </p>

                        <div style={{ border: '1px solid #e2e8f0', borderRadius: '10px', overflow: 'hidden' }}>
                            {WIRE_DETAILS.map((row, i) => (
                                <div
                                    key={row.label}
                                    className="dep-row"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        gap: '16px',
                                        padding: '16px 18px',
                                        borderBottom: i < WIRE_DETAILS.length - 1 ? '1px solid #eef2f6' : 'none',
                                        transition: 'background-color 0.15s',
                                    }}
                                >
                                    <span style={{ fontSize: '13.5px', color: '#64748b', fontWeight: 500 }}>
                                        {row.label}
                                    </span>
                                    <span className="dep-value-wrap" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <span style={{
                                            fontSize: '14.5px',
                                            color: '#1a1a2e',
                                            fontWeight: 600,
                                            textAlign: 'right',
                                            fontVariantNumeric: 'tabular-nums',
                                        }}>
                                            {row.value}
                                        </span>
                                        <button
                                            className="dep-copy"
                                            onClick={() => copy(row.label, row.value)}
                                            title="Copy"
                                            style={{
                                                background: 'none',
                                                border: '1px solid #e2e8f0',
                                                borderRadius: '6px',
                                                padding: '5px 7px',
                                                cursor: 'pointer',
                                                color: '#94a3b8',
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                transition: 'color 0.15s, border-color 0.15s',
                                                flexShrink: 0,
                                            }}
                                        >
                                            {copied === row.label ? (
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M20 6 9 17l-5-5" />
                                                </svg>
                                            ) : (
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <rect x="9" y="9" width="13" height="13" rx="2" />
                                                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                                                </svg>
                                            )}
                                        </button>
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Processing times + notes */}
                    <div style={{
                        backgroundColor: 'white',
                        borderRadius: '12px',
                        boxShadow: '0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px 0 rgba(0,0,0,0.06)',
                        padding: '28px',
                    }}>
                        <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#1a1a2e', margin: '0 0 20px' }}>
                            Processing Times & Notes
                        </h2>

                        <div style={{ display: 'grid', gap: '16px' }}>
                            {[
                                {
                                    icon: (
                                        <><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></>
                                    ),
                                    title: 'Domestic wires — 1 to 2 business days',
                                    body: 'Wires received before 2:00 PM ET on a business day are typically credited the same day.',
                                },
                                {
                                    icon: (
                                        <><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></>
                                    ),
                                    title: 'International wires — 3 to 4 business days',
                                    body: 'Timing may vary depending on the sending bank and any intermediary institutions.',
                                },
                                {
                                    icon: (
                                        <><path d="M12 9v4" /><path d="M12 17h.01" /><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /></>
                                    ),
                                    title: 'Match the beneficiary name exactly',
                                    body: 'Wires with a mismatched beneficiary name may be delayed or returned by the receiving bank.',
                                },
                                {
                                    icon: (
                                        <><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></>
                                    ),
                                    title: 'Funds are held securely on arrival',
                                    body: 'You will receive an alert as soon as an incoming wire is credited to your account.',
                                },
                            ].map((item) => (
                                <div key={item.title} style={{ display: 'flex', gap: '13px', alignItems: 'flex-start' }}>
                                    <div style={{
                                        width: 34, height: 34, borderRadius: '8px', flexShrink: 0,
                                        backgroundColor: '#f1f5f9', color: '#475569',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    }}>
                                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            {item.icon}
                                        </svg>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '14.5px', fontWeight: 600, color: '#1a1a2e', marginBottom: '3px' }}>
                                            {item.title}
                                        </div>
                                        <div style={{ fontSize: '13.5px', color: '#64748b', lineHeight: 1.6 }}>
                                            {item.body}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div style={{
                            marginTop: '24px',
                            paddingTop: '18px',
                            borderTop: '1px solid #e2e8f0',
                            fontSize: '12.5px',
                            color: '#94a3b8',
                            lineHeight: 1.6,
                        }}>
                            Need help with a deposit? Contact First National Financial Support at 1 (929) 481-9744
                            or use the live chat in the corner of your screen.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
