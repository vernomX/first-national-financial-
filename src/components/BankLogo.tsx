import { useState } from 'react';

interface BankLogoProps {
    bankName: string;
    logoUrl?: string;
    className?: string;
}

export default function BankLogo({ bankName, logoUrl, className = '' }: BankLogoProps) {
    const [error, setError] = useState(false);

    // Fallback icon (Building Library)
    const FallbackIcon = () => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ padding: '6px' }}
        >
            <path d="M3 21h18" />
            <path d="M5 21v-7" />
            <path d="M19 21v-7" />
            <path d="M4 10a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v3H4v-3z" />
            <path d="M12 3L4 10h16l-8-7z" />
        </svg>
    );

    if (!logoUrl || error) {
        return (
            <div className={className} style={{ color: '#3b82f6', backgroundColor: '#eff6ff', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FallbackIcon />
            </div>
        );
    }

    return (
        <div className={className} style={{ width: '32px', height: '32px', flexShrink: 0, borderRadius: '50%', overflow: 'hidden', backgroundColor: '#fff', border: '1px solid #f1f5f9' }}>
            <img
                src={logoUrl}
                alt={`${bankName} logo`}
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                onError={() => setError(true)}
            />
        </div>
    );
}
