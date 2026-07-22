import Sidebar from '../components/Sidebar';

const PROFILE = {
    fullName: 'Stephanie Kennedy',
    username: 'PrettyStephy',
    gender: 'Female',
    memberSince: 'March 2022',
    customerId: 'FNF-4471-8820',
    email: 'stephkennedy42@gmail.com',
    phone: '+1 (864) ••• ••10',
    address: 'Wilmington, Delaware, USA',
    tier: 'Premier Client',
    accountType: 'Checking Account — Personal',
    relationshipManager: 'Daniel Whitmore',
    preferredContact: 'Email',
    language: 'English (US)',
};

export default function ProfilePage() {
    const initials = PROFILE.fullName.split(' ').map(n => n[0]).join('');

    const card: React.CSSProperties = {
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px 0 rgba(0,0,0,0.06)',
        padding: '28px',
        marginBottom: '24px',
    };

    const sectionTitle: React.CSSProperties = {
        fontSize: '18px',
        fontWeight: 600,
        color: '#1a1a2e',
        margin: '0 0 4px',
    };

    const sectionSub: React.CSSProperties = {
        fontSize: '13px',
        color: '#64748b',
        margin: '0 0 22px',
    };

    const Row = ({ label, value, last }: { label: string; value: string; last?: boolean }) => (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            padding: '15px 0',
            borderBottom: last ? 'none' : '1px solid #eef2f6',
        }}>
            <span style={{ fontSize: '13.5px', color: '#64748b', fontWeight: 500 }}>{label}</span>
            <span style={{ fontSize: '14.5px', color: '#1a1a2e', fontWeight: 600, textAlign: 'right' }}>{value}</span>
        </div>
    );

    return (
        <div className="app-shell" style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f6f4ef' }}>
            <Sidebar />
            <div className="app-main profile-page" style={{
                flex: 1,
                marginLeft: '240px',
                backgroundColor: '#f6f4ef',
                minHeight: '100vh',
                padding: '32px 40px',
            }}>
                <style>{`
                    @media (max-width: 900px) {
                        .profile-page { margin-left: 0 !important; padding: 20px 16px 48px !important; }
                        .prof-hero { flex-direction: column !important; text-align: center !important; align-items: center !important; }
                        .prof-hero-meta { justify-content: center !important; }
                    }
                `}</style>

                {/* Page Header */}
                <div style={{
                    marginBottom: '32px',
                    paddingBottom: '24px',
                    borderBottom: '1px solid #e2e8f0',
                }}>
                    <h1 style={{ fontSize: '24px', fontWeight: 600, color: '#1a1a2e', margin: '0 0 8px' }}>
                        My Profile
                    </h1>
                    <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>
                        Your personal details and account information
                    </p>
                </div>

                <div style={{ maxWidth: '800px', margin: '32px auto', padding: '0 8px' }}>

                    {/* Hero card */}
                    <div style={{ ...card, padding: '32px 28px' }}>
                        <div className="prof-hero" style={{ display: 'flex', alignItems: 'center', gap: '22px' }}>
                            <div style={{
                                width: 84, height: 84, borderRadius: '50%', flexShrink: 0,
                                background: 'linear-gradient(160deg, #1e3a8a, #16307a)',
                                color: '#fff',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '30px', fontWeight: 700, letterSpacing: '0.5px',
                                boxShadow: '0 6px 18px rgba(30,58,138,0.28)',
                            }}>
                                {initials}
                            </div>

                            <div style={{ minWidth: 0 }}>
                                <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#1a1a2e', margin: '0 0 4px' }}>
                                    {PROFILE.fullName}
                                </h2>
                                <p style={{ fontSize: '14.5px', color: '#64748b', margin: '0 0 12px' }}>
                                    @{PROFILE.username}
                                </p>

                                <div className="prof-hero-meta" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                    <span style={{
                                        display: 'inline-flex', alignItems: 'center', gap: '6px',
                                        backgroundColor: '#eef2ff', color: '#1e3a8a',
                                        padding: '5px 12px', borderRadius: '999px',
                                        fontSize: '12.5px', fontWeight: 600,
                                    }}>
                                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                        </svg>
                                        {PROFILE.tier}
                                    </span>
                                    <span style={{
                                        display: 'inline-flex', alignItems: 'center', gap: '6px',
                                        backgroundColor: '#dcfce7', color: '#15803d',
                                        padding: '5px 12px', borderRadius: '999px',
                                        fontSize: '12.5px', fontWeight: 600,
                                    }}>
                                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M20 6 9 17l-5-5" />
                                        </svg>
                                        Verified
                                    </span>
                                    <span style={{
                                        display: 'inline-flex', alignItems: 'center', gap: '6px',
                                        backgroundColor: '#f1f5f9', color: '#475569',
                                        padding: '5px 12px', borderRadius: '999px',
                                        fontSize: '12.5px', fontWeight: 600,
                                    }}>
                                        Member since {PROFILE.memberSince}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Personal information */}
                    <div style={card}>
                        <h2 style={sectionTitle}>Personal Information</h2>
                        <p style={sectionSub}>Details registered to this account</p>

                        <div>
                            <Row label="Full Name" value={PROFILE.fullName} />
                            <Row label="Username" value={`@${PROFILE.username}`} />
                            <Row label="Gender" value={PROFILE.gender} />
                            <Row label="Email Address" value={PROFILE.email} />
                            <Row label="Phone Number" value={PROFILE.phone} />
                            <Row label="Location" value={PROFILE.address} last />
                        </div>
                    </div>

                    {/* Account details */}
                    <div style={card}>
                        <h2 style={sectionTitle}>Account Details</h2>
                        <p style={sectionSub}>Your relationship with First National Financial</p>

                        <div>
                            <Row label="Customer ID" value={PROFILE.customerId} />
                            <Row label="Account Type" value={PROFILE.accountType} />
                            <Row label="Account Tier" value={PROFILE.tier} />
                            <Row label="Member Since" value={PROFILE.memberSince} />
                            <Row label="Relationship Manager" value={PROFILE.relationshipManager} />
                            <Row label="Preferred Contact" value={PROFILE.preferredContact} />
                            <Row label="Language" value={PROFILE.language} last />
                        </div>
                    </div>

                    {/* Security */}
                    <div style={card}>
                        <h2 style={sectionTitle}>Security &amp; Verification</h2>
                        <p style={sectionSub}>How this account is protected</p>

                        <div style={{ display: 'grid', gap: '14px' }}>
                            {[
                                {
                                    ok: true,
                                    title: 'Identity Verified',
                                    body: 'Government-issued ID confirmed on file',
                                },
                                {
                                    ok: true,
                                    title: 'Two-Factor Authentication',
                                    body: 'Enabled via SMS and email verification',
                                },
                                {
                                    ok: true,
                                    title: 'Email Address Confirmed',
                                    body: PROFILE.email,
                                },
                                {
                                    ok: true,
                                    title: 'Alerts Active',
                                    body: 'Notifications enabled for all account activity',
                                },
                            ].map(item => (
                                <div key={item.title} style={{ display: 'flex', gap: '13px', alignItems: 'flex-start' }}>
                                    <div style={{
                                        width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
                                        backgroundColor: '#dcfce7', color: '#15803d',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    }}>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M20 6 9 17l-5-5" />
                                        </svg>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '14.5px', fontWeight: 600, color: '#1a1a2e', marginBottom: '2px' }}>
                                            {item.title}
                                        </div>
                                        <div style={{ fontSize: '13.5px', color: '#64748b', lineHeight: 1.55 }}>
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
                            To update your personal details, please contact your relationship manager
                            or reach First National Financial Support at 1 (929) 481-9744.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
