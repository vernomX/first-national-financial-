import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/* Gold columns emblem — the bank mark */
function Emblem({ size = 40 }: { size?: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
            <defs>
                <linearGradient id="fnfGold" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#E8C877" />
                    <stop offset="0.5" stopColor="#C9A24A" />
                    <stop offset="1" stopColor="#A9832F" />
                </linearGradient>
            </defs>
            <g stroke="url(#fnfGold)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none">
                <path d="M24 5 L41 15 L7 15 Z" />
                <path d="M9 15 L9 34" />
                <path d="M17 15 L17 34" />
                <path d="M31 15 L31 34" />
                <path d="M39 15 L39 34" />
                <path d="M6 40 L42 40" />
                <path d="M9 34 L39 34" />
            </g>
        </svg>
    );
}

export default function LandingPage() {
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const goToLogin = () => navigate('/login');

    return (
        <div className="fnf">
            <style>{`
                .fnf {
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
                    background: #fff;
                    overflow-x: hidden;
                }
                .fnf * { box-sizing: border-box; }
                .fnf-wrap { max-width: 1180px; margin: 0 auto; padding: 0 24px; }

                /* ---------- Header ---------- */
                .fnf-header {
                    position: sticky; top: 0; z-index: 50;
                    background: rgba(255,255,255,0.94);
                    backdrop-filter: saturate(180%) blur(12px);
                    -webkit-backdrop-filter: saturate(180%) blur(12px);
                    border-bottom: 1px solid var(--border);
                }
                .fnf-header-in {
                    max-width: 1180px; margin: 0 auto; padding: 15px 24px;
                    display: flex; align-items: center; justify-content: space-between; gap: 16px;
                }
                .fnf-brand { display: flex; align-items: center; gap: 12px; cursor: pointer; user-select: none; }
                .fnf-brand-txt { display: flex; flex-direction: column; line-height: 1.05; }
                .fnf-brand-name {
                    font-family: var(--serif);
                    font-size: 1.18rem; font-weight: 700; color: var(--navy);
                    letter-spacing: 0.2px; white-space: nowrap;
                }
                .fnf-brand-sub {
                    font-size: 0.62rem; font-weight: 600; letter-spacing: 2.5px;
                    text-transform: uppercase; color: var(--gold-deep); margin-top: 3px;
                }
                .fnf-nav { display: flex; align-items: center; gap: 34px; }
                .fnf-nav a {
                    color: #334155; font-size: 0.9rem; font-weight: 600;
                    text-decoration: none; letter-spacing: 0.2px; transition: color 0.15s ease; position: relative;
                }
                .fnf-nav a::after {
                    content: ''; position: absolute; left: 0; bottom: -6px; width: 0; height: 2px;
                    background: var(--gold); transition: width 0.2s ease;
                }
                .fnf-nav a:hover { color: var(--navy); }
                .fnf-nav a:hover::after { width: 100%; }

                .fnf-signin {
                    background: var(--navy); color: #fff; border: none;
                    padding: 11px 24px; border-radius: 4px; font-size: 0.9rem; font-weight: 600;
                    cursor: pointer; letter-spacing: 0.3px; min-height: 44px;
                    border: 1px solid var(--navy);
                    transition: background 0.18s ease, transform 0.05s ease;
                }
                .fnf-signin:hover { background: var(--navy-2); }
                .fnf-signin:active { transform: scale(0.98); }

                .fnf-burger {
                    display: none; background: none; border: none; cursor: pointer; padding: 8px;
                    color: var(--navy); min-width: 44px; min-height: 44px; align-items: center; justify-content: center;
                }
                .fnf-mobile {
                    display: none; flex-direction: column; padding: 8px 24px 22px;
                    border-top: 1px solid var(--border); background: #fff;
                }
                .fnf-mobile a {
                    padding: 15px 4px; color: var(--ink); font-size: 1rem; font-weight: 600;
                    text-decoration: none; border-bottom: 1px solid #f1efe8;
                }
                .fnf-mobile .fnf-signin { margin-top: 18px; width: 100%; }

                /* ---------- Hero ---------- */
                .fnf-hero {
                    position: relative; overflow: hidden;
                    background:
                        radial-gradient(120% 120% at 85% 8%, rgba(201,162,74,0.18) 0%, transparent 42%),
                        linear-gradient(158deg, #0a1730 0%, #0e1f3d 46%, #14274a 100%);
                    color: #fff;
                    min-height: calc(100vh - 74px);
                    display: flex; align-items: center;
                }
                .fnf-hero::before {
                    content: ''; position: absolute; inset: 0;
                    background-image:
                        linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px);
                    background-size: 64px 64px;
                    mask-image: radial-gradient(120% 90% at 50% 20%, #000 30%, transparent 75%);
                    -webkit-mask-image: radial-gradient(120% 90% at 50% 20%, #000 30%, transparent 75%);
                    pointer-events: none;
                }
                .fnf-hero-in { position: relative; z-index: 1; padding: 72px 24px 88px; max-width: 1180px; margin: 0 auto; width: 100%; }
                .fnf-hero-in > * { max-width: 780px; }
                .fnf-eyebrow {
                    display: inline-flex; align-items: center; gap: 9px;
                    background: rgba(201,162,74,0.12); border: 1px solid rgba(201,162,74,0.4);
                    color: var(--gold-soft); padding: 8px 16px; border-radius: 999px;
                    font-size: 0.78rem; font-weight: 700; letter-spacing: 0.6px;
                    margin-bottom: 28px;
                }
                .fnf-hero h1 {
                    font-family: var(--serif); font-weight: 700;
                    font-size: clamp(2.4rem, 5.4vw, 4rem); line-height: 1.06;
                    letter-spacing: -0.5px; margin: 0 0 24px; color: #fff;
                }
                .fnf-hero h1 .accent { color: var(--gold-soft); font-style: italic; }
                .fnf-hero p {
                    font-size: clamp(1.02rem, 1.7vw, 1.22rem); line-height: 1.65;
                    color: rgba(255,255,255,0.82); margin: 0 0 40px; max-width: 580px;
                }
                .fnf-cta { display: flex; gap: 14px; flex-wrap: wrap; }
                .fnf-btn-gold {
                    background: linear-gradient(180deg, #e2c47f 0%, #c9a24a 100%);
                    color: #1a1300; border: none; padding: 16px 34px; border-radius: 4px;
                    font-size: 1rem; font-weight: 700; letter-spacing: 0.3px; cursor: pointer;
                    box-shadow: 0 10px 30px rgba(201,162,74,0.28); min-height: 44px;
                    transition: transform 0.05s ease, box-shadow 0.2s ease, filter 0.2s ease;
                }
                .fnf-btn-gold:hover { filter: brightness(1.05); box-shadow: 0 14px 36px rgba(201,162,74,0.36); }
                .fnf-btn-gold:active { transform: scale(0.98); }
                .fnf-btn-outline {
                    background: transparent; color: #fff; border: 1.5px solid rgba(255,255,255,0.35);
                    padding: 16px 34px; border-radius: 4px; font-size: 1rem; font-weight: 600;
                    cursor: pointer; letter-spacing: 0.3px; min-height: 44px; transition: background 0.18s ease, border-color 0.18s ease;
                }
                .fnf-btn-outline:hover { background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.6); }

                /* ---------- Trust strip ---------- */
                .fnf-trust { background: linear-gradient(180deg, #fffdf8, #faf7f0); border-bottom: 1px solid rgba(201,162,74,0.18); }
                .fnf-trust-in {
                    max-width: 1180px; margin: 0 auto; padding: 24px;
                    display: flex; align-items: center; justify-content: center; gap: 48px; flex-wrap: wrap;
                }
                .fnf-trust-item { display: flex; align-items: center; gap: 11px; color: #475467; font-size: 0.92rem; font-weight: 600; }

                /* ---------- Sections ---------- */
                .fnf-services-band {
                    background:
                        radial-gradient(120% 80% at 50% 0%, rgba(201,162,74,0.06), transparent 55%),
                        linear-gradient(180deg, #faf7f0 0%, #f4efe3 100%);
                    border-top: 1px solid rgba(201,162,74,0.3);
                    border-bottom: 1px solid var(--border);
                }
                .fnf-section { max-width: 1180px; margin: 0 auto; padding: 92px 24px; }
                .fnf-head { text-align: center; max-width: 660px; margin: 0 auto 60px; }
                .fnf-kicker {
                    display: inline-block; font-size: 0.75rem; font-weight: 700; letter-spacing: 2.5px;
                    text-transform: uppercase; color: var(--gold-deep); margin-bottom: 16px;
                }
                .fnf-head h2 {
                    font-family: var(--serif); font-size: clamp(1.9rem, 3.6vw, 2.7rem); font-weight: 700;
                    color: var(--navy); letter-spacing: -0.4px; margin: 0 0 16px; line-height: 1.12;
                }
                .fnf-head p { font-size: 1.06rem; color: var(--muted); line-height: 1.65; margin: 0; }

                .fnf-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 26px; }
                .fnf-card {
                    background: #fff; border: 1px solid var(--border); border-radius: 8px;
                    padding: 38px 30px; position: relative; transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
                }
                .fnf-card::before {
                    content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 3px;
                    background: linear-gradient(90deg, var(--gold-soft), var(--gold-deep));
                    border-radius: 8px 8px 0 0; opacity: 0; transition: opacity 0.2s ease;
                }
                .fnf-card:hover { transform: translateY(-5px); box-shadow: 0 20px 44px rgba(14,31,61,0.12); border-color: #d8d0be; }
                .fnf-card:hover::before { opacity: 1; }
                .fnf-card-icon {
                    width: 56px; height: 56px; border-radius: 12px;
                    background: linear-gradient(160deg, #16294c, #0e1f3d);
                    color: var(--gold-soft); display: flex; align-items: center; justify-content: center; margin-bottom: 24px;
                }
                .fnf-card h3 { font-family: var(--serif); font-size: 1.32rem; font-weight: 700; color: var(--navy); margin: 0 0 12px; }
                .fnf-card p { font-size: 0.96rem; color: var(--muted); line-height: 1.65; margin: 0; }

                /* ---------- Stats ---------- */
                .fnf-stats { background: var(--navy); color: #fff; position: relative; overflow: hidden; }
                .fnf-stats::before {
                    content: ''; position: absolute; inset: 0;
                    background: radial-gradient(90% 120% at 50% 0%, rgba(201,162,74,0.14), transparent 60%);
                }
                .fnf-stats-in {
                    max-width: 1180px; margin: 0 auto; padding: 66px 24px; position: relative; z-index: 1;
                    display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; text-align: center;
                }
                .fnf-stat-num {
                    font-family: var(--serif); font-size: clamp(2.4rem, 4.4vw, 3.2rem); font-weight: 700;
                    color: var(--gold-soft); letter-spacing: -1px; line-height: 1; margin-bottom: 10px;
                }
                .fnf-stat-label { font-size: 0.92rem; color: rgba(255,255,255,0.72); font-weight: 500; letter-spacing: 0.3px; }
                .fnf-stat-div { }

                /* ---------- CTA ---------- */
                .fnf-cta-band {
                    background:
                        radial-gradient(100% 140% at 80% 0%, rgba(201,162,74,0.18), transparent 50%),
                        linear-gradient(140deg, #0a1730, #14274a);
                    color: #fff; text-align: center;
                }
                .fnf-cta-in { max-width: 720px; margin: 0 auto; padding: 84px 24px; }
                .fnf-cta-in h2 {
                    font-family: var(--serif); font-size: clamp(1.9rem, 4vw, 2.8rem); font-weight: 700;
                    letter-spacing: -0.5px; margin: 0 0 16px;
                }
                .fnf-cta-in p { font-size: 1.12rem; color: rgba(255,255,255,0.82); margin: 0 0 34px; }

                /* ---------- Footer ---------- */
                .fnf-footer {
                    background:
                        radial-gradient(100% 100% at 50% 0%, rgba(201,162,74,0.08), transparent 55%),
                        var(--navy-deep);
                    color: rgba(255,255,255,0.66);
                    border-top: 2px solid var(--gold-deep);
                }
                .fnf-footer-in { max-width: 1180px; margin: 0 auto; padding: 62px 24px 34px; }
                .fnf-footer-cols { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 44px; margin-bottom: 44px; }
                .fnf-footer-brand .fnf-brand-name { color: #fff; }
                .fnf-footer-brand p { margin: 18px 0 0; font-size: 0.9rem; line-height: 1.65; max-width: 290px; }
                .fnf-footer-col h4 {
                    color: var(--gold-soft); font-family: var(--serif); font-size: 0.98rem; font-weight: 700;
                    letter-spacing: 0.3px; margin: 0 0 18px;
                }
                .fnf-footer-col a {
                    display: block; color: rgba(255,255,255,0.62); font-size: 0.92rem; text-decoration: none;
                    padding: 7px 0; transition: color 0.15s ease;
                }
                .fnf-footer-col a:hover { color: var(--gold-soft); }
                .fnf-footer-bot {
                    border-top: 1px solid rgba(255,255,255,0.1); padding-top: 26px;
                    display: flex; justify-content: space-between; align-items: center; gap: 16px; flex-wrap: wrap; font-size: 0.85rem;
                }
                .fnf-legal { display: flex; gap: 22px; flex-wrap: wrap; }
                .fnf-footer-bot a { color: rgba(255,255,255,0.6); text-decoration: none; }
                .fnf-footer-bot a:hover { color: var(--gold-soft); }

                /* ============ RESPONSIVE ============ */
                @media (max-width: 880px) {
                    .fnf-nav { display: none; }
                    .fnf-header .fnf-signin { display: none; }
                    .fnf-burger { display: flex; }
                    .fnf-mobile.open { display: flex; }
                    .fnf-grid { grid-template-columns: 1fr; gap: 20px; }
                    .fnf-hero { min-height: auto; }
                    .fnf-hero-in { padding: 52px 24px 60px; }
                    .fnf-section { padding: 60px 24px; }
                    .fnf-head { margin-bottom: 44px; }
                    .fnf-stats-in { padding: 52px 24px; }
                    .fnf-cta-in { padding: 64px 24px; }

                    /* Footer as a designed block on mobile */
                    .fnf-footer-in { padding: 48px 24px 30px; }
                    .fnf-footer-cols {
                        grid-template-columns: 1fr 1fr;
                        gap: 30px 24px;
                        margin-bottom: 34px;
                    }
                    .fnf-footer-brand {
                        grid-column: 1 / -1;
                        padding-bottom: 28px;
                        margin-bottom: 4px;
                        border-bottom: 1px solid rgba(201,162,74,0.22);
                    }
                    .fnf-footer-brand p { max-width: 100%; }
                    .fnf-footer-col a { padding: 6px 0; }
                }
                @media (max-width: 560px) {
                    .fnf-stats-in { grid-template-columns: repeat(3, 1fr); gap: 12px; }
                    .fnf-cta { flex-direction: column; }
                    .fnf-cta button { width: 100%; }
                    /* trust strip: keep all three in one row, icon beside a smaller label */
                    .fnf-trust-in { flex-wrap: nowrap; gap: 8px; padding: 20px 12px; }
                    .fnf-trust-item { gap: 6px; font-size: 0.66rem; line-height: 1.2; flex: 1; justify-content: center; }
                    .fnf-trust-item svg { width: 15px; height: 15px; }
                    .fnf-eyebrow { margin-bottom: 20px; }
                    .fnf-section { padding: 52px 22px; }
                    /* keep footer links 2-up, don't collapse to a lonely single column */
                    .fnf-footer-cols { grid-template-columns: 1fr 1fr; gap: 26px 20px; }
                    .fnf-footer-bot { flex-direction: column; align-items: flex-start; gap: 14px; }
                }
                @media (prefers-reduced-motion: reduce) { .fnf * { transition: none !important; } }
            `}</style>

            {/* HEADER */}
            <header className="fnf-header">
                <div className="fnf-header-in">
                    <div className="fnf-brand" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                        <Emblem size={40} />
                        <div className="fnf-brand-txt">
                            <span className="fnf-brand-name">First National Financial</span>
                            <span className="fnf-brand-sub">Est. 1974</span>
                        </div>
                    </div>
                    <nav className="fnf-nav">
                        <a href="#accounts">Personal</a>
                        <a href="#business">Business</a>
                        <a href="#security">Security</a>
                        <a href="#support">Support</a>
                    </nav>
                    <button className="fnf-signin" onClick={goToLogin}>Sign In</button>
                    <button className="fnf-burger" aria-label="Menu" onClick={() => setMobileMenuOpen(v => !v)}>
                        {mobileMenuOpen ? (
                            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                        ) : (
                            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
                        )}
                    </button>
                </div>
                <div className={`fnf-mobile ${mobileMenuOpen ? 'open' : ''}`}>
                    <a href="#accounts" onClick={() => setMobileMenuOpen(false)}>Personal</a>
                    <a href="#business" onClick={() => setMobileMenuOpen(false)}>Business</a>
                    <a href="#security" onClick={() => setMobileMenuOpen(false)}>Security</a>
                    <a href="#support" onClick={() => setMobileMenuOpen(false)}>Support</a>
                    <button className="fnf-signin" onClick={goToLogin}>Sign In</button>
                </div>
            </header>

            {/* HERO */}
            <section className="fnf-hero">
                <div className="fnf-hero-in">
                    <span className="fnf-eyebrow">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                        FDIC INSURED &middot; MEMBER SINCE 1974
                    </span>
                    <h1>Banking built on trust, designed for <span className="accent">your future.</span></h1>
                    <p>Manage your accounts, move money, and grow your wealth with the security and confidence of a bank that has served families for over fifty years.</p>
                    <div className="fnf-cta">
                        <button className="fnf-btn-gold" onClick={goToLogin}>Sign In to Online Banking</button>
                        <button className="fnf-btn-outline" onClick={() => document.getElementById('accounts')?.scrollIntoView({ behavior: 'smooth' })}>Explore Accounts</button>
                    </div>
                </div>
            </section>

            {/* TRUST */}
            <div className="fnf-trust">
                <div className="fnf-trust-in">
                    <div className="fnf-trust-item">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                        256-bit SSL Encryption
                    </div>
                    <div className="fnf-trust-item">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c9a24a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                        FDIC Insured to $250,000
                    </div>
                    <div className="fnf-trust-item">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0e1f3d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="m9 12 2 2 4-4" /></svg>
                        Trusted Worldwide
                    </div>
                </div>
            </div>

            {/* FEATURES */}
            <div className="fnf-services-band">
            <section className="fnf-section" id="accounts">
                <div className="fnf-head">
                    <span className="fnf-kicker">Our Services</span>
                    <h2>Everything you need in one place</h2>
                    <p>From everyday checking to long-term investments, manage your entire financial life through a single secure dashboard.</p>
                </div>
                <div className="fnf-grid">
                    <div className="fnf-card">
                        <div className="fnf-card-icon"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2" /><line x1="2" y1="10" x2="22" y2="10" /></svg></div>
                        <h3>Checking &amp; Savings</h3>
                        <p>No hidden fees, competitive rates, and instant access to your money whenever and wherever you need it.</p>
                    </div>
                    <div className="fnf-card">
                        <div className="fnf-card-icon"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="13 17 18 12 13 7" /><polyline points="6 17 11 12 6 7" /></svg></div>
                        <h3>Fast, Secure Transfers</h3>
                        <p>Send money to any bank in seconds with bank-grade encryption protecting every transaction, every time.</p>
                    </div>
                    <div className="fnf-card">
                        <div className="fnf-card-icon"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg></div>
                        <h3>Grow Your Investments</h3>
                        <p>Build long-term wealth with guided portfolios and real-time insights, all managed from your dashboard.</p>
                    </div>
                </div>
            </section>
            </div>

            {/* STATS */}
            <div className="fnf-stats">
                <div className="fnf-stats-in">
                    <div><div className="fnf-stat-num">50+</div><div className="fnf-stat-label">Years serving our clients</div></div>
                    <div><div className="fnf-stat-num">2M+</div><div className="fnf-stat-label">Accounts protected nationwide</div></div>
                    <div><div className="fnf-stat-num">$18B</div><div className="fnf-stat-label">In deposits under management</div></div>
                </div>
            </div>

            {/* CTA */}
            <div className="fnf-cta-band" id="support">
                <div className="fnf-cta-in">
                    <h2>Ready to take control of your finances?</h2>
                    <p>Sign in to your account to get started in seconds.</p>
                    <button className="fnf-btn-gold" onClick={goToLogin}>Sign In to Online Banking</button>
                </div>
            </div>

            {/* FOOTER */}
            <footer className="fnf-footer" id="security">
                <div className="fnf-footer-in">
                    <div className="fnf-footer-cols">
                        <div className="fnf-footer-brand">
                            <div className="fnf-brand" style={{ cursor: 'default' }}>
                                <Emblem size={38} />
                                <div className="fnf-brand-txt">
                                    <span className="fnf-brand-name">First National Financial</span>
                                    <span className="fnf-brand-sub">Est. 1974</span>
                                </div>
                            </div>
                            <p>A member-owned institution committed to protecting and growing your wealth since 1974.</p>
                        </div>
                        <div className="fnf-footer-col">
                            <h4>Personal</h4>
                            <a href="#">Checking</a><a href="#">Savings</a><a href="#">Credit Cards</a><a href="#">Loans</a>
                        </div>
                        <div className="fnf-footer-col">
                            <h4>Company</h4>
                            <a href="#">About Us</a><a href="#">Careers</a><a href="#">Newsroom</a><a href="#">Contact</a>
                        </div>
                        <div className="fnf-footer-col">
                            <h4>Support</h4>
                            <a href="#">Help Center</a><a href="#">Security</a><a href="#">Locations</a><a href="#">Report Fraud</a>
                        </div>
                    </div>
                    <div className="fnf-footer-bot">
                        <div>&copy; 2026 First National Financial. All rights reserved. Member FDIC.</div>
                        <div className="fnf-legal">
                            <a href="#">Privacy Policy</a><a href="#">Terms of Service</a><a href="#">Accessibility</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
