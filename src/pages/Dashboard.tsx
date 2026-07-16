import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import transactionsData from '../lib/transactions.json';

export default function DashboardPage() {
    const navigate = useNavigate();
    const [hoveredTransaction, setHoveredTransaction] = useState<number | null>(null);
    const [isBalanceHidden, setIsBalanceHidden] = useState(false);

    const recentTransactions = transactionsData;

    return (
        <div className="app-shell fnf-dash">
            <style>{`
                .fnf-dash {
                    --navy: #0e1f3d;
                    --navy-2: #14274a;
                    --navy-deep: #0a1730;
                    --ink: #101828;
                    --gold: #c9a24a;
                    --gold-soft: #e2c47f;
                    --gold-deep: #a9832f;
                    --muted: #667085;
                    --page: #f6f4ef;
                    --border: #e7e2d6;
                    --serif: Georgia, 'Times New Roman', 'Iowan Old Style', 'Palatino Linotype', serif;
                    --sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                    font-family: var(--sans);
                    color: var(--ink);
                    display: flex;
                    min-height: 100vh;
                    background: var(--page);
                }
                .fnf-dash * { box-sizing: border-box; }
                .fnf-dash-main {
                    margin-left: 240px;
                    flex: 1;
                    min-width: 0;
                    padding: 32px;
                    max-width: 1080px;
                    width: 100%;
                }

                .fnf-welcome { margin-bottom: 30px; }
                .fnf-welcome .kick {
                    font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase;
                    color: var(--gold-deep); margin: 0 0 8px;
                }
                .fnf-welcome h1 {
                    font-family: var(--serif); font-size: 30px; font-weight: 700; color: var(--navy);
                    margin: 0 0 6px; letter-spacing: -0.4px;
                }
                .fnf-welcome p { font-size: 15px; color: var(--muted); margin: 0; }

                /* Balance card — navy hero panel with gold accents */
                .fnf-balance {
                    position: relative; overflow: hidden;
                    border-radius: 18px; padding: 34px; margin-bottom: 28px;
                    background:
                        radial-gradient(120% 120% at 88% 6%, rgba(201,162,74,0.20) 0%, transparent 44%),
                        linear-gradient(158deg, #0a1730 0%, #0e1f3d 52%, #14274a 100%);
                    color: #fff;
                    box-shadow: 0 18px 44px rgba(10,23,48,0.28);
                }
                .fnf-balance-top {
                    position: relative; z-index: 1;
                    display: flex; align-items: flex-start; justify-content: space-between; gap: 40px; flex-wrap: wrap;
                }
                .fnf-bal-label { font-size: 12px; letter-spacing: 1.5px; text-transform: uppercase; color: var(--gold-soft); margin-bottom: 8px; font-weight: 600; }
                .fnf-bal-amount { display: inline-flex; align-items: baseline; gap: 12px; margin-bottom: 10px; }
                .fnf-bal-num {
                    font-family: var(--serif); font-variant-numeric: tabular-nums;
                    letter-spacing: -0.02em; white-space: nowrap; color: #fff;
                }
                .fnf-bal-num .cur { font-size: 26px; font-weight: 700; margin-right: 5px; color: var(--gold-soft); }
                .fnf-bal-num .val { font-size: 44px; font-weight: 700; line-height: 1.05; }
                .fnf-eye {
                    display: inline-flex; align-items: center; justify-content: center;
                    width: 34px; height: 34px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.18);
                    background: rgba(255,255,255,0.08); color: rgba(255,255,255,0.85); cursor: pointer; padding: 0;
                    transition: background 0.18s ease;
                }
                .fnf-eye:hover { background: rgba(255,255,255,0.16); }
                .fnf-bal-sub { font-size: 13.5px; color: rgba(255,255,255,0.72); }
                .fnf-bal-sub strong { color: #fff; font-weight: 600; }

                .fnf-actions {
                    display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px;
                    width: 280px; margin-top: 4px;
                }
                .fnf-btn {
                    display: flex; align-items: center; justify-content: center; gap: 8px;
                    border-radius: 8px; padding: 12px 16px; font-size: 14px; font-weight: 700;
                    cursor: pointer; white-space: nowrap; transition: filter 0.18s ease, background 0.18s ease, transform 0.05s ease;
                    border: none;
                }
                .fnf-btn:active { transform: scale(0.98); }
                .fnf-btn-gold {
                    color: #1a1300; background: linear-gradient(180deg, #e2c47f 0%, #c9a24a 100%);
                    box-shadow: 0 6px 16px rgba(201,162,74,0.3);
                }
                .fnf-btn-gold:hover { filter: brightness(1.05); }
                .fnf-btn-ghost {
                    color: #fff; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.22);
                }
                .fnf-btn-ghost:hover { background: rgba(255,255,255,0.16); }

                /* Recent activity */
                .fnf-recent-head {
                    display: flex; justify-content: space-between; align-items: flex-end;
                    margin-bottom: 16px;
                }
                .fnf-recent-head .kick {
                    font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase;
                    color: var(--gold-deep); margin: 0 0 4px;
                }
                .fnf-recent-head h2 {
                    font-family: var(--serif); font-size: 22px; font-weight: 700; color: var(--navy); margin: 0;
                }
                .fnf-table-card {
                    background: #fff; border: 1px solid var(--border); border-radius: 14px; overflow: hidden;
                    box-shadow: 0 1px 2px rgba(14,31,61,0.04);
                }
                .fnf-recent-scroll { overflow-x: auto; -webkit-overflow-scrolling: touch; }
                .fnf-txn-head, .fnf-txn-row {
                    display: grid; grid-template-columns: 1.4fr 2fr 1.4fr 1fr; gap: 12px;
                    padding: 15px 22px; align-items: center; min-width: 560px;
                }
                .fnf-txn-head {
                    background: linear-gradient(180deg, #fffdf8, #faf7f0);
                    border-bottom: 1px solid var(--border);
                    color: var(--muted); font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;
                }
                .fnf-txn-head .r, .fnf-txn-row .amt { text-align: right; justify-content: flex-end; }
                .fnf-txn-row { border-bottom: 1px solid #f2efe6; transition: background 0.18s ease; }
                .fnf-txn-row:last-child { border-bottom: none; }
                .fnf-txn-date { color: var(--muted); font-size: 14px; }
                .fnf-txn-desc { color: var(--navy); font-size: 14px; font-weight: 600; }
                .fnf-txn-cat { color: var(--muted); font-size: 14px; }
                .fnf-txn-row .amt { font-size: 14px; font-weight: 700; }
                .fnf-amt-credit { color: #10794a; }
                .fnf-amt-debit { color: #b42318; }

                /* ============ RESPONSIVE ============ */
                /* .app-shell / .app-main in index.css handle the sidebar offset
                   + mobile margins, matching the other pages. */
                @media (max-width: 900px) {
                    .fnf-balance-top { flex-direction: column; gap: 26px; }
                    .fnf-actions { width: 100%; }
                    .fnf-welcome h1 { font-size: 26px; }
                }
            `}</style>

            <Sidebar />

            <main className="app-main fnf-dash-main">
                {/* Welcome */}
                <div className="fnf-welcome">
                    <p className="kick">Your Overview</p>
                    <h1>Welcome back, Stephanie</h1>
                    <p>Here's what's happening with your accounts today</p>
                </div>

                {/* Balance card */}
                <div className="fnf-balance">
                    <div className="fnf-balance-top">
                        <div>
                            <div className="fnf-bal-label">Available Balance</div>
                            <div className="fnf-bal-amount">
                                <span className="fnf-bal-num">
                                    <span className="cur">$</span>
                                    <span className="val">{isBalanceHidden ? '•••,•••.••' : '560,568.17'}</span>
                                </span>
                                <button
                                    type="button"
                                    className="fnf-eye"
                                    aria-label={isBalanceHidden ? 'Show amount' : 'Hide amount'}
                                    onClick={() => setIsBalanceHidden(v => !v)}
                                >
                                    {isBalanceHidden ? (
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20C7 20 2.73 16.11 1 12c.74-1.77 1.85-3.39 3.3-4.71" />
                                            <path d="M10.58 10.58a2 2 0 0 0 2.83 2.83" />
                                            <path d="M9.9 4.24A10.94 10.94 0 0 1 12 4c5 0 9.27 3.89 11 8-.58 1.39-1.41 2.7-2.47 3.83" />
                                            <path d="M14.12 14.12 21 21" /><path d="M3 3l7.46 7.46" />
                                        </svg>
                                    ) : (
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M2.062 12.348a1 1 0 0 1 0-.696C3.423 8.23 7.36 5 12 5c4.638 0 8.577 3.229 9.938 6.652a1 1 0 0 1 0 .696C20.577 15.77 16.64 19 12 19c-4.638 0-8.577-3.229-9.938-6.652Z" />
                                            <circle cx="12" cy="12" r="3" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                            <div className="fnf-bal-sub" style={{ marginBottom: 4 }}><strong>Checking Account</strong> — Personal</div>
                            <div className="fnf-bal-sub">Account ending in •••• 3614</div>
                        </div>

                        <div className="fnf-actions">
                            <button className="fnf-btn fnf-btn-gold">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                                Withdraw
                            </button>
                            <button className="fnf-btn fnf-btn-gold" onClick={() => navigate('/transfers')}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" /></svg>
                                Transfer
                            </button>
                            <button className="fnf-btn fnf-btn-ghost">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>
                                Statements
                            </button>
                            <button className="fnf-btn fnf-btn-ghost">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg>
                                Support
                            </button>
                        </div>
                    </div>
                </div>

                {/* Recent activity */}
                <div className="fnf-recent-head">
                    <div>
                        <p className="kick">Account Activity</p>
                        <h2>Recent Activity</h2>
                    </div>
                </div>

                <div className="fnf-table-card">
                    <div className="fnf-recent-scroll">
                        <div className="fnf-txn-head">
                            <div>Date</div>
                            <div>Description</div>
                            <div>Category</div>
                            <div className="r">Amount</div>
                        </div>
                        {recentTransactions.map((transaction) => (
                            <div
                                key={transaction.id}
                                className="fnf-txn-row"
                                onMouseEnter={() => setHoveredTransaction(transaction.id)}
                                onMouseLeave={() => setHoveredTransaction(null)}
                                style={{ background: hoveredTransaction === transaction.id ? 'var(--page)' : '#fff' }}
                            >
                                <div className="fnf-txn-date">{transaction.date}</div>
                                <div className="fnf-txn-desc">{transaction.description}</div>
                                <div className="fnf-txn-cat">{transaction.category}</div>
                                <div className={`amt ${transaction.type === 'credit' ? 'fnf-amt-credit' : 'fnf-amt-debit'}`}>
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
