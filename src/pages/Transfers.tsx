import { useState, useEffect, useCallback, useRef } from 'react';
import { findBanks, Bank as BankType } from '../lib/bankData';
import Sidebar from '../components/Sidebar';
import EmailVerification from '../components/EmailVerification';
import TransactionProcessing from '../components/TransactionProcessing';
import BankLogo from '../components/BankLogo';

export default function TransfersPage() {
    const [amount, setAmount] = useState('');
    const [bankSearch, setBankSearch] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [recipientName, setRecipientName] = useState('');
    const [routingNumber, setRoutingNumber] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const [showVerification, setShowVerification] = useState(false);
    const [transferData, setTransferData] = useState({
        amount: '',
        accountNumber: '',
        recipientName: '',
        routingNumber: '',
        bankName: ''
    });
    const [bankSuggestions, setBankSuggestions] = useState<BankType[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const lastSelectedBankName = useRef<string>('');

    // Single account data matching the dashboard
    const account = {
        id: 'checking-1234',
        name: 'Checking Account',
        lastFour: '3614',
        balance: 3050568.17,
        type: 'Personal'
    };

    // Bank search using local static data
    const searchBanks = useCallback((query: string) => {
        if (query.length < 2) {
            setBankSuggestions([]);
            setShowSuggestions(false);
            return;
        }

        setIsSearching(true);
        setShowSuggestions(true);

        try {
            // Use our local bank data instead of API call
            const results = findBanks(query);
            setBankSuggestions(results as BankType[]);
        } catch (error) {
            console.error('Bank search error:', error);
            setBankSuggestions([]);
        } finally {
            setIsSearching(false);
        }
    }, []);

    // Debounce effect for bank search with cleanup
    useEffect(() => {
        // If the search term is the same as what we just selected, don't show suggestions
        if (bankSearch === lastSelectedBankName.current) {
            setShowSuggestions(false);
            return;
        }

        const timer = setTimeout(() => {
            if (bankSearch.trim()) {
                searchBanks(bankSearch.trim());
            } else {
                setBankSuggestions([]);
                setShowSuggestions(false);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [bankSearch, searchBanks]);

    const handleBankSelect = (bank: BankType) => {
        lastSelectedBankName.current = bank.name;
        setBankSearch(bank.name);
        // Routing number is entered manually by the user — no auto-fill.
        setBankSuggestions([]);
        setShowSuggestions(false);
        document.getElementById('bank-search-input')?.focus();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Save transfer data for later use
        setTransferData({
            amount,
            accountNumber,
            recipientName,
            routingNumber,
            bankName: bankSearch
        });

        // Show verification modal instead of completing the transfer
        setShowVerification(true);
    };

    const handleEmailVerify = async (): Promise<boolean> => {
        try {
            // Simulate email verification
            await new Promise(resolve => setTimeout(resolve, 500));
            return true;
        } catch (error) {
            console.error('Email verification failed:', error);
            return false;
        }
    };

    const [showProcessing, setShowProcessing] = useState(false);
    const [processingData, setProcessingData] = useState({
        amount: '',
        recipientBankName: '',
        recipientAccountNumber: '',
        date: '',
    });

    const handleSmsVerify = async (code: string): Promise<boolean> => {
        setIsLoading(true);
        try {
            // Simulate SMS code verification
            await new Promise(resolve => setTimeout(resolve, 1500));

            // In a real app, you would verify the code with your backend here
            const isValid = code.length === 6 && /^\d+$/.test(code);

            if (isValid) {
                // Set processing data and show processing screen
                setProcessingData({
                    amount: transferData.amount,
                    recipientBankName: transferData.bankName,
                    recipientAccountNumber: transferData.accountNumber,
                    date: new Date().toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                    }),
                });

                // Hide verification and show processing
                setShowVerification(false);
                setShowProcessing(true);

                return true;
            } else {
                throw new Error('Invalid verification code');
            }
        } catch (error) {
            console.error('Verification failed:', error);
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const handleEmailResend = async (): Promise<boolean> => {
        try {
            // Simulate resending email
            await new Promise(resolve => setTimeout(resolve, 1000));
            return true;
        } catch (error) {
            console.error('Failed to resend email:', error);
            return false;
        }
    };

    const handleSmsResend = async (): Promise<boolean> => {
        try {
            // Simulate resending SMS
            await new Promise(resolve => setTimeout(resolve, 1000));
            return true;
        } catch (error) {
            console.error('Failed to resend SMS:', error);
            return false;
        }
    };

    return (
        <div className="app-shell" style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f6f4ef' }}>
            <Sidebar />
            <div className="app-main transfers-page" style={{
                flex: 1,
                marginLeft: '240px',
                backgroundColor: '#f6f4ef',
                minHeight: '100vh',
                padding: '32px 40px'
            }}>
                {/* Page Header */}
                <div className="transfers-header" style={{
                    marginBottom: '32px',
                    paddingBottom: '24px',
                    borderBottom: '1px solid #e2e8f0'
                }}>
                    <h1 style={{
                        fontSize: '24px',
                        fontWeight: '600',
                        color: '#1a1a2e',
                        margin: 0,
                        marginBottom: '8px'
                    }}>
                        Transfer Funds
                    </h1>
                    <p style={{
                        fontSize: '14px',
                        color: '#64748b',
                        margin: 0
                    }}>
                        Transfer money between your accounts or to external recipients
                    </p>
                </div>

                {/* Transfer Form */}
                <div className="transfers-form-wrapper" style={{
                    maxWidth: '800px',
                    margin: '32px auto',
                    padding: '0 32px'
                }}>
                    <div className="transfers-card" style={{
                        backgroundColor: 'white',
                        borderRadius: '12px',
                        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
                        padding: '32px',
                        marginBottom: '32px',
                        border: '1px solid #e2e8f0'
                    }}>
                        <h2 style={{
                            marginTop: 0,
                            marginBottom: '24px',
                            color: '#1a365d',
                            fontSize: '20px',
                            fontWeight: '600'
                        }}>
                            New Transfer
                        </h2>

                        <form onSubmit={handleSubmit}>
                            {/* From Account - Single Account Display */}
                            <div style={{ marginBottom: '24px' }}>
                                <label style={{
                                    display: 'block',
                                    marginBottom: '8px',
                                    color: '#4a5568',
                                    fontWeight: '500',
                                    fontSize: '14px'
                                }}>
                                    From Account
                                </label>
                                <div style={{
                                    width: '100%',
                                    padding: '16px',
                                    border: '1px solid #e2e8f0',
                                    borderRadius: '12px',
                                    backgroundColor: 'white',
                                    color: '#1a202c',
                                    fontSize: '15px',
                                    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
                                }}>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        marginBottom: '4px'
                                    }}>
                                        <span style={{ fontWeight: '500' }}>
                                            {account.name} (****{account.lastFour})
                                        </span>
                                        <span style={{
                                            fontWeight: '600',
                                            color: '#1a1a2e'
                                        }}>
                                            ${account.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                        </span>
                                    </div>
                                    <div style={{
                                        fontSize: '13px',
                                        color: '#64748b',
                                        display: 'flex',
                                        justifyContent: 'space-between'
                                    }}>
                                        <span>{account.type} Account</span>
                                        <span>Available Balance</span>
                                    </div>
                                </div>
                            </div>

                            {/* Amount */}
                            <div style={{ marginBottom: '24px' }}>
                                <label style={{
                                    display: 'block',
                                    marginBottom: '8px',
                                    color: '#4a5568',
                                    fontWeight: '500',
                                    fontSize: '14px'
                                }}>
                                    Amount
                                </label>
                                <div style={{ position: 'relative' }}>
                                    <span style={{
                                        position: 'absolute',
                                        left: '12px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        color: '#4a5568',
                                        fontSize: '16px',
                                        fontWeight: '500'
                                    }}>
                                        $
                                    </span>
                                    <input
                                        type="number"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        placeholder="0.00"
                                        required
                                        min="0.01"
                                        step="0.01"
                                        style={{
                                            width: '100%',
                                            padding: '12px 16px 12px 36px',
                                            border: '1px solid #e2e8f0',
                                            borderRadius: '8px',
                                            fontSize: '16px',
                                            color: '#1a202c',
                                            outline: 'none',
                                            transition: 'border-color 0.2s'
                                        }}
                                        onFocus={(e) => {
                                            e.target.style.borderColor = '#4a6cf7';
                                            e.target.style.boxShadow = '0 0 0 1px #4a6cf7';
                                        }}
                                        onBlur={(e) => {
                                            e.target.style.borderColor = '#e2e8f0';
                                            e.target.style.boxShadow = 'none';
                                        }}
                                    />
                                </div>
                                <p style={{
                                    margin: '8px 0 0',
                                    color: '#718096',
                                    fontSize: '14px'
                                }}>
                                    Available balance: ${account.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                </p>
                            </div>

                            {/* To Section */}
                            <div style={{
                                marginBottom: '24px',
                                paddingTop: '24px',
                                borderTop: '1px solid #e2e8f0'
                            }}>
                                <h3 style={{
                                    marginTop: 0,
                                    marginBottom: '16px',
                                    color: '#1a365d',
                                    fontSize: '18px',
                                    fontWeight: '600'
                                }}>
                                    To
                                </h3>

                                {/* Enhanced Bank Search */}
                                <div style={{ marginBottom: '24px' }}>
                                    <label style={{
                                        display: 'block',
                                        marginBottom: '8px',
                                        color: '#4a5568',
                                        fontWeight: '500',
                                        fontSize: '14px'
                                    }}>
                                        Recipient Bank Name
                                    </label>
                                    <div style={{ position: 'relative' }}>
                                        <input
                                            id="bank-search-input"
                                            type="text"
                                            value={bankSearch}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                setBankSearch(value);
                                                if (value.length > 1) {
                                                    setShowSuggestions(true);
                                                } else {
                                                    setShowSuggestions(false);
                                                    setBankSuggestions([]);
                                                }
                                            }}
                                            onFocus={() => bankSearch.length > 1 && setShowSuggestions(true)}
                                            onBlur={(e) => {
                                                // Don't hide if clicking on a suggestion
                                                if (!e.relatedTarget || !e.relatedTarget.closest('.suggestions-container')) {
                                                    setTimeout(() => setShowSuggestions(false), 200);
                                                }
                                            }}
                                            placeholder="Start typing bank name (e.g., Bank of America)"
                                            autoComplete="off"
                                            style={{
                                                width: '100%',
                                                padding: '12px 16px 12px 44px',
                                                border: '1px solid #e2e8f0',
                                                borderRadius: '8px',
                                                fontSize: '15px',
                                                outline: 'none',
                                                transition: 'all 0.2s',
                                                backgroundColor: '#fff',
                                                boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
                                            }}
                                        />
                                        {/* Search Icon */}
                                        <div style={{
                                            position: 'absolute',
                                            left: '16px',
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            color: '#64748b',
                                            pointerEvents: 'none'
                                        }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <circle cx="11" cy="11" r="8"></circle>
                                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                            </svg>
                                        </div>

                                        {/* Loading Indicator */}
                                        {isSearching && (
                                            <div style={{
                                                position: 'absolute',
                                                right: '16px',
                                                top: '50%',
                                                transform: 'translateY(-50%)'
                                            }}>
                                                <div style={{
                                                    width: '16px',
                                                    height: '16px',
                                                    border: '2px solid #f3f3f3',
                                                    borderTop: '2px solid #3498db',
                                                    borderRadius: '50%',
                                                    animation: 'spin 1s linear infinite'
                                                }} />
                                                <style>{`
                                                    @keyframes spin {
                                                        0% { transform: rotate(0deg); }
                                                        100% { transform: rotate(360deg); }
                                                    }
                                                `}</style>
                                            </div>
                                        )}

                                        {/* Suggestions Dropdown */}
                                        {showSuggestions && bankSuggestions.length > 0 && (
                                            <div className="restrictions-container" style={{
                                                position: 'absolute',
                                                top: '100%',
                                                left: 0,
                                                right: 0,
                                                marginTop: '4px',
                                                backgroundColor: 'white',
                                                border: '1px solid #e2e8f0',
                                                borderRadius: '8px',
                                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                                                maxHeight: '240px',
                                                overflowY: 'auto',
                                                zIndex: 50
                                            }}>
                                                {bankSuggestions.map((bank, index) => (
                                                    <div
                                                        key={`${bank.name}-${index}`}
                                                        onClick={() => handleBankSelect(bank)}
                                                        style={{
                                                            padding: '12px 16px',
                                                            cursor: 'pointer',
                                                            borderBottom: index < bankSuggestions.length - 1 ? '1px solid #f1f5f9' : 'none',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: '12px',
                                                            transition: 'background-color 0.15s'
                                                        }}
                                                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
                                                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                                                    >
                                                        <BankLogo bankName={bank.name} logoUrl={bank.logoUrl} />
                                                        <div>
                                                            <div style={{
                                                                fontSize: '14px',
                                                                fontWeight: '500',
                                                                color: '#1e293b'
                                                            }}>
                                                                {bank.name}
                                                            </div>
                                                            <div style={{
                                                                fontSize: '12px',
                                                                color: '#64748b'
                                                            }}>
                                                                Routing: {bank.routingNumber}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                    </div>
                                </div>

                                {/* Recipient Name */}
                                <div style={{ marginBottom: '24px' }}>
                                    <label style={{
                                        display: 'block',
                                        marginBottom: '8px',
                                        color: '#4a5568',
                                        fontWeight: '500',
                                        fontSize: '14px'
                                    }}>
                                        Recipient's Name
                                    </label>
                                    <input
                                        type="text"
                                        value={recipientName}
                                        onChange={(e) => setRecipientName(e.target.value)}
                                        placeholder="Enter recipient's full name"
                                        required
                                        style={{
                                            width: '100%',
                                            padding: '12px 16px',
                                            border: '1px solid #e2e8f0',
                                            borderRadius: '8px',
                                            fontSize: '16px',
                                            color: '#1a202c',
                                            outline: 'none',
                                            transition: 'border-color 0.2s'
                                        }}
                                    />
                                </div>

                                {/* Account Number */}
                                <div style={{ marginBottom: '24px' }}>
                                    <label style={{
                                        display: 'block',
                                        marginBottom: '8px',
                                        color: '#4a5568',
                                        fontWeight: '500',
                                        fontSize: '14px'
                                    }}>
                                        Recipient's Account Number
                                    </label>
                                    <input
                                        type="text"
                                        value={accountNumber}
                                        onChange={(e) => setAccountNumber(e.target.value)}
                                        placeholder="Enter account number"
                                        required
                                        style={{
                                            width: '100%',
                                            padding: '12px 16px',
                                            border: '1px solid #e2e8f0',
                                            borderRadius: '8px',
                                            fontSize: '16px',
                                            color: '#1a202c',
                                            outline: 'none',
                                            transition: 'border-color 0.2s'
                                        }}
                                    />
                                </div>

                                {/* Routing Number */}
                                <div style={{ marginBottom: '24px' }}>
                                    <label style={{
                                        display: 'block',
                                        marginBottom: '8px',
                                        color: '#4a5568',
                                        fontWeight: '500',
                                        fontSize: '14px'
                                    }}>
                                        Routing Number
                                    </label>
                                    <input
                                        type="text"
                                        value={routingNumber}
                                        onChange={(e) => setRoutingNumber(e.target.value)}
                                        placeholder="Enter 9-digit routing number"
                                        required
                                        style={{
                                            width: '100%',
                                            padding: '12px 16px',
                                            border: '1px solid #e2e8f0',
                                            borderRadius: '8px',
                                            fontSize: '16px',
                                            color: '#1a202c',
                                            outline: 'none',
                                            transition: 'border-color 0.2s'
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div style={{ marginTop: '32px' }}>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    onMouseEnter={(e) => {
                                        if (!isLoading) e.currentTarget.style.filter = 'brightness(1.05)';
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!isLoading) e.currentTarget.style.filter = 'none';
                                    }}
                                    onMouseDown={(e) => {
                                        if (!isLoading) e.currentTarget.style.transform = 'scale(0.99)';
                                    }}
                                    onMouseUp={(e) => {
                                        if (!isLoading) e.currentTarget.style.transform = 'none';
                                    }}
                                    style={{
                                        background: 'linear-gradient(180deg, #e2c47f 0%, #c9a24a 100%)',
                                        color: '#1a1300',
                                        border: 'none',
                                        borderRadius: '8px',
                                        padding: '15px',
                                        fontSize: '16px',
                                        fontWeight: '700',
                                        cursor: isLoading ? 'wait' : 'pointer',
                                        width: '100%',
                                        transition: 'all 0.18s ease',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '8px',
                                        boxShadow: '0 8px 22px rgba(201,162,74,0.28)',
                                        opacity: isLoading ? 0.85 : 1,
                                    }}
                                >
                                    {isLoading ? 'Processing...' : 'Transfer Money'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Verification Modals */}
                {showVerification && (
                    <EmailVerification
                        onVerify={handleEmailVerify}
                        onResend={handleEmailResend}
                        onClose={() => setShowVerification(false)}
                        onSmsVerify={handleSmsVerify}
                        onSmsResend={handleSmsResend}
                    />
                )}

                {/* Transaction Processing */}
                {showProcessing && (
                    <TransactionProcessing
                        amount={processingData.amount}
                        recipientBankName={processingData.recipientBankName}
                        recipientAccountNumber={processingData.recipientAccountNumber}
                        date={processingData.date}
                    />
                )}
            </div>
        </div>
    );
}
