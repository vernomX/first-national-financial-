import { useState } from 'react';
import Sidebar from '../components/Sidebar';

/* ---- Clean line icons per category (navy/gold, no emoji) ---- */
function CategoryIcon({ category }: { category: string }) {
    const common = {
        width: 24, height: 24, viewBox: '0 0 24 24', fill: 'none',
        stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const,
    };
    switch (category) {
        case 'Electricity':
            return <svg {...common}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>;
        case 'Water':
            return <svg {...common}><path d="M12 2.5S5 10 5 14.5a7 7 0 0 0 14 0C19 10 12 2.5 12 2.5z" /></svg>;
        case 'Internet':
            return <svg {...common}><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>;
        case 'Mobile Phone':
            return <svg {...common}><rect x="7" y="2" width="10" height="20" rx="2" /><line x1="11" y1="18" x2="13" y2="18" /></svg>;
        case 'Credit Card':
            return <svg {...common}><rect x="2" y="5" width="20" height="14" rx="2" /><line x1="2" y1="10" x2="22" y2="10" /></svg>;
        case 'Mortgage':
            return <svg {...common}><path d="M3 11l9-7 9 7" /><path d="M5 10v10h14V10" /><path d="M10 20v-6h4v6" /></svg>;
        case 'Insurance':
            return <svg {...common}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" /></svg>;
        case 'Streaming Services':
            return <svg {...common}><polygon points="5 3 19 12 5 21 5 3" /></svg>;
        default:
            return <svg {...common}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>;
    }
}

