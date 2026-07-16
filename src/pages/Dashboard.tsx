import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import transactionsData from '../lib/transactions.json';

export default function DashboardPage() {
    const navigate = useNavigate();

    const [hoveredTransaction, setHoveredTransaction] = useState<number | null>(null);
    const [isBalanceHidden, setIsBalanceHidden] = useState(false);

    // Data for recent transactions imported from configuration file
    const recentTransactions = transactionsData;

    return (
        <div className="app-shell" style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
            <Sidebar />
            <main className="app-main dashboard-page" style={{
                marginLeft: '240px',
                flex: 1,
                padding: '32px',
                maxWidth: 'calc(100% - 240px)'
            }}>
                {/* Welcome Header */}
                <div className="dashboard-welcome" style={{ marginBottom: '32px' }}>
                    <h1 style={{
                        fontSize: '28px',
                        fontWeight: '700',
                        color: '#1a1a2e',
                        margin: 0,
                        marginBottom: '8px'
                    }}>
                        Welcome back, Stephanie
                    </h1>
                    <p style={{
                        fontSize: '15px',
                        color: '#64748b',
                        margin: 0
                    }}>
                        Here's what's happening with your accounts today
                    </p>
                </div>

                {/* Balance Card */}
                <div className="dashboard-balance-card" style={{
                    backgroundColor: 'white',
                    borderRadius: '16px',
                    padding: '32px',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
                    marginBottom: '32px'
                }}>
                    <div className="dashboard-balance-top" style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '64px',
                        marginBottom: '32px'
                    }}>
                        <div>
                            <div style={{
                                fontSize: '14px',
                                color: '#64748b',
                                marginBottom: '4px'
                            }}>
                                Available Balance
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                                <div
                                    className="dashboard-balance-amount"
                                    aria-label="Available balance"
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'baseline',
                                        whiteSpace: 'nowrap',
                                        fontFamily: 'ui-sans-serif, system-ui, -apple-system, "SF Pro Display", "SF Pro Text", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
                                        fontVariantNumeric: 'tabular-nums',
                                        fontFeatureSettings: '"tnum" 1, "lnum" 1',
                                        letterSpacing: '-0.03em',
                                        WebkitFontSmoothing: 'antialiased',
                                        MozOsxFontSmoothing: 'grayscale'
                                    }}
                                >
                                    <span style={{ display: 'inline-flex', alignItems: 'baseline', minWidth: '13ch' }}>
                                        <span style={{ fontSize: '28px', fontWeight: '700', color: '#0f172a', marginRight: '6px' }}>$</span>
                                        <span style={{ fontSize: '42px', fontWeight: '800', color: '#0f172a', lineHeight: 1.08 }}>
                                            {isBalanceHidden ? '•••,•••.••' : '560,568.17'}
                                        </span>
                                    </span>
                                </div>
                                <button
                                    type="button"
                                    aria-label={isBalanceHidden ? 'Show amount' : 'Hide amount'}
                                    onClick={() => setIsBalanceHidden((v) => !v)}
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        width: '32px',
                                        height: '32px',
                                        borderRadius: '10px',
                                        border: 'none',
                                        backgroundColor: 'rgba(15, 23, 42, 0.06)',
                                        color: '#475569',
                                        cursor: 'pointer',
                                        padding: 0,
                                        flex: '0 0 auto'
                                    }}
                                >
                                    {isBalanceHidden ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20C7 20 2.73 16.11 1 12c.74-1.77 1.85-3.39 3.3-4.71" />
                                            <path d="M10.58 10.58a2 2 0 0 0 2.83 2.83" />
                                            <path d="M9.9 4.24A10.94 10.94 0 0 1 12 4c5 0 9.27 3.89 11 8-0.58 1.39-1.41 2.7-2.47 3.83" />
                                            <path d="M14.12 14.12 21 21" />
                                            <path d="M3 3l7.46 7.46" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M2.062 12.348a1 1 0 0 1 0-.696C3.423 8.23 7.36 5 12 5c4.638 0 8.577 3.229 9.938 6.652a1 1 0 0 1 0 .696C20.577 15.77 16.64 19 12 19c-4.638 0-8.577-3.229-9.938-6.652Z" />
                                            <circle cx="12" cy="12" r="3" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                            <div style={{
                                fontSize: '14px',
                                color: '#64748b',
                                marginBottom: '8px'
                            }}>
                                Checking Account - Personal
                            </div>
                            <div style={{
                                fontSize: '14px',
                                color: '#64748b'
                            }}>
                                Account ending in **** 3614
                            </div>
                        </div>
                        <div className="dashboard-balance-actions" style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(2, 1fr)',
                            gap: '8px',
                            width: '240px',
                            marginTop: '24px'
                        }}>
                            {/* Top Row - Dark Buttons */}
                            <button style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                                backgroundColor: '#1e3a8a',
                                color: 'white',
                                border: 'none',
                                borderRadius: '6px',
                                padding: '10px 16px',
                                fontSize: '14px',
                                fontWeight: '600',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                whiteSpace: 'nowrap'
                            }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="12" y1="5" x2="12" y2="19"></line>
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                </svg>
                                Withdraw
                            </button>
                            <button
                                onClick={() => navigate('/transfers')}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '8px',
                                    backgroundColor: '#1e3a8a',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '6px',
                                    padding: '10px 16px',
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    whiteSpace: 'nowrap'
                                }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
                                    <polyline points="16 7 22 7 22 13"></polyline>
                                </svg>
                                Transfer
                            </button>

                            {/* Bottom Row - Light Buttons */}
                            <button style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                                backgroundColor: 'white',
                                color: '#1a1a2e',
                                border: '1px solid #e2e8f0',
                                borderRadius: '6px',
                                padding: '10px 16px',
                                fontSize: '14px',
                                fontWeight: '600',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                whiteSpace: 'nowrap'
                            }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                    <polyline points="14 2 14 8 20 8"></polyline>
                                    <line x1="16" y1="13" x2="8" y2="13"></line>
                                    <line x1="16" y1="17" x2="8" y2="17"></line>
                                    <polyline points="10 9 9 9 8 9"></polyline>
                                </svg>
                                Statements
                            </button>
                            <button style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                                backgroundColor: 'white',
                                color: '#1a1a2e',
                                border: '1px solid #e2e8f0',
                                borderRadius: '6px',
                                padding: '10px 16px',
                                fontSize: '14px',
                                fontWeight: '600',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                whiteSpace: 'nowrap'
                            }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                                </svg>
                                Support
                            </button>
                        </div>
                    </div>

                    {/* Recent Activity Section */}
                    <div className="dashboard-recent-header" style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: '32px',
                        marginBottom: '16px'
                    }}>
                        <h2 style={{
                            fontSize: '20px',
                            fontWeight: '600',
                            color: '#1a1a2e',
                            margin: 0
                        }}>
                            Recent Activity
                        </h2>
                    </div>

                    <div className="dashboard-recent-scroll" style={{
                        backgroundColor: 'white',
                        borderRadius: '12px',
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
                        overflow: 'hidden'
                    }}>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: '1.5fr 2fr 1.5fr 1fr',
                            padding: '16px 24px',
                            backgroundColor: '#f8f9fa',
                            borderBottom: '1px solid #e2e8f0',
                            color: '#64748b',
                            fontSize: '12px',
                            fontWeight: '600',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em'
                        }}>
                            <div>Date</div>
                            <div>Description</div>
                            <div>Category</div>
                            <div style={{ textAlign: 'right' }}>Amount</div>
                        </div>

                        {recentTransactions.map((transaction, index) => (
                            <div
                                key={transaction.id}
                                onMouseEnter={() => setHoveredTransaction(transaction.id)}
                                onMouseLeave={() => setHoveredTransaction(null)}
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: '1.5fr 2fr 1.5fr 1fr',
                                    padding: '16px 24px',
                                    borderBottom: index < recentTransactions.length - 1 ? '1px solid #f1f5f9' : 'none',
                                    transition: 'background-color 0.2s',
                                    backgroundColor: hoveredTransaction === transaction.id ? '#f8fafc' : 'white'
                                }}
                            >
                                <div style={{
                                    color: '#64748b',
                                    fontSize: '14px',
                                    display: 'flex',
                                    alignItems: 'center'
                                }}>
                                    {transaction.date}
                                </div>
                                <div style={{
                                    color: '#1a1a2e',
                                    fontSize: '14px',
                                    fontWeight: '500',
                                    display: 'flex',
                                    alignItems: 'center'
                                }}>
                                    {transaction.description}
                                </div>
                                <div style={{
                                    color: '#64748b',
                                    fontSize: '14px',
                                    display: 'flex',
                                    alignItems: 'center'
                                }}>
                                    {transaction.category}
                                </div>
                                <div style={{
                                    color: transaction.type === 'credit' ? '#10b981' : '#ef4444',
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    textAlign: 'right',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'flex-end'
                                }}>
                                    {transaction.amount}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
