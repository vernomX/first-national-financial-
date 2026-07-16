import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { TrendingUp, Plus, Eye, EyeOff } from 'lucide-react';

const InvestmentsPage = () => {
    const [isBalanceHidden, setIsBalanceHidden] = useState(false);

    // Sample data based on the provided UI design
    const holdings = [
        { asset: 'AAPL - Apple Inc.', portfolio: '18.5%', value: '$230,449.60', gain: '+$2,105.12', isPositive: true },
        { asset: 'MSFT - Microsoft Corp.', portfolio: '15.2%', value: '$189,343.19', gain: '+$1,540.29', isPositive: true },
        { asset: 'TSLA - Tesla, Inc.', portfolio: '12.8%', value: '$159,446.89', gain: '-$890.11', isPositive: false },
        { asset: 'VOO - Vanguard S&P 500 ETF', portfolio: '25.0%', value: '$311,419.72', gain: '+$3,412.88', isPositive: true },
        { asset: 'VTI - Vanguard Total Stock Market ETF', portfolio: '18.5%', value: '$230,449.60', gain: '+$2,987.43', isPositive: true },
    ];

    const allocation = [
        { name: 'US Equities', value: '60%', color: '#0056b3' },
        { name: 'International ETFs', value: '25%', color: '#00c389' },
        { name: 'Bonds', value: '10%', color: '#6c757d' },
        { name: 'Cash', value: '5%', color: '#e9ecef' },
    ];

    return (
        <div className="app-shell" style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
            <Sidebar />
            <main className="app-main investments-page" style={{
                marginLeft: '240px',
                flex: 1,
                padding: '32px',
                maxWidth: 'calc(100% - 240px)'
            }}>
                {/* Header Section */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '32px'
                }}>
                    <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#1a1a2e', margin: 0 }}>Investments</h1>
                    <button style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        backgroundColor: '#041536',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '10px 16px',
                        fontSize: '14px',
                        fontWeight: '600',
                        cursor: 'pointer'
                    }}>
                        <Plus size={18} />
                        New Investment
                    </button>
                </div>

                {/* Summary Metrics */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px', marginBottom: '32px' }}>
                    {/* Portfolio Value Card */}
                    <div style={{
                        backgroundColor: 'white',
                        padding: '24px',
                        borderRadius: '12px',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                            <div style={{ fontSize: '14px', color: '#64748b' }}>Total Portfolio Value</div>
                            <button
                                onClick={() => setIsBalanceHidden(!isBalanceHidden)}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    color: '#64748b',
                                    cursor: 'pointer',
                                    padding: '4px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                {isBalanceHidden ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                        <div style={{ fontSize: '32px', fontWeight: '700', color: '#1a1a2e' }}>
                            {isBalanceHidden ? "$ ••••••••" : "$1,245,678.90"}
                        </div>
                    </div>

                    {/* Today's Performance Card */}
                    <div style={{
                        backgroundColor: 'white',
                        padding: '24px',
                        borderRadius: '12px',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                    }}>
                        <div style={{ fontSize: '14px', color: '#64748b', marginBottom: '8px' }}>Today's Performance</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '32px', fontWeight: '700', color: '#1a1a2e' }}>+1.14%</span>
                            <div style={{ display: 'flex', alignItems: 'center', color: '#10b981', fontSize: '14px', fontWeight: '600' }}>
                                <TrendingUp size={16} style={{ marginRight: '4px' }} />
                                +$14,082.02
                            </div>
                        </div>
                    </div>
                </div>

                {/* Charts Section */}
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px', marginBottom: '32px' }}>
                    {/* Portfolio Performance */}
                    <div style={{
                        backgroundColor: 'white',
                        padding: '24px',
                        borderRadius: '12px',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                    }}>
                        <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '4px' }}>Portfolio Performance</h2>
                        <div style={{ fontSize: '14px', color: '#64748b', marginBottom: '24px' }}>Last 6 Months</div>
                        <div style={{ height: '300px', position: 'relative' }}>
                            {/* SVG Chart Replica */}
                            <svg width="100%" height="100%" viewBox="0 0 800 300" preserveAspectRatio="none">
                                <path
                                    d="M0,250 Q100,200 150,220 T300,180 T450,200 T600,150 T800,180"
                                    fill="none"
                                    stroke="#041536"
                                    strokeWidth="3"
                                />
                                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#041536" stopOpacity="0.1" />
                                    <stop offset="100%" stopColor="#041536" stopOpacity="0" />
                                </linearGradient>
                                <path
                                    d="M0,250 Q100,200 150,220 T300,180 T450,200 T600,150 T800,180 L800,300 L0,300 Z"
                                    fill="url(#chartGradient)"
                                />
                                {/* Bottom Axis */}
                                <line x1="0" y1="280" x2="800" y2="280" stroke="#f1f5f9" strokeWidth="1" />
                                <g style={{ fontSize: '12px', fill: '#94a3b8' }}>
                                    <text x="0" y="300">Jan</text>
                                    <text x="160" y="300">Feb</text>
                                    <text x="320" y="300">Mar</text>
                                    <text x="480" y="300">Apr</text>
                                    <text x="640" y="300">May</text>
                                    <text x="770" y="300">Jun</text>
                                </g>
                            </svg>
                        </div>
                    </div>

                    {/* Asset Allocation */}
                    <div style={{
                        backgroundColor: 'white',
                        padding: '24px',
                        borderRadius: '12px',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                    }}>
                        <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '4px' }}>Asset Allocation</h2>
                        <div style={{ fontSize: '14px', color: '#64748b', marginBottom: '24px' }}>By Asset Class</div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
                            <div style={{ position: 'relative', width: '160px', height: '160px' }}>
                                <svg width="160" height="160" viewBox="0 0 160 160">
                                    <circle cx="80" cy="80" r="70" fill="none" stroke="#e9ecef" strokeWidth="20" />
                                    <circle cx="80" cy="80" r="70" fill="none" stroke="#0056b3" strokeWidth="20" strokeDasharray="440" strokeDashoffset="176" strokeLinecap="round" />
                                    <circle cx="80" cy="80" r="70" fill="none" stroke="#00c389" strokeWidth="20" strokeDasharray="440" strokeDashoffset="330" strokeLinecap="round" transform="rotate(-90 80 80)" />
                                    <circle cx="80" cy="80" r="70" fill="none" stroke="#6c757d" strokeWidth="20" strokeDasharray="440" strokeDashoffset="396" strokeLinecap="round" transform="rotate(-180 80 80)" />
                                </svg>
                            </div>
                            <div style={{ width: '100%' }}>
                                {allocation.map((item, idx) => (
                                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: item.color }}></div>
                                            <span style={{ fontSize: '14px', color: '#1a1a2e' }}>{item.name}</span>
                                        </div>
                                        <span style={{ fontSize: '14px', fontWeight: '600', color: '#1a1a2e' }}>{item.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* My Holdings Table Section */}
                <div style={{
                    backgroundColor: 'white',
                    padding: '24px',
                    borderRadius: '12px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                    overflow: 'hidden'
                }}>
                    <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '24px' }}>My Holdings</h2>
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid #f1f5f9', textAlign: 'left' }}>
                                    <th style={{ padding: '12px 0', fontSize: '12px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase' }}>Asset</th>
                                    <th style={{ padding: '12px 0', fontSize: '12px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', textAlign: 'right' }}>Portfolio %</th>
                                    <th style={{ padding: '12px 0', fontSize: '12px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', textAlign: 'right' }}>Value</th>
                                    <th style={{ padding: '12px 0', fontSize: '12px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', textAlign: 'right' }}>Daily Gain/Loss</th>
                                </tr>
                            </thead>
                            <tbody>
                                {holdings.map((holding, idx) => (
                                    <tr key={idx} style={{ borderBottom: idx < holdings.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
                                        <td style={{ padding: '16px 0', fontSize: '14px', fontWeight: '600', color: '#1a1a2e' }}>{holding.asset}</td>
                                        <td style={{ padding: '16px 0', fontSize: '14px', color: '#64748b', textAlign: 'right' }}>{holding.portfolio}</td>
                                        <td style={{ padding: '16px 0', fontSize: '14px', color: '#1a1a2e', fontWeight: '500', textAlign: 'right' }}>{holding.value}</td>
                                        <td style={{
                                            padding: '16px 0',
                                            fontSize: '14px',
                                            fontWeight: '600',
                                            color: holding.isPositive ? '#10b981' : '#ef4444',
                                            textAlign: 'right'
                                        }}>
                                            {holding.gain}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default InvestmentsPage;