export default function BillPayPage() {
    const [, setHoveredItem] = useState<string | null>(null);
    const [hoveredTransaction, setHoveredTransaction] = useState<number | null>(null);
    const [formData, setFormData] = useState({
        billerName: '',
        amount: '',
        fromAccount: 'checking-1234',
        paymentDate: new Date().toISOString().split('T')[0],
    });
    const [isLoading, setIsLoading] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const account = {
        id: 'checking-1234',
        name: 'Checking Account',
        lastFour: '3614',
        balance: 560568.17,
        type: 'Personal',
    };

    const billCategories = [
        'Electricity', 'Water', 'Internet', 'Mobile Phone',
        'Credit Card', 'Mortgage', 'Insurance', 'Streaming Services',
    ];

    const [recentPayments, setRecentPayments] = useState([
        { id: 1, payee: 'Electric Company', amount: 125.75, date: '2025-11-15', status: 'Completed' },
        { id: 2, payee: 'Water Utility', amount: 45.20, date: '2025-11-10', status: 'Completed' },
        { id: 3, payee: 'Internet Provider', amount: 79.99, date: '2025-11-05', status: 'Completed' },
        { id: 4, payee: 'Mobile Carrier', amount: 65.00, date: '2025-10-28', status: 'Completed' },
    ]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleBillerSelect = (biller: string) => {
        setFormData(prev => ({ ...prev, billerName: biller }));
        setShowSuggestions(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        const newPayment = {
            id: recentPayments.length + 1,
            payee: formData.billerName,
            amount: parseFloat(formData.amount),
            date: new Date().toISOString().split('T')[0],
            status: 'Pending',
        };
        setRecentPayments([newPayment, ...recentPayments]);
        setFormData({
            billerName: '',
            amount: '',
            fromAccount: 'checking-1234',
            paymentDate: new Date().toISOString().split('T')[0],
        });
        setIsLoading(false);
    };

    return (
        <div className="app-shell fnf-billpay">
            <style>{`
                .fnf-billpay {
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
                .fnf-billpay * { box-sizing: border-box; }
                .fnf-bp-main {
                    margin-left: 240px;
                    flex: 1;
                    min-width: 0;
                    padding: 32px;
                    max-width: 960px;
                    width: 100%;
                }
                .fnf-bp-header {
                    display: flex; justify-content: space-between; align-items: flex-end;
                    margin-bottom: 28px; padding-bottom: 20px;
                    border-bottom: 1px solid var(--border);
                }
                .fnf-bp-header h1 {
                    font-family: var(--serif); font-size: 28px; font-weight: 700;
                    color: var(--navy); margin: 0 0 4px; letter-spacing: -0.3px;
                }
                .fnf-bp-header p { margin: 0; color: var(--muted); font-size: 14px; }

                .fnf-bp-card {
                    background: #fff; border: 1px solid var(--border); border-radius: 14px;
                    padding: 26px; margin-bottom: 22px; width: 100%;
                    box-shadow: 0 1px 2px rgba(14,31,61,0.04);
                }
                .fnf-bp-card h2 {
                    font-family: var(--serif); font-size: 19px; font-weight: 700; color: var(--navy);
                    margin: 0 0 4px;
                }
                .fnf-bp-kicker {
                    font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase;
                    color: var(--gold-deep); margin: 0 0 18px;
                }

                /* Category grid — compact, professional */
                .fnf-cat-grid {
                    display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px;
                }
                .fnf-cat {
                    display: flex; flex-direction: column; align-items: center; gap: 10px;
                    padding: 18px 10px; border-radius: 10px; border: 1px solid var(--border);
                    background: #fff; cursor: pointer; transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease;
                }
                .fnf-cat:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 12px 26px rgba(14,31,61,0.1);
                    border-color: #d8d0be;
                }
                .fnf-cat-ic {
                    width: 44px; height: 44px; border-radius: 11px;
                    background: linear-gradient(160deg, #16294c, #0e1f3d);
                    color: var(--gold-soft);
                    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
                }
                .fnf-cat span {
                    font-size: 13px; font-weight: 600; color: var(--navy); text-align: center; line-height: 1.25;
                }

                /* Form */
                .fnf-field { margin-bottom: 18px; }
                .fnf-label { display: block; margin-bottom: 8px; font-size: 13px; font-weight: 600; color: #344054; }
                .fnf-input {
                    width: 100%; padding: 12px 14px; border: 1px solid var(--border); border-radius: 8px;
                    font-size: 15px; font-family: var(--sans); background: #fff; color: var(--ink);
                    transition: border-color 0.18s ease, box-shadow 0.18s ease;
                }
                .fnf-input:focus {
                    outline: none; border-color: var(--gold); box-shadow: 0 0 0 3px rgba(201,162,74,0.15);
                }
                .fnf-input-wrap { position: relative; }
                .fnf-amt-prefix {
                    position: absolute; left: 14px; top: 50%; transform: translateY(-50%);
                    color: var(--muted); font-weight: 600;
                }
                .fnf-suggest {
                    position: absolute; top: 100%; left: 0; right: 0; background: #fff;
                    border: 1px solid var(--border); border-radius: 8px; box-shadow: 0 10px 30px rgba(14,31,61,0.12);
                    z-index: 10; margin-top: 6px; max-height: 240px; overflow-y: auto; padding: 4px;
                }
                .fnf-suggest-item {
                    padding: 10px 12px; cursor: pointer; display: flex; align-items: center; gap: 12px;
                    border-radius: 6px; transition: background 0.15s ease;
                }
                .fnf-suggest-item:hover { background: var(--page); }
                .fnf-suggest-ic {
                    width: 32px; height: 32px; border-radius: 8px;
                    background: linear-gradient(160deg, #16294c, #0e1f3d); color: var(--gold-soft);
                    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
                }
                .fnf-suggest-item span { font-weight: 600; color: var(--navy); font-size: 14px; }

                .fnf-account {
                    width: 100%; padding: 18px; border: 1px solid var(--border); border-radius: 12px;
                    background: linear-gradient(160deg, #fffdf8, #faf7f0);
                }
                .fnf-account-top { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; margin-bottom: 4px; }
                .fnf-account-name { font-weight: 700; color: var(--navy); font-size: 15px; }
                .fnf-account-bal { font-family: var(--serif); font-weight: 700; color: var(--navy); font-size: 18px; white-space: nowrap; }
                .fnf-account-sub { display: flex; justify-content: space-between; font-size: 12.5px; color: var(--muted); }

                .fnf-pay-btn {
                    width: 100%; padding: 15px; border: none; border-radius: 8px;
                    font-size: 16px; font-weight: 700; letter-spacing: 0.3px; cursor: pointer;
                    color: #1a1300; background: linear-gradient(180deg, #e2c47f 0%, #c9a24a 100%);
                    box-shadow: 0 8px 22px rgba(201,162,74,0.28);
                    display: flex; align-items: center; justify-content: center; gap: 9px;
                    transition: filter 0.18s ease, transform 0.05s ease;
                }
                .fnf-pay-btn:hover:not(:disabled) { filter: brightness(1.05); }
                .fnf-pay-btn:active:not(:disabled) { transform: scale(0.99); }
                .fnf-pay-btn:disabled { cursor: wait; opacity: 0.85; }
                .fnf-spin {
                    width: 16px; height: 16px; border: 2px solid rgba(26,19,0,0.3);
                    border-radius: 50%; border-top-color: #1a1300; animation: fnf-spin 0.8s linear infinite;
                }
                @keyframes fnf-spin { to { transform: rotate(360deg); } }

                /* Recent table */
                .fnf-recent-scroll { overflow-x: auto; -webkit-overflow-scrolling: touch; }
                .fnf-table { width: 100%; border-collapse: collapse; min-width: 460px; }
                .fnf-table th {
                    text-align: left; padding: 12px 14px; color: var(--muted); font-weight: 600;
                    font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em;
                    border-bottom: 1px solid var(--border);
                }
                .fnf-table th.r, .fnf-table td.r { text-align: right; }
                .fnf-table td { padding: 15px 14px; font-size: 14px; border-bottom: 1px solid #f2efe6; }
                .fnf-table tr:last-child td { border-bottom: none; }
                .fnf-table .payee { color: var(--navy); font-weight: 600; }
                .fnf-table .amt { color: var(--navy); font-weight: 700; }
                .fnf-table .date { color: var(--muted); }
                .fnf-badge {
                    display: inline-block; padding: 4px 10px; border-radius: 999px;
                    font-size: 11.5px; font-weight: 600;
                }
                .fnf-badge.completed { background: #e6f7ee; color: #10794a; }
                .fnf-badge.pending { background: #fdf3e0; color: #a9832f; }

                /* ============ RESPONSIVE ============ */
                /* Note: .app-main / .app-shell (in index.css) handle the sidebar
                   offset and mobile margins — matching the other pages. These
                   rules only tune this page's own grid + header. */
                @media (max-width: 900px) {
                    .fnf-cat-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
                    .fnf-bp-header { align-items: flex-start; }
                }
                @media (max-width: 380px) {
                    .fnf-cat span { font-size: 12px; }
                }
            `}</style>

            <Sidebar />

            <div className="app-main fnf-bp-main">
                <header className="fnf-bp-header">
                    <div>
                        <h1>Bill Pay</h1>
                        <p>Pay your bills quickly and securely</p>
                    </div>
                </header>

                {/* Categories */}
                <div className="fnf-bp-card">
                    <h2>Bill Categories</h2>
                    <p className="fnf-bp-kicker">Choose a biller</p>
                    <div className="fnf-cat-grid">
                        {billCategories.map((category) => (
                            <div
                                key={category}
                                className="fnf-cat"
                                onMouseEnter={() => setHoveredItem(category)}
                                onMouseLeave={() => setHoveredItem(null)}
                                onClick={() => handleBillerSelect(category)}
                            >
                                <div className="fnf-cat-ic"><CategoryIcon category={category} /></div>
                                <span>{category}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Pay a Bill */}
                <div className="fnf-bp-card">
                    <h2>Pay a Bill</h2>
                    <p className="fnf-bp-kicker">Payment details</p>
                    <form onSubmit={handleSubmit}>
                        <div className="fnf-field">
                            <label className="fnf-label" htmlFor="billerName">Payee Name</label>
                            <div className="fnf-input-wrap">
                                <input
                                    type="text" id="billerName" name="billerName"
                                    className="fnf-input"
                                    value={formData.billerName}
                                    onChange={handleInputChange}
                                    onFocus={() => setShowSuggestions(true)}
                                    placeholder="Search payee"
                                    required
                                />
                                {showSuggestions && (
                                    <div className="fnf-suggest">
                                        {billCategories.map((category) => (
                                            <div key={category} className="fnf-suggest-item" onClick={() => handleBillerSelect(category)}>
                                                <div className="fnf-suggest-ic"><CategoryIcon category={category} /></div>
                                                <span>{category}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="fnf-field">
                            <label className="fnf-label" htmlFor="amount">Amount</label>
                            <div className="fnf-input-wrap">
                                <span className="fnf-amt-prefix">$</span>
                                <input
                                    type="number" id="amount" name="amount"
                                    className="fnf-input"
                                    style={{ paddingLeft: '30px' }}
                                    value={formData.amount}
                                    onChange={handleInputChange}
                                    step="0.01" min="0.01"
                                    placeholder="0.00"
                                    required
                                />
                            </div>
                        </div>

                        <div className="fnf-field">
                            <label className="fnf-label">From Account</label>
                            <div className="fnf-account">
                                <div className="fnf-account-top">
                                    <span className="fnf-account-name">{account.name} - {account.type} (**{account.lastFour})</span>
                                    <span className="fnf-account-bal">${account.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                                </div>
                                <div className="fnf-account-sub">
                                    <span>{account.type} Account</span>
                                    <span>Available Balance</span>
                                </div>
                            </div>
                        </div>

                        <div className="fnf-field">
                            <label className="fnf-label" htmlFor="paymentDate">Payment Date</label>
                            <input
                                type="date" id="paymentDate" name="paymentDate"
                                className="fnf-input"
                                style={{ cursor: 'pointer' }}
                                value={formData.paymentDate}
                                onChange={handleInputChange}
                                min={new Date().toISOString().split('T')[0]}
                                required
                            />
                        </div>

                        <button type="submit" className="fnf-pay-btn" disabled={isLoading}>
                            {isLoading ? (
                                <><span className="fnf-spin" />Processing...</>
                            ) : (
                                <>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
                                    </svg>
                                    Pay Bill
                                </>
                            )}
                        </button>
                    </form>
                </div>

                {/* Recent Payments */}
                <div className="fnf-bp-card" style={{ marginBottom: '40px' }}>
                    <h2>Recent Bills Payment</h2>
                    <p className="fnf-bp-kicker">Payment history</p>
                    {recentPayments.length > 0 ? (
                        <div className="fnf-recent-scroll">
                            <table className="fnf-table">
                                <thead>
                                    <tr>
                                        <th>Payee</th>
                                        <th className="r">Amount</th>
                                        <th className="r">Date</th>
                                        <th className="r">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentPayments.map((payment) => (
                                        <tr
                                            key={payment.id}
                                            style={{ background: hoveredTransaction === payment.id ? 'var(--page)' : 'transparent', transition: 'background 0.2s' }}
                                            onMouseEnter={() => setHoveredTransaction(payment.id)}
                                            onMouseLeave={() => setHoveredTransaction(null)}
                                        >
                                            <td className="payee">{payment.payee}</td>
                                            <td className="r amt">${payment.amount.toFixed(2)}</td>
                                            <td className="r date">
                                                {new Date(payment.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                                            </td>
                                            <td className="r">
                                                <span className={`fnf-badge ${payment.status === 'Pending' ? 'pending' : 'completed'}`}>{payment.status}</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 0', color: 'var(--muted)', textAlign: 'center' }}>
                            <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'var(--page)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, color: 'var(--gold-deep)' }}>
                                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                            </div>
                            <h3 style={{ fontSize: 16, fontWeight: 700, color: '#344054', margin: '0 0 8px', fontFamily: 'var(--serif)' }}>No recent payments</h3>
                            <p style={{ margin: 0, fontSize: 14, maxWidth: 300 }}>Your recent bill payments will appear here once you make a payment.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
